CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    Role VARCHAR(11) NOT NULL,
    password VARCHAR(255) NOT NULL,
   created_date TIMESTAMP,
   modified_date TIMESTAMP
);
