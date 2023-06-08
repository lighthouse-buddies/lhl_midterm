DROP FUNCTION IF EXISTS authenticate_user(VARCHAR, VARCHAR);
-- Create the authenticate_user function
CREATE FUNCTION authenticate_user(
    email VARCHAR,
    password VARCHAR
    )
    RETURNS BOOLEAN AS $$
    DECLARE
    user_exists BOOLEAN;
BEGIN
SELECT EXISTS(SELECT 1 FROM users WHERE users.email = authenticate_user.email AND users.password = authenticate_user.password)
INTO user_exists;

RETURN user_exists; -- Return true if authentication is successful, false otherwise
END;
$$ LANGUAGE plpgsql;
