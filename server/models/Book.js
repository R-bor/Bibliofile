const Sequelize = require('sequelize'); 
const db = require('../utils/database'); 

const Book = db.define('books',{
    id:{ 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    }, 
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    pub_date: Sequelize.DATE,  
    isbn_10: Sequelize.NUMBER, 
    isbn_13: Sequelize.NUMBER 
}, 
{ 
    timestamps:false 
}); 

module.exports = Book;  