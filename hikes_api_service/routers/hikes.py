from fastapi import APIRouter, Depends
from queries.hikes import HikeIn, HikeOut, HikeRepository, Error
from typing import Union, Optional


router = APIRouter()

@router.post("/hikes", response_model=Union[HikeOut,Error])
def create_hike(hike: HikeIn, repo: HikeRepository = Depends()):
    print("hike", hike)
    return repo.create(hike)

@router.put("/hikes/{hike_id}", response_model=Union[HikeOut, Error])
def update_hike(
    hike_id: int,
    hike: HikeIn,
    repo: HikeRepository = Depends(),
) -> Union[Error, HikeOut]:
    return repo.update(hike_id, hike)

@router.delete("/hikes/{hike_id}", response_model=bool)
def delete_hike(
    hike_id: int,
    repo: HikeRepository = Depends(),
) -> bool:
    return repo.delete(hike_id)

@router.get("/hikes/{hike_id}")
def get_one_hike(
    hike_id: int,
    repo: HikeRepository = Depends(),
) -> HikeOut:
    return repo.get_one(hike_id)
