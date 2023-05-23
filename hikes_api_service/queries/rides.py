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
    hike_event: int


class RideOut(BaseModel):
    ride_id: int
    driver_id: int
    max_riders: int
    meetup_time: datetime
    meetup_location: Optional[str]
    hike_event: int


class RideRepository:
    def get_all(self) -> Union[Error, List[RideOut]]:
        try:
        # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT ride_id, driver_id, max_riders, meetup_time, meetup_location, hike_event
                        FROM rides
                        ORDER BY hike_event;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     ride = RideOut(
                    #         ride_id=record[0],
                    #         driver_id=record[1],
                    #         max_riders=record[2],
                    #         meetup_time=record[3],
                    #         meetup_location=record[4],
                    #         hike_event=record[5],
                    #     )
                    #     result.append(ride)
                    #     print(record)
                    # return result
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
    def create(self, ride: RideIn) -> RideOut:
        # Connect the database
        with pool.connection() as conn:
            # Get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO rides
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
                        ride.hike_event
                    ]
                )
                ride_id = result.fetchone()[0]
                # Return new data
                old_data = ride.dict()
                return RideOut(ride_id=ride_id, **old_data)
