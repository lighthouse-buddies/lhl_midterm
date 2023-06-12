-- Drop table if exists
-- DROP TABLE IF EXISTS users;

-- Create table
CREATE TABLE users (
                     id SERIAL PRIMARY KEY,
                     username VARCHAR NOT NULL,
                     email VARCHAR UNIQUE NOT NULL,
                     password VARCHAR NOT NULL,
                     deleted_at TIMESTAMP DEFAULT NULL
);
