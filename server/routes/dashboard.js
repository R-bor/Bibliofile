const express = require('express'); 
const router = express.Router();   
const Verify = require("../utils/jwtAuth");   
const Query = require('../utils/queries'); 
const JWT = require('jsonwebtoken');

router.get('/', Verify, async (req,res) => 
{ 
    //Retrive decoded token  
    //const token = JWT.decode(req.header('Authorization'));
    //console.log(req.user);

    //Grab User Bookshelf 
    const bookshelf = await Query.getUserBookshelf(req.user);
    console.log(bookshelf);
    res.send(bookshelf);

});   

module.exports = router;



