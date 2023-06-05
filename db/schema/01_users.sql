-- Drop table if exists
DROP TABLE IF EXISTS users;

-- Create table
CREATE TABLE users (
                     id INT PRIMARY KEY,
                     username VARCHAR NOT NULL,
                     email VARCHAR NOT NULL,
                     password VARCHAR NOT NULL,
                     deleted_at TIMESTAMP DEFAULT NULL
);
