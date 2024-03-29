const db = require("./databaseController"); 
const User = require('../models/User');  
const { Op, Model } = require("sequelize"); 
const Book = require("../models/Book"); 
const Shelf = require("../models/Bookshelf");

function getUser(emailOrUsername) 
{ 
    result = User.findOne({  
        where: 
        { 
           [Op.or]: [ 
               {username: emailOrUsername}, 
               {email: emailOrUsername}
           ]
        }
    }); 

    return result;
}

function getUserBookshelf(user) 
{ 
    result = Shelf.findAll({  
        attributes: ['title'],
        where: {username:user},
        include: [{ 
            model: Book,  
            attributes:['author'], 
            required: true
        }]
    }) 
    return result;
} 

function getUserRefreshToken(user) 
{ 
    result = User.findOne({  
        attributes:['refreshtoken'], 
        where: {username:user} 
    }) 
    return result;
}

module.exports = {getUser,getUserBookshelf,getUserRefreshToken}