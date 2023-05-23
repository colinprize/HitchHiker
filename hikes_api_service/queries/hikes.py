from queries.pool import pool
from pydantic import BaseModel
from typing import Optional, Union
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
    def create(self, hike: HikeIn) -> HikeOut:
        try:            #connect the database
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
                    # return self.hike_in_to_out(id, hike)
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

        except Exception:
            return {"message": "update didn't work"}

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
