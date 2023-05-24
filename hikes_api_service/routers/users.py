from fastapi import APIRouter, Depends, Response, Request, status, HTTPException
from typing import List, Union
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.users import UserIn, UserRepository, UserOut, UserOutWithPassword, Error, Optional

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data)
) -> UserToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

@router.post("/signup", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print(hashed_password)
    try:
        user = repo.create(info, hashed_password)
        print(user)
    except Error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    print(user)
    return UserToken(account=user, **token.dict())


@router.get("/users", response_model=Union[Error, List[UserOut]])
def get_all(
    repo: UserRepository = Depends()
):
    return repo.get_all()


@router.put("/users/{user_id}", response_model=Union[Error, UserOut])
def update_user(
    user_id: int,
    user: UserIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserRepository = Depends(),
) -> Union[Error, UserOut]:
    print(user)
    print(account_data)
    if account_data["user_id"] == user_id:
        hashed_password = authenticator.hash_password(user.password)
        print(hashed_password)
        updated_user = repo.update(user_id, user, hashed_password)
        if updated_user:
            response.status = 200
            return updated_user
        else:
            response.status = 400
            return {"message": "unable to update user"}
    else:
        response.status = 404
        return {"message": "Id doesn't match current user"}
        

# async def update_user(
#     info: UserIn,
#     request: Request,
#     response: Response,
#     repo: UserRepository = Depends(),
# ):
#     hashed_password = authenticator.hash_password(info.password)
#     print(hashed_password)
#     try:
#         user = repo.update(info, hashed_password)
#         print(user)
#     except Error:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot update an account with those credentials",
#         )
#     form = UserForm(username=info.username, password=info.password)
#     token = await authenticator.login(response, request, form, repo)
#     print(user)
#     return UserToken(account=user, **token.dict())

@router.get("/users/{username}", response_model=Optional[UserOut])
def get_one_user(
    username: str,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_user(username)
    if user is None:
        response.status_code = 404
    return user
    


@router.delete("/users/{user_id}", response_model=bool)
async def delete_user(
    user_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserRepository = Depends(),
) -> bool:
    print(account_data)
    if account_data["user_id"] == user_id:
        return repo.delete(user_id)
    else:
        return False
