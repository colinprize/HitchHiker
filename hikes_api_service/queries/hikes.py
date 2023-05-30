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

    def get_user_hikes(self, user_id: int) -> Union[List[HikeOut], Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        SELECT hike.*
                        FROM hikes_users
                        JOIN hike on hikes_users.hike_id = hike.hike_id
                        WHERE hikes_users.user_id = %s;
                        """,
                        [user_id]
                    )
                    result = db.fetchall()
                    if not result:
                        return Error(message="User is not signed up for any hikes")
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
                            for record in result
                        ]

        except Exception as e:
            print(e)
            return {"Message": "Unable to return your hikes"}

    def create(self, hike: HikeIn, organizer_id:int) -> HikeOut:
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
                            organizer_id,
                            hike.hike_description,
                            hike.max_hikers
                        ]
                    )
                    id = result.fetchone()[0]
                    result = db.execute(
                        """
                        INSERT INTO hikes_users
                            (user_id, hike_id)
                        VALUES
                            (%s, %s);

                        """,
                        [
                            organizer_id,
                            id,
                        ]
                    )
                    old_data = hike.dict()
                    return HikeOut(hike_id=id, organizer_id=organizer_id, **old_data)
        except Exception as e:
            print(e)
            return False

    def update(self, hike_id: int, hike: HikeIn, user:int) -> Union[HikeOut, Error]:
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
                            user,
                            hike.hike_description,
                            hike.max_hikers,
                            hike_id
                        ]
                    )
                    return self.hike_in_to_out(hike_id, hike, user)

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

    def hike_in_to_out(self, id: int, hike: HikeIn, user:int):
        old_data = hike.dict()
        return HikeOut(hike_id=id, organizer_id=user, **old_data)

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

class HikeUser(BaseModel):
    user_id: int
    hike_id: int

class UserHikesRepository:
    def sign_up(self, HikeUser: HikeUser) -> HikeUser:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO hikes_users
                            (user_id, hike_id)
                        VALUES
                            (%s,%s)
                        """,
                        [
                            HikeUser.user_id,
                            HikeUser.hike_id
                        ]
                    )
                    return HikeUser
        except Exception as e:
            print(e)
            return {"message": "could not sign up for hike"}

    def delete(self, hike_id: int, user_id: int) -> bool:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM hikes_users
                        WHERE  user_id = %s AND hike_id = %s
                        """,

                        [
                        user_id,
                        hike_id
                        ]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
