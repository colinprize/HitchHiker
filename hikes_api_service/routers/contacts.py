from fastapi import APIRouter, Depends, HTTPException
from queries.contacts import (EmergencyContactIn, ContactRepository,
                              EmergencyContactOut, Error)
from typing import Union
from authenticator import authenticator
from pydantic import ValidationError


router = APIRouter()


@router.post("/users/contact",
             response_model=Union[EmergencyContactOut, Error])
def create_contact(
    contact: EmergencyContactIn,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: ContactRepository = Depends()
):
    users_id = account["user_id"]
    return repo.create(contact, users_id)


@router.put("/users/contact/{contact_id}",
            response_model=Union[EmergencyContactOut, Error])
def update_contact(
    contact: EmergencyContactIn,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: ContactRepository = Depends()
) -> Union[Error, EmergencyContactOut]:
    x = account["user_id"]
    users_info = repo.get_one(x)
    if account["user_id"] == users_info.users_id:
        users_id = account["user_id"]
        updated_contact = repo.update(contact, users_id)
        if updated_contact:
            return updated_contact
        else:
            raise HTTPException(
                status_code=400, detail="Unable to update emergency contact")
    else:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized: ID doesn't match current user")


@router.get("/users/{users_id}/contact",
            response_model=Union[EmergencyContactOut, Error])
def get_one_contact(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ContactRepository = Depends()
):
    try:
        users_id = account_data["user_id"]
        return repo.get_one(users_id)
    except ValidationError as e:
        print(e)
        raise
