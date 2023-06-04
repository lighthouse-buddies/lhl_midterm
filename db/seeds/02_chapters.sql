-- Insert seed data into chapters table
INSERT INTO chapters (id, content, prev, user_id) VALUES
                                                    (1, 'Chapter 1 Content', NULL, 1),
                                                    (2, 'Chapter 2 Content', 1, 2),
                                                    (3, 'Chapter 3 Content', 2, 3);
