const Sequelize = require('sequelize'); 
const db = require('../utils/database'); 

const User = db.define('users',{
    id:{ 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    }, 
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,  
}, 
{ 
    timestamps:false 
}); 

module.exports = User;