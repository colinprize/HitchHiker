from fastapi import APIRouter, Depends, Response
from pydantic import ValidationError
from typing import Union, List
from authenticator import authenticator
from queries.rides import (
    Error,
    RideIn,
    RideRepository,
    RideOut,
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


@router.get(
    "/hikes/{hike_id}/rides", response_model=Union[List[RideOut], Error]
)
def get_all(
    hike_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    return repo.get_all(hike_id)


@router.get("/userrides", response_model=Union[List[RideOut], Error])
def get_all_user_rides(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    rider_id = account_data["user_id"]
    return repo.get_all_user_rides(rider_id)


@router.get("/rides/{ride_id}")
def get_one_ride(
    ride_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> RideOut:
    return repo.get_one(ride_id)


@router.put(
    "/hikes/{hike_id}/rides/{ride_id}", response_model=Union[RideOut, Error]
)
def update_ride(
    hike_id: int,
    ride_id: int,
    ride: RideIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> Union[Error, RideOut]:
    user_id = account_data["user_id"]
    ride_instance = repo.get_one(ride_id)
    if user_id == ride_instance.driver_id:
        return repo.update(hike_id, ride_id, ride, user_id)
    else:
        response.status = 404
        return {"message": "You are not the ride creator"}


@router.delete("/hikes/{hike_id}/rides/{ride_id}", response_model=bool)
def delete_ride(
    hike_id: int,
    ride_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> bool:
    user_id = account_data["user_id"]
    ride_instance = repo.get_one(ride_id)
    if user_id == ride_instance.driver_id:
        return repo.cancel_ride(hike_id, ride_id, user_id)
    else:
        return False


@router.post(
    "/hikes/{hike_id}/rides/{ride_id}/riders",
    response_model=Union[RiderOut, Error],
)
def create_rider(
    hike_id: int,
    ride_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    rider_id = account_data["user_id"]
    return repo.create_rider(hike_id, ride_id, rider_id)


@router.delete("/hikes/{hike_id}/rides/{ride_id}/riders", response_model=bool)
def delete_rider(
    hike_id: int,
    ride_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
) -> bool:
    rider_id = account_data["user_id"]
    return repo.unjoin_ride(hike_id, ride_id, rider_id)


@router.get("/rides/{trip_id}/riders", response_model=Union[List[int], Error])
def get_trip_riders(
    trip_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RideRepository = Depends(),
):
    try:
        return repo.get_riders(trip_id)
    except ValidationError as e:
        print(e)
        raise
