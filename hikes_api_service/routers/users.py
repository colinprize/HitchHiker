from fastapi import APIRouter, Depends
from queries.users import UserIn, UserRepository



router = APIRouter()

@router.post("/signup")
def create_user(user: UserIn, repo: UserRepository = Depends()):
    print('user', user) 
    return repo.create(user)
    
