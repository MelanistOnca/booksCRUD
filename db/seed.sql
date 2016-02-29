-- Inserting some books

INSERT INTO books (title, description) VALUES
('Old Man''s War', 'Old people get new bodies to fight space battles'),
('Neuromancer','Basically started Cyberpunk'),
('The Black Prism','Color magic, ya dig?'),
('A Song of Ice and Fire', 'Please don''t die before finishing, GRRM'),
('1984', 'This was a warning, not a how-to guide, goddamnit');

-- Inserting some authors
INSERT INTO authors (first_name, middle_name, last_name) VALUES
('William', 'Ford', 'Gibson'),
('John', 'Michael', 'Scalzi'),
('George', 'Arthur', 'Orwell'),
('George', 'R.R.', 'Martin'),
('Brent', '', 'Weels');
-- does an empty comma allow for a 'null' entry? no. had to put empty string

-- Inserting some genres
INSERT INTO genres (name) VALUES
('Scifi'),
('Cyperpunk'),
('High Fantasy'),
('Low Fantasy'),
('Dystopian');

-- Insert a user so I can check queries are working. lacks a password_digest as i have not yet done user login functionality
INSERT INTO users (first_name, last_name, email, zip) VALUES
('barney', 'userson', 'barney.userson@email.com', 11540);

-- Inserting some booksJoinGenres
INSERT INTO booksJoinGenres (book_id, genre_id) VALUES
(1,1),
(2,1),
(2,2),
(2,5),
(3,3),
(4,4),
(4,5),
(5,5);

INSERT INTO booksJoinAuthors (book_id, author_id) VALUES
(1,2),
(2,1),
(3,5),
(4,4),
(5,3);
