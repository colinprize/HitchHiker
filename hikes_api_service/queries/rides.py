from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import datetime
from queries.pool import pool


class Error(BaseModel):
    message: str

class RideIn(BaseModel):
    driver_id: int
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


class RideRepository:
    def update(self, hike_id: int, ride_id: int, ride: RideIn) -> Union[RideOut, Error]:
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
                        [
                            hike_id,
                            ride_id
                        ]
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {"message": "Ride not associated with specified hike"}
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        UPDATE ride
                        SET max_riders = %s
                            , meetup_time = %s
                            , meetup_location = %s
                        WHERE hike_event = %s AND ride_id = %s;
                        """,
                        [
                            ride.max_riders,
                            ride.meetup_time,
                            ride.meetup_location,
                            hike_id,
                            ride_id
                        ]
                    )
                    old_data = ride.dict()
                    return RideOut(ride_id=ride_id, hike_event=hike_id, **old_data)
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
                    result = db.execute(
                        """
                        SELECT ride_id, driver_id, max_riders, meetup_time, meetup_location, hike_event
                        FROM ride
                        WHERE hike_event = %s
                        ORDER BY ride_id;
                        """,
                        [
                            hike_id,
                        ]
                    )
                    return [
                        RideOut(
                            ride_id=record[0],
                            driver_id=record[1],
                            max_riders=record[2],
                            meetup_time=record[3],
                            meetup_location=record[4],
                            hike_event=record[5],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all rides"}

    def create(self, hike_id: int, ride: RideIn) -> RideOut:
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
                        [
                            ride.driver_id,
                            hike_id
                        ]
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {"message": "User does not belong to hike"}
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO ride
                            (driver_id, max_riders, meetup_time, meetup_location, hike_event)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING ride_id;
                        """,
                        [
                            ride.driver_id,
                            ride.max_riders,
                            ride.meetup_time,
                            ride.meetup_location,
                            hike_id,
                        ]
                    )
                    ride_id = result.fetchone()[0]
                    # Return new data
                    old_data = ride.dict()
                    return RideOut(ride_id=ride_id, hike_event=hike_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create ride"}

    def cancel_ride(self, hike_id: int, ride_id: int) -> bool:
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
                        [
                            hike_id,
                            ride_id
                        ]
                    )
                    try:
                        (_, _) = result.fetchone()
                    except TypeError:
                        return {"message": "Ride not associated with specified hike"}
                    # Run our DELETE statement
                    result = db.execute()
        except:
            pass
