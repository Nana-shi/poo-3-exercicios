-- Active: 1675700970941@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

INSERT INTO users(id, name, email)
VALUES
    ("u001", "Fulano", "fulano@gmail.com"),
    ("u002", "Beltrana", "beltrana@gmail.com"),
    ("u003", "Ciclano", "ciclano@gmail.com");

SELECT * FROM users;

DROP TABLE users;