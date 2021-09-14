CREATE TABLE IF NOT EXISTS users
(
    "id" serial NOT NULL,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    PRIMARY KEY ("id")
); 

INSERT INTO users VALUES (0,'user1','$2a$10$xknuV4dKctH889jEqTBo6e/iZB46mFDa0P43ViAoaZ6Gnsuc0m6AS','user1@mail.com');   
INSERT INTO users VALUES (1,'user2','$2a$10$5jjiRjaiwF9hsqZNhlhDIOCK1hhym2BN7TRPCIA6/Leg6AI1NMgta','user2@mail.com'); 
INSERT INTO users VALUES (2,'user3','$2a$10$a1ni0mjd6Y4Y.P6XsDU5ZeZXyD8COAHAmJN8b5KV3MHIo1AtdTH8i','user3@mail.com'); 


CREATE TABLE IF NOT EXISTS books 
( 
    "id" serial NOT NULL,
    title text UNIQUE NOT NULL,
    author text NOT NULL,
    pub_date date NOT NULL,
    genre text NOT NULL,
    isbn_10 text,
    isnb_13 text,
    PRIMARY KEY ("id")
); 
 
INSERT INTO books VALUES (0,'Ender''s Game','Orson Scott Card','1985-01-15','Sci-Fi','0-312-93208-1');
INSERT INTO books VALUES (1,'Pride and Prejudice','Jane Austen','1813-01-28','Romance');
INSERT INTO books VALUES (2,'Frankenstein; Or, The Modern Prometheus','Mary Wollstonecraft Shelley','1818-01-01','Sci-Fi');
INSERT INTO books VALUES (3,'Alice''s Adventures in Wonderland','Lewis Carroll','1865-11-26','Fantasy');

CREATE TABLE IF NOT EXISTS bookshelves
( 
    "id" serial NOT NULL,
    username text NOT NULL,
    title text NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES users(username),
    CONSTRAINT fk_books FOREIGN KEY (title) REFERENCES books(title)
); 

INSERT INTO bookshelves VALUES (0,'user1','Frankenstein; Or, The Modern Prometheus'); 
INSERT INTO bookshelves VALUES (1,'user1','Ender''s Game'); 
INSERT INTO bookshelves VALUES (2,'user1','Alice''s Adventures in Wonderland'); 

INSERT INTO bookshelves VALUES (3,'user2','Pride and Prejudice'); 
INSERT INTO bookshelves VALUES (4,'user2','Frankenstein; Or, The Modern Prometheus'); 

INSERT INTO bookshelves VALUES (5,'user3','Alice''s Adventures in Wonderland');