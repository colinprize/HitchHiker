steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE hike (
            hike_id SERIAL PRIMARY KEY NOT NULL,
            trail_name VARCHAR(50) NOT NULL,
            image_url VARCHAR(2000) NOT NULL,
            date_time TIMESTAMP NOT NULL,
            organizer_id INT NOT NULL REFERENCES users(user_id),
            hike_description TEXT NULL,
            max_hikers INTEGER NOT NULL CHECK(max_hikers BETWEEN 0 AND 100)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE hike;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE hikes_users(
            user_id INT NOT NULL REFERENCES users(user_id),
            hike_id INT NOT NULL REFERENCES hike(hike_id),
            CONSTRAINT hikes_users_pk PRIMARY KEY (user_id, hike_id),
            CONSTRAINT FK_users FOREIGN KEY (user_id) REFERENCES users (user_id),
            CONSTRAINT FK_hikes FOREIGN KEY (hike_id) REFERENCES hike (hike_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE hikes_users;
        """
    ]
]
