-- Create the soft_delete_user function
CREATE OR REPLACE FUNCTION soft_delete_user(
  user_id INT
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the user exists
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = user_id) THEN
    RETURN FALSE; -- Chapter not found, return false
  END IF;

  -- Soft delete the user
  UPDATE users
  SET deleted_at = CURRENT_TIMESTAMP
  WHERE id = user_id;

  RETURN TRUE; -- Chapter soft deleted successfully
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE; -- Chapter deletion failed
END;
$$ LANGUAGE plpgsql;
