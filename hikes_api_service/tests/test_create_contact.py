from fastapi.testclient import TestClient
from main import app
from queries.contacts import ContactRepository, EmergencyContactOut
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
        "university_year": 2020
    }


class CreateContactRepository:
    def create(self, contact, user_id):
        return EmergencyContactOut(
            contact_id=1,
            full_name=contact.full_name,
            relation=contact.relation,
            phone_number=contact.phone_number,
            email=contact.email,
            users_id=user_id
        )


def test_create_contact():
    # Arrange
    app.dependency_overrides[ContactRepository] = CreateContactRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_account
    # Act
    json = {
        "full_name": "Wayne Diesel",
        "relation": "Father",
        "phone_number": 8675309,
        "email": "wayne@fakeemail.com"
    }
    expected = {
        "contact_id": 1,
        "full_name": "Wayne Diesel",
        "relation": "Father",
        "phone_number": 8675309,
        "email": "wayne@fakeemail.com",
        "users_id": 2
    }
    response = client.post("/users/contact", json=json)
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected
