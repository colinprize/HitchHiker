from fastapi import APIRouter, Depends, HTTPException
from queries.contacts import EmergencyContactIn, ContactRepository, EmergencyContactOut, Error
from typing import Union
from authenticator import authenticator

router = APIRouter()

@router.post("/users/contact", response_model=Union[EmergencyContactOut, Error])
def create_contact(
    contact: EmergencyContactIn,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: ContactRepository = Depends()
    ):
    users_id = account["user_id"]
    return repo.create(contact, users_id)

@router.put("/users/contact/{contact_id}", response_model=Union[EmergencyContactOut, Error])
def update_contact(
    contact_id: int,
    contact: EmergencyContactIn,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: ContactRepository = Depends()
) -> Union[Error, EmergencyContactOut]:
    users_info = repo.get_one(contact_id)
    if account["user_id"] == users_info.users_id:
        users_id = account["user_id"]
        updated_contact = repo.update(contact_id, contact, users_id)
        if updated_contact:
            return updated_contact
        else:
            raise HTTPException(status_code=400, detail="Unable to update emergency contact")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized: ID doesn't match current user")
