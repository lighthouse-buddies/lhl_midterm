-- Insert seed data into chapters table
INSERT INTO chapters (content, prev, user_id) VALUES
                                                    ('Chapter 1 Content', NULL, 1),
                                                    ('Chapter 2 Content', 1, 2),
                                                    ('Chapter 3 Content', 2, 3);
