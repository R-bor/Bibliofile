CREATE TABLE IF NOT EXISTS users
(
    "id" serial NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    PRIMARY KEY ("id")
); 

INSERT INTO users VALUES (0,'user1','user1','user1@mail.com');  

CREATE TABLE IF NOT EXISTS books 
( 
    "id" serial NOT NULL, 
    title text NOT NULL, 
    author text NOT NULL, 
    pub_date date NOT NULL, 
    isbn_10 numeric, 
    isnb_13 numeric,  
    PRIMARY KEY ("id") 
); 
 
INSERT INTO books VALUES(0,'book','author','2021-05-17',1234567890,112234567890);

