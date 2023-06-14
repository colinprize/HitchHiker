from fastapi.testclient import TestClient
from main import app
from queries.rides import RideRepository
from queries.hikes import HikeOut
from authenticator import authenticator

client = TestClient(app)


class CreateRideQueries:
    def create(self, hike_id, ride, driver_id):
        result = {"ride_id": 1, "driver_id": driver_id, "hike_event": hike_id}
        result.update(ride)
        return result


def fake_account():
    return {
        "user_id": 1,
        "full_name": "Bart Simpson",
        "username": "elbarto",
        "picture_url": "littlehellraiser.jpeg",
        "email": "bartsimpson@springfieldelementary.edu",
        "university_name": "Springfield Elementary",
        "university_year": 1994,
    }


def fake_hike():
    return {
        "hike_id": 1,
        "trail_name": "Mt. Springfield",
        "image_url": "https://shorturl.at/MY156",
        "date_time": "2023-07-04T10:00:00",
        "organizer_id": 1,
        "hike_description": "Come see why Springfield is a part of us all.",
        "max_hikers": 80,
    }


def test_create_ride():
    # Arrange
    app.dependency_overrides[HikeOut] = fake_hike
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_account
    app.dependency_overrides[RideRepository] = CreateRideQueries

    # Act
    json = {
        "max_riders": 5,
        "meetup_time": "2023-07-04T08:00:00",
        "meetup_location": "Kwik-E-Mart Springfield, OR  97403",
    }

    expected = {
        "ride_id": 1,
        "driver_id": 1,
        "max_riders": 5,
        "meetup_time": "2023-07-04T08:00:00",
        "meetup_location": "Kwik-E-Mart Springfield, OR  97403",
        "hike_event": 1,
        "driver_img": None,
    }

    response = client.post("/hikes/1/rides", json=json)

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
