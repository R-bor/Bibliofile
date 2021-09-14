const db = require("../utils/database"); 
const User = require('../models/User');  
const { Op, Model } = require("sequelize"); 
const Shelf = require("../models/Bookshelf");
const Book = require("../models/Book");


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

/* function getUserBookshelf(user) 
{ 
    result = Shelf.findAll({ 
        where: {username:user}, 
        include: [{ 
            model: Book, 
            required: true
        }]
    }) 
    return result;
}  */


module.exports = {getUser,/*getUserBookshelf*/};