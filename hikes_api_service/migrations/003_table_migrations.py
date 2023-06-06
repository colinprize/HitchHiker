steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE ride (
            ride_id SERIAL PRIMARY KEY NOT NULL,
            driver_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            max_riders INTEGER NOT NULL CHECK(max_riders BETWEEN 0 and 10),
            meetup_time TIMESTAMP NOT NULL,
            meetup_location VARCHAR(200),
            hike_event INT NOT NULL REFERENCES hike(hike_id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE ride;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE ride_users (
            rider_id INT NOT NULL REFERENCES users(user_id),
            trip_id INT NOT NULL REFERENCES ride(ride_id) ON DELETE CASCADE,
            CONSTRAINT ride_users_pk PRIMARY KEY (rider_id, trip_id),
            CONSTRAINT FK_users FOREIGN KEY (rider_id)
            REFERENCES users (user_id),
            CONSTRAINT FK_rides FOREIGN KEY (trip_id) REFERENCES ride (ride_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE ride_users;
        """
    ]
]
