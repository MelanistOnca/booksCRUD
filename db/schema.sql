DROP TABLE if EXISTS users CASCADE;
DROP TABLE if EXISTS books CASCADE;
DROP TABLE if EXISTS genres CASCADE;
DROP TABLE if EXISTS authors CASCADE;
DROP TABLE if EXISTS usersJoinBooks CASCADE;
DROP TABLE if EXISTS booksJoinGenres CASCADE;
DROP TABLE if EXISTS booksJoinAuthors CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE,
  first_name varchar(20),
  last_name varchar(40),
  email varchar(80),
  zip varchar(5),
  password_digest text
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY UNIQUE,
  title text,
  description text,
  cover text
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY UNIQUE,
  name varchar(40)
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY UNIQUE,
  first_name varchar(20),
  middle_name varchar(60),
  last_name varchar(40)
);

CREATE TABLE usersJoinBooks(
  user_id INT REFERENCES users ON DELETE CASCADE,
  book_id INT REFERENCES books ON DELETE CASCADE
);

CREATE TABLE booksJoinGenres (
  book_id INT REFERENCES books ON DELETE CASCADE,
  genre_id INT REFERENCES genres ON DELETE CASCADE
);

CREATE TABLE booksJoinAuthors (
  book_id INT REFERENCES books ON DELETE CASCADE,
  author_id INT REFERENCES authors ON DELETE CASCADE
);
