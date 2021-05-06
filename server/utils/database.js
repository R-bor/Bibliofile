require("dotenv").config();   

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({ 
    host: process.env.PGHOST, 
    dialect: 'postgres', 
    username: process.env.PGUSER, 
    password: process.env.PGPASSWORD, 
    database: process.env.PGDATABASE, 
    port: process.env.PGPORT
});

module.exports = sequelize;