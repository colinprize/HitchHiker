from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import datetime
from queries.pool import pool


class Error(BaseModel):
    message: str


class RideIn(BaseModel):
    max_riders: int
    meetup_time: datetime
    meetup_location: Optional[str]


class RideOut(BaseModel):
    ride_id: int
    driver_id: int
    max_riders: int
    meetup_time: datetime
    meetup_location: Optional[str]
    hike_event: int
    driver_img: Optional[str]


class RiderOut(BaseModel):
    rider_id: int
    trip_id: int


class RideRepository:
    def get_one(self, ride_id: int) -> Optional[RideOut]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        SELECT r.ride_id
                            , r.driver_id
                            , r.max_riders
                            , r.meetup_time
                            , r.meetup_location
                            , r.hike_event
                            , u.picture_url
                        FROM ride r
                        JOIN users u ON (u.user_id = r.driver_id)
                        WHERE ride_id = %s
                        """,
                        [ride_id],
                    )
                    record = result.fetchone()
                    return self.record_to_ride_out(record)
        except Exception:
            return {"message": "cannot retrieve ride"}

    def record_to_ride_out(self, record):
        return RideOut(
            ride_id=record[0],
            driver_id=record[1],
            max_riders=record[2],
            meetup_time=record[3],
            meetup_location=record[4],
            hike_event=record[5],
            driver_img=record[6],
        )

    def update(
        self, hike_id: int, ride_id: int, ride: RideIn, user_id: int
    ) -> Union[RideOut, Error]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT hike_event
                            , ride_id
                        FROM ride
                        WHERE hike_event = %s AND ride_id = %s;
                        """,
                        [hike_id, ride_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {
                            "message": "Ride not associated with this hike"
                        }
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        UPDATE ride
                        SET max_riders = %s
                            , meetup_time = %s
                            , meetup_location = %s
                        WHERE hike_event = %s
                        AND ride_id = %s AND driver_id = %s;
                        """,
                        [
                            ride.max_riders,
                            ride.meetup_time,
                            ride.meetup_location,
                            hike_id,
                            ride_id,
                            user_id,
                        ],
                    )
                    old_data = ride.dict()
                    return RideOut(
                        ride_id=ride_id,
                        hike_event=hike_id,
                        driver_id=user_id,
                        **old_data
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update ride"}

    def get_all(self, hike_id: int) -> Union[Error, List[RideOut]]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        SELECT r.ride_id, r.driver_id, r.max_riders,
                        r.meetup_time, r.meetup_location, r.hike_event,
                        u.picture_url
                        FROM ride r
                        JOIN users u ON (u.user_id = r.driver_id)
                        WHERE hike_event = %s
                        ORDER BY ride_id;
                        """,
                        [
                            hike_id,
                        ],
                    )
                    return [
                        RideOut(
                            ride_id=record[0],
                            driver_id=record[1],
                            max_riders=record[2],
                            meetup_time=record[3],
                            meetup_location=record[4],
                            hike_event=record[5],
                            driver_img=record[6],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all rides"}

    def create(self, hike_id: int, ride: RideIn, driver_id: int) -> RideOut:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id
                            , hike_id
                        FROM hikes_users
                        WHERE user_id = %s AND hike_id = %s;
                        """,
                        [driver_id, hike_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {"message": "User does not belong to hike"}
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO ride
                            (driver_id, max_riders, meetup_time,
                            meetup_location, hike_event)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING ride_id;
                        """,
                        [
                            driver_id,
                            ride.max_riders,
                            ride.meetup_time,
                            ride.meetup_location,
                            hike_id,
                        ],
                    )
                    ride_id = result.fetchone()[0]
                    # Return new data
                    old_data = ride.dict()
                    return RideOut(
                        ride_id=ride_id,
                        driver_id=driver_id,
                        hike_event=hike_id,
                        **old_data
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not create ride"}

    def cancel_ride(self, hike_id: int, ride_id: int, user_id: int) -> bool:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT hike_event
                            , ride_id
                        FROM ride
                        WHERE hike_event = %s AND ride_id = %s;
                        """,
                        [hike_id, ride_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        print("Ride not associated with specified hike")
                        return False
                    # Run our DELETE statement
                    result = db.execute(
                        """
                        DELETE FROM ride
                        WHERE hike_event = %s AND ride_id = %s
                        AND driver_id = %s;
                        """,
                        [
                            hike_id,
                            ride_id,
                            user_id,
                        ],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def create_rider(
        self, hike_id: int, ride_id: int, rider_id: int
    ) -> RiderOut:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT ride_id
                            , hike_event
                        FROM ride
                        WHERE ride_id = %s AND hike_event = %s;
                        """,
                        [ride_id, hike_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {
                            "message": "Specified ride does not exist for hike"
                        }
                    result = db.execute(
                        """
                        SELECT user_id
                            , hike_id
                        FROM hikes_users
                        WHERE user_id = %s AND hike_id = %s;
                        """,
                        [rider_id, hike_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {"message": "User does not belong to hike"}
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO ride_users
                            (rider_id, trip_id)
                        VALUES
                            (%s, %s)
                        RETURNING rider_id, trip_id;
                        """,
                        [rider_id, ride_id],
                    )
                    rider_id = result.fetchone()[0]
                    return RiderOut(rider_id=rider_id, trip_id=ride_id)
        except Exception as e:
            print(e)
            return {"message": "Could not join ride"}

    def unjoin_ride(self, hike_id: int, ride_id: int, rider_id: int) -> bool:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT hike_event
                            , ride_id
                        FROM ride
                        WHERE hike_event = %s AND ride_id = %s;
                        """,
                        [hike_id, ride_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        print("Ride not associated with specified hike")
                        return False
                    result = db.execute(
                        """
                        SELECT rider_id
                            , trip_id
                        FROM ride_users
                        WHERE rider_id = %s AND trip_id = %s;
                        """,
                        [rider_id, ride_id],
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        print("User does not belong to ride")
                        return False
                    # Run our DELETE statement
                    result = db.execute(
                        """
                        DELETE FROM ride_users
                        WHERE rider_id = %s AND trip_id = %s;
                        """,
                        [rider_id, ride_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_riders(self, trip_id: int) -> Union[List[int], Error]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT rider_id
                        FROM ride_users
                        WHERE trip_id = %s
                        """,
                        [trip_id],
                    )
                    rider_ids = [record[0] for record in db.fetchall()]
                    return rider_ids
        except Exception as e:
            print(e)
            return {"message": "Could not get rider"}
