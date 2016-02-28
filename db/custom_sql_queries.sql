
-- show all books
SELECT * FROM books;

-------------------
-- show single book, include info from books, authors, genres
-- WHERE can have multiple expressions. using a join statement may be cleaner than sever separate statements. see http://www.postgresql.org/docs/9.5/interactive/queries-table-expressions.html#QUERIES-WHERE for more info
SELECT * FROM books WHERE id = $x; --just book info, includes book.id
-- find that book author from booksJoinAuthors table
SELECT author_id FROM booksJoinAuthors WHERE book_id = $x; --returns only author id, which we will call $y
SELECT * FROM authors WHERE id = $y;

-- find that book's genres
SELECT genre_id FROM booksJoinGenres WHERE book_id = $x; --returns row(s) of genre_ID. $z1, $z2, ..., $zn
-- how do i pass multiple rows of responses on to the "list genres" query?

--OR
SELECT array_agg(genre_id) FROM booksJoinGenres WHERE book_id = $x; --returns a single row with an array of genre_id(s) $z[0,1,...,n]

-- can i pass an array for a select statment? most likely i would need to loop through that array

SELECT * FROM genres WHERE id = $z  ;
--------------------

--delete single book
DELETE FROM books WHERE id = $x;
-- do i need to remove relations from join tables?

--possible space saver?
-- DELETE FROM books, authors, genres, WHERE books.id=$x AND authors.id=$y AND genres_id=$z; --doesn't work, 'from' on delete commands doesn't seem compatible with multiple table entries.

--look in to VACUUM command for post-delete disk space cleanup

--

-- From harry in slack
--
-- -- Assume a table x_y_xref with cols x_id, y_id --
-- -- Insert the rows: (1,2), (1,4), (1,7), (1,8), (1,10) --
-- ​
-- -- Using a single statement --
-- INSERT INTO x_y_xref (x_id, y_id)
-- SELECT 1 , y
-- FROM UNNEST(ARRAY[2,4,7,8,10]) AS y;
-- ​
-- -- This is equivalent to the follwoing --
-- INSERT INTO x_y_xref (x_id, y_id)
-- VALUES
-- (1,2), (1,4), (1,7), (1,8), (1,10);
