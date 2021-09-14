const Sequelize = require('sequelize'); 
const db = require('../utils/database');  
const Book = require('./Book'); 
const User = require('./User');

const Shelf = db.define('bookshelves', 
{ 
    id:{ 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    }, 
    username: Sequelize.STRING, 
    title: Sequelize.STRING, 
}, 
{ 
    timestamps:false 
});  

Shelf.hasMany(Book); 
//Shelf.hasMany(User); 

module.exports = Shelf;




/* CREATE TABLE IF NOT EXISTS bookshelves
( 
    "id" serial NOT NULL,
    username text NOT NULL,
    title text NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES users(username),
    CONSTRAINT fk_books FOREIGN KEY (title) REFERENCES books(title)
);  */