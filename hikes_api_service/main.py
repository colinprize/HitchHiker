from fastapi import FastAPI
from routers import users, rides, hikes, contacts
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hitch Hiker is the balls"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(authenticator.router)
app.include_router(hikes.router)
app.include_router(contacts.router)
app.include_router(rides.router)
