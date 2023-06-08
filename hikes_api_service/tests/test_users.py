from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from authenticator import authenticator

client = TestClient(app)


def fake_account():
    return {
        "user_id": 1,
        "full_name": "Bo Jangles",
        "username": "BoJangles",
        "picture_url": "some_picture.jpeg",
        "email": "BJangles@email.com",
        "university_name": "BJ University",
        "university_year": 2020,
    }


class EmptyUserRepository:
    def get_all(self):
        return [
            {
                "user_id": 1,
                "full_name": "Bo Jangles",
                "username": "BoJangles",
                "picture_url": "some_picture.jpeg",
                "email": "BJangles@email.com",
                "university_name": "BJ University",
                "university_year": 2020,
            }
        ]


def test_create_a_user():
    # Arrange
    app.dependency_overrides[UserRepository] = EmptyUserRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_account
    expected = [
        {
            "user_id": 1,
            "full_name": "Bo Jangles",
            "username": "BoJangles",
            "picture_url": "some_picture.jpeg",
            "email": "BJangles@email.com",
            "university_name": "BJ University",
            "university_year": 2020,
        }
    ]
    response = client.get("/users")
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected
