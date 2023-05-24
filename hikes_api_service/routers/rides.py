from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.rides import(
    Error,
    RideIn,
    RideRepository,
    RideOut,
)

router = APIRouter()

@router.post("/hikes/{hike_id}/rides", response_model=Union[RideOut, Error])
def create_ride(
    hike_id: int,
    ride: RideIn,
    response: Response,
    repo: RideRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(hike_id, ride)

@router.get("/hikes/{hike_id}/rides", response_model=Union[List[RideOut], Error])
def get_all(
    hike_id: int,
    repo: RideRepository = Depends(),
):
    return repo.get_all(hike_id)

@router.put("/hikes/{hike_id}/rides/{ride_id}", response_model=Union[RideOut, Error])
def update_ride(
    hike_id: int,
    ride_id: int,
    ride: RideIn,
    repo: RideRepository = Depends(),
) -> Union[Error, RideOut]:
    return repo.update(hike_id, ride_id, ride)

@router.delete("/hikes/{hike_id}/rides/{ride_id}", response_model=bool)
def delete_ride(
    hike_id: int,
    ride_id: int,
    repo: RideRepository = Depends(),
) -> bool:
    return repo.cancel_ride(hike_id, ride_id)
