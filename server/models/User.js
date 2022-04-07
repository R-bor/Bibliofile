const Sequelize = require('sequelize'); 
const dbcontroller = require('../controllers/databaseController'); 
const db = require("../controllers/databaseController")
const User = db.define('users',{
    id:{ 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    }, 
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    refreshtoken: Sequelize.STRING,  
}, 
{ 
    timestamps:false
}); 

module.exports = User;