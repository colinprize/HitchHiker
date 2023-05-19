from pydantic import BaseModel
from typing import Optional
from queries.pool import pool

class UserIn(BaseModel):
    full_name: str
    username: str
    password: str
    picture_url: Optional[str]
    email: str
    university_name: str
    university_year: int


class UserOut(BaseModel):
    user_id: int
    full_name: str
    username: str
    password: str
    picture_url: Optional[str]
    email: str
    university_name: str
    university_year: int


class UserRepository:
    def create(self, user: UserIn) -> UserOut:
        #connect the database
        with pool.connection() as connection:
        #here is where we create our pool of connections
            #get a cursor (something to run SQL with)
            with connection.cursor() as db:
                #Run our insert statement
                result = db.execute(
                    """
                    INSERT INTO users
                        (full_name, username, password, picture_url, email, university_name, university_year)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING user_id;
                    """,
                    [
                        user.full_name,
                        user.username,
                        user.password,
                        user.picture_url,
                        user.email,
                        user.university_name,
                        user.university_year
                    ]
                )
                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(user_id=id, **old_data)
