-- Drop table if exists
-- DROP TABLE IF EXISTS votes;

-- Create table
CREATE TABLE votes (
                     id SERIAL PRIMARY KEY,
                     user_id INT,
                     chapter_id INT,
                     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                     FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
                     CONSTRAINT unique_user_chapter_combination UNIQUE (user_id, chapter_id)
);
