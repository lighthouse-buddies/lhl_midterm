-- Drop table if exists
DROP TABLE IF EXISTS chapters;

-- Create table
CREATE TABLE chapters (
                        id INT PRIMARY KEY,
                        content TEXT NOT NULL,
                        prev INT,
                        user_id INT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        deleted_at TIMESTAMP DEFAULT NULL,
                        FOREIGN KEY (prev) REFERENCES chapters(id) ON DELETE CASCADE,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
