from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.rides import(
    Error,
    RideIn,
    RideRepository,
    RideOut,
)

router = APIRouter()


@router.post("/hikes/{hike_id}/rides", response_model=Union[RideOut, Error]) ## CHECK THIS - IS DEPENDENT ON HIKE DETAIL VIEW!!
def create_ride(
    hike_id: int,
    ride: RideIn,
    response: Response,
    repo: RideRepository = Depends(),
):
    response.status_code = 400
    return repo.create(ride)


@router.get("/hikes/{hike_id}/rides", response_model=Union[List[RideOut], Error])
def get_all(
    repo: RideRepository = Depends(),
):
    return repo.get_all()
