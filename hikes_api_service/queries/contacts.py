from pydantic import BaseModel
from queries.pool import pool
from typing import Union, Optional


class Error(BaseModel):
    message: str


class EmergencyContactIn(BaseModel):
    full_name: str
    relation: str
    phone_number: int
    email: str
    # users_id: int


class EmergencyContactOut(BaseModel):
    contact_id: int
    full_name: str
    relation: str
    phone_number: int
    email: str
    users_id: int


class ContactRepository:
    def update(
        self, contact: EmergencyContactIn, users_id: int
    ) -> Union[EmergencyContactOut, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        SELECT contact_id
                        FROM emergency_contact
                        WHERE users_id = %s
                        """,
                        [users_id],
                    )
                    record = result.fetchone()
                    contact_id = record[0]
                    db.execute(
                        """
                        UPDATE emergency_contact
                        SET full_name = %s
                            , relation = %s
                            , phone_number = %s
                            , email = %s
                        WHERE users_id = %s
                        """,
                        [
                            contact.full_name,
                            contact.relation,
                            contact.phone_number,
                            contact.email,
                            users_id,
                        ],
                    )
                    old_data = contact.dict()
                    return EmergencyContactOut(
                        contact_id=contact_id, users_id=users_id, **old_data
                    )
        except Exception as e:
            print(e)
            return {"message": "Couldn't update emergency contact"}

    def create(
        self, contact: EmergencyContactIn, users_id: int
    ) -> EmergencyContactOut:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO emergency_contact
                            (
                                full_name,
                                relation,
                                phone_number,
                                email, users_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING contact_id;
                        """,
                        [
                            contact.full_name,
                            contact.relation,
                            contact.phone_number,
                            contact.email,
                            users_id,
                        ],
                    )
                    print(result)
                    contact_id = result.fetchone()[0]
                    old_data = contact.dict()
                    return EmergencyContactOut(
                        contact_id=contact_id, users_id=users_id, **old_data
                    )
        except Exception as e:
            print(e)
            return {"message": "Couldn't create emergency contact"}

    def get_one(self, users_id: int) -> Optional[EmergencyContactOut]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        SELECT contact_id
                            , full_name
                            , relation
                            , phone_number
                            , email
                            , users_id
                        FROM emergency_contact
                        WHERE users_id = %s
                        """,
                        [users_id],
                    )
                    record = result.fetchone()
                    return self.record_to_contact_out(record)
        except Exception as e:
            print(e)
            return {"message": "Couldn't get emergency contact"}

    def record_to_contact_out(self, record):
        return EmergencyContactOut(
            contact_id=record[0],
            full_name=record[1],
            relation=record[2],
            phone_number=record[3],
            email=record[4],
            users_id=record[5],
        )
