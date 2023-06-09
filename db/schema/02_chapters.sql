-- Drop table if exists
DROP TABLE IF EXISTS chapters;

-- Create table
CREATE TABLE chapters (
                        id SERIAL PRIMARY KEY,
                        content VARCHAR(5000) NOT NULL,
                        prev INT,
                        user_id INT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        deleted_at TIMESTAMP DEFAULT NULL,
                        FOREIGN KEY (prev) REFERENCES chapters(id) ON DELETE CASCADE,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
