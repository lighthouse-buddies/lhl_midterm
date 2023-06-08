-- Create the create_user function
CREATE OR REPLACE FUNCTION create_user(
  username VARCHAR,
  email VARCHAR,
  password VARCHAR
)
RETURNS INT AS $$
DECLARE
user_id INT;
BEGIN
INSERT INTO users (username, email, password)
VALUES (username, email, password)
  RETURNING id INTO user_id;

RETURN user_id; -- Return the user ID of the newly created user
END;
$$ LANGUAGE plpgsql;
