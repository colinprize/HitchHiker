from fastapi.testclient import TestClient
from main import app
from queries.hikes import HikeRepository
from authenticator import authenticator

client = TestClient(app)


def fake_account():
    return {
        "user_id": 2,
        "full_name": "string",
        "username": "string",
        "picture_url": "string",
        "email": "string@string.com",
        "university_name": "string",
        "university_year": 2020,
    }


class EmptyHikeRepository:
    def get_all(self):
        return [
            {
                "hike_id": 1,
                "trail_name": "Mt Si",
                "image_url": "https://shorturl.at/beiqC",
                "date_time": "2023-06-08T09:01:00",
                "organizer_id": 1,
                "hike_description": "10 miles Medium Difficulty",
                "max_hikers": 4,
            }
        ]


def test_get_all_hikes():
    # arrange
    app.dependency_overrides[HikeRepository] = EmptyHikeRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_account
    expected = [
        {
            "hike_id": 1,
            "trail_name": "Mt Si",
            "image_url": "https://shorturl.at/beiqC",
            "date_time": "2023-06-08T09:01:00",
            "organizer_id": 1,
            "hike_description": "10 miles Medium Difficulty",
            "max_hikers": 4,
        }
    ]
    # act
    response = client.get("/hikes")
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == expected
