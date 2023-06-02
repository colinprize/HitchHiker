from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    full_name: str
    username: str
    password: str
    picture_url: Optional[str]
    email: str
    university_name: str
    university_year: int

# class UpdateUserIn(BaseModel):
#     full_name: str
#     username: str
#     # password: str
#     picture_url: Optional[str]
#     email: str
#     university_name: str
#     university_year: int

class UserOut(BaseModel):
    user_id: int
    full_name: str
    username: str
    # password: str
    picture_url: Optional[str]
    email: str
    university_name: str
    university_year: int

class UserOutWithPassword(UserOut):
    hashed_password: str

class UserRepository:
    def update(self, user_id:int, user:UserIn, hashed_password:str) -> UserOutWithPassword:
        try:
        #connect the database
            with pool.connection() as connection:
            #here is where we create our pool of connections
                #get a cursor (something to run SQL with)
                with connection.cursor() as db:
                    #Run our SELECT statement
                    result = db.execute(
                        """
                        UPDATE users
                        Set full_name = %s
                            , username = %s
                            , password = %s
                            , picture_url = %s
                            , email = %s
                            , university_name = %s
                            , university_year = %s
                        WHERE user_id = %s
                        """,
                        [
                            user.full_name,
                            user.username,
                            hashed_password,
                            user.picture_url,
                            user.email,
                            user.university_name,
                            user.university_year,
                            user_id
                        ]
                    )
                    return self.user_in_to_out(user_id, user, hashed_password)
        except Exception as e:
            print(e)
            return {"message": "Couldn't update user"}

    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
        #connect the database
            with pool.connection() as connection:
            #here is where we create our pool of connections
                #get a cursor (something to run SQL with)
                with connection.cursor() as db:
                    #Run our SELECT statement
                    result = db.execute(
                        """
                        Select * FROM users
                        ORDER BY user_id
                        """
                    )
                    return [ 
                        self.record_to_user_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Couldn't get all users"}

    def create(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        try:
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
                            info.full_name,
                            info.username,
                            hashed_password,
                            info.picture_url,
                            info.email,
                            info.university_name,
                            info.university_year
                        ]
                    )
                    print(result)
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id, info, hashed_password)
                    # return UserOutWithPassword(
                    #         id=id,
                    #         full_name=info.full_name,
                    #         username=info.username,
                    #         hashed_password=hashed_password,
                    #         picture_url=info.picture_url,
                    #         email=info.email,
                    #         university_name=info.university_name,
                    #         university_year=info.university_year
                    # )
        except Exception as e:
            print(e)
            return {"message": "Couldn't create User"}

    def get_user(self, username: str) -> UserOutWithPassword:
        try:
        #connect the database
            with pool.connection() as connection:
            #here is where we create our pool of connections
                #get a cursor (something to run SQL with)
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id
                            , full_name
                            , username
                            , password
                            , picture_url
                            , email
                            , university_name
                            , university_year
                        FROM users
                        WHERE username = %s
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    print(record)
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not return that user"}

    def delete(self, user_id: int) -> bool:
        try:
        #connect the database
            with pool.connection() as connection:
            #here is where we create our pool of connections
                #get a cursor (something to run SQL with)
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def user_in_to_out(self, id:int, user:UserIn, hashed_password:str):
        old_data = user.dict()
        del old_data["password"]
        return UserOutWithPassword(user_id=id, hashed_password=hashed_password, **old_data)
    
    def record_to_user_out(self, record):
        return UserOutWithPassword(
            user_id=record[0],
            full_name=record[1],
            username=record[2],
            hashed_password=record[3],
            picture_url=record[4],
            email=record[5],
            university_name=record[6],
            university_year=record[7]
        )
