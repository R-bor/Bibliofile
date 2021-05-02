const Sequelize = require('sequelize'); 
const db = require('../utils/database'); 

const User = db.define('account',{
    id:{ 
        type: Sequelize.INTEGER,  
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