from fastapi import APIRouter, Depends, Response
from typing import Union, List
from authenticator import authenticator
from queries.rides import(
    Error,
    RideIn,
    RideRepository,
    RideOut,
    # RiderIn,
    RiderOut,
)

router = APIRouter()

@router.post("/hikes/{hike_id}/rides", response_model=Union[RideOut, Error])
def create_ride(
    hike_id: int,
    ride: RideIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    driver_id = account_data["user_id"]
    return repo.create(hike_id, ride, driver_id)

@router.get("/hikes/{hike_id}/rides", response_model=Union[List[RideOut], Error])
def get_all(
    hike_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    return repo.get_all(hike_id)

@router.put("/hikes/{hike_id}/rides/{ride_id}", response_model=Union[RideOut, Error])
def update_ride(
    hike_id: int,
    ride_id: int,
    ride: RideIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> Union[Error, RideOut]:
    user_id = account_data["user_id"]
    return repo.update(hike_id, ride_id, ride, user_id)

@router.delete("/hikes/{hike_id}/rides/{ride_id}", response_model=bool)
def delete_ride(
    hike_id: int,
    ride_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> bool:
    user_id = account_data["user_id"]
    return repo.cancel_ride(hike_id, ride_id, user_id)

@router.post("/hikes/{hike_id}/rides/{ride_id}/riders", response_model=Union[RiderOut, Error])
def create_rider(
    hike_id: int,
    ride_id: int,
    # rider: RiderIn, # DELETE THIS LINE!!!
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    rider_id = account_data["user_id"]
    # return repo.create_rider(hike_id, ride_id, rider, rider_id) # DELETE THIS LINE!!!
    return repo.create_rider(hike_id, ride_id, rider_id)

@router.delete("/hikes/{hike_id}/rides/{ride_id}/riders", response_model=bool)
def delete_rider(
    hike_id: int,
    ride_id: int,
    # rider_id: int, # DELETE THIS LINE!!!
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> bool:
    rider_id = account_data["user_id"]
    return repo.unjoin_ride(hike_id, ride_id, rider_id)
