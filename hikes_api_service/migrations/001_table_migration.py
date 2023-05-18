steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(50) NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            picture_url VARCHAR(100000) NULL,
            email VARCHAR(100) NOT NULL,
            university_name VARCHAR(50) NOT NULL,
            university_year SMALLINT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE emergency_contact (
            contact_id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(50) NOT NULL,
            relation VARCHAR(50) NOT NULL,
            phone_number BIGINT NOT NULL,
            email VARCHAR(100) NOT NULL,
            users_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE emergency_contact;
        """
    ]
]
