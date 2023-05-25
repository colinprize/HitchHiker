from fastapi import APIRouter, Depends, Response
from queries.hikes import HikeIn, HikeOut, HikeRepository, Error
from authenticator import authenticator
from typing import Union, List


router = APIRouter()

@router.post("/hikes", response_model=Union[HikeOut,Error])
def create_hike(
    hike: HikeIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: HikeRepository = Depends()
):
    print(account_data)
    organizer_id = account_data["user_id"]
    print(organizer_id)
    print("hike", hike)
    return repo.create(hike, organizer_id)

@router.put("/hikes/{hike_id}", response_model=Union[HikeOut, Error])
def update_hike(
    hike_id: int,
    hike: HikeIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: HikeRepository = Depends(),
) -> Union[Error, HikeOut]:
    # return repo.update(hike_id, hike)
    user = account_data["user_id"]
    hike_info = repo.get_one(hike_id)
    if  user == hike_info.organizer_id:
        updated_hike = repo.update(hike_id, hike, user)
        if updated_hike:
            response.status = 200
            return updated_hike
        else:
            response.status = 400
            return {"message": "unable to update hike"}
    else:
        response.status = 404
        return {"message": "Id doesn't match current hike organizer"}


@router.get("/hikes/{hike_id}")
def get_one_hike(
    hike_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: HikeRepository = Depends(),
) -> HikeOut:
    return repo.get_one(hike_id)

@router.delete("/hikes/{hike_id}", response_model=bool)
def delete_hike(
    hike_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: HikeRepository = Depends(),
) -> bool:
    hike = repo.get_one(hike_id)
    print(hike)
    print(hike_id)
    if account_data["user_id"] == hike.organizer_id:
        return repo.delete(hike_id)
    else:
        return False

@router.get("/hikes", response_model=Union[List[HikeOut], Error])
def get_all_hikes(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: HikeRepository = Depends()
):
    return repo.get_all()
