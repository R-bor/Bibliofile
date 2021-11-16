const express = require('express'); 
const router = express.Router();   
const Verify = require("../utils/jwtAuth");   
const Query = require('../utils/queries'); 
const JWT = require('jsonwebtoken');

router.get('/', Verify, async (req,res) => 
{ 
    //Retrive decoded token  
      
    const token = JWT.decode(req.header('Authorization'));

    //Grab User Bookshelf 

    const bookshelf = await Query.getUserBookshelf(token.user); 
    res.send(bookshelf);

});   

module.exports = router;



