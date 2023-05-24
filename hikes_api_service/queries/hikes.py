from queries.pool import pool
from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import datetime

class Error(BaseModel):
    message: str

class HikeIn(BaseModel):
    trail_name: str
    image_url: str
    date_time: datetime
    organizer_id: int
    hike_description: Optional[str]
    max_hikers: int

class HikeOut(BaseModel):
    hike_id: int
    trail_name: str
    image_url: str
    date_time: datetime
    organizer_id: int
    hike_description: Optional[str]
    max_hikers: int

class HikeRepository:

    def get_all(self) -> Union[Error, List[HikeOut]]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        SELECT hike_id, trail_name, image_url, date_time, organizer_id, hike_description, max_hikers
                        FROM hike
                        ORDER BY hike_id;
                        """
                    )
                    return [
                        HikeOut(
                            hike_id=record[0],
                            trail_name=record[1],
                            image_url=record[2],
                            date_time=record[3],
                            organizer_id=record[4],
                            hike_description=record[5],
                            max_hikers=record[6],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "get didn't work"}

    def create(self, hike: HikeIn) -> HikeOut:
        try:
            #connect the database
            with pool.connection() as connection:
                #here is where we create our pool of connections
                #get a cursor (something to run SQL with)
                with connection.cursor() as db:
                    #Run our insert statement
                    result = db.execute(
                        """
                        INSERT INTO hike
                            (trail_name, image_url, date_time, organizer_id, hike_description, max_hikers)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING hike_id;
                        """,
                        [
                            hike.trail_name,
                            hike.image_url,
                            hike.date_time,
                            hike.organizer_id,
                            hike.hike_description,
                            hike.max_hikers
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = hike.dict()
                    return HikeOut(hike_id=id, **old_data)
        except Exception as e:
            print(e)
            return False

    def update(self, hike_id: int, hike: HikeIn) -> Union[HikeOut, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        UPDATE hike
                        SET trail_name = %s
                            , image_url = %s
                            , date_time = %s
                            , organizer_id = %s
                            , hike_description = %s
                            , max_hikers = %s
                        WHERE hike_id = %s
                        """,
                        [
                            hike.trail_name,
                            hike.image_url,
                            hike.date_time,
                            hike.organizer_id,
                            hike.hike_description,
                            hike.max_hikers,
                            hike_id
                        ]
                    )
                    return self.hike_in_to_out(hike_id, hike)

        except Exception as e:
            print(e)
            return {"message": "update didn't work"}

    def get_one(self, hike_id: int) -> Optional[HikeOut]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        SELECT hike_id
                            , trail_name
                            , image_url
                            , date_time
                            , organizer_id
                            , hike_description
                            , max_hikers
                        FROM hike
                        WHERE hike_id =%s
                        """,
                        [hike_id]
                    )
                    record =result.fetchone()
                    return self.record_to_hike_out(record)
        except Exception:
            return {"message": "could not get hike"}


    def delete(self, hike_id: int) -> bool:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from hike
                        WHERE hike_id = %s
                        """,
                        [hike_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def hike_in_to_out(self, id: int, hike: HikeIn):
        old_data = hike.dict()
        return HikeOut(hike_id=id, **old_data)

    def record_to_hike_out(self, record):
        return HikeOut(
            hike_id=record[0],
            trail_name=record[1],
            image_url=record[2],
            date_time=record[3],
            organizer_id=record[4],
            hike_description=record[5],
            max_hikers=record[6]
        )
