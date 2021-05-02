const Sequelize = require('sequelize'); 
const db = require('../utils/database'); 
const { v4: uuidv4 } = require('uuid');

const User = db.define('account',{
    id:{ 
        type: Sequelize.UUID,    
        defaultValue: Sequelize.UUIDV4, 
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
User.beforeCreate(user => user.id = uuidv4());

module.exports = User;