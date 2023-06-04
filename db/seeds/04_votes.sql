-- Drop table if exists
DROP TABLE IF EXISTS votes;

-- Create table
CREATE TABLE votes (
                     id INT PRIMARY KEY,
                     user_id INT,
                     chapter_id INT,
                     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                     FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);
