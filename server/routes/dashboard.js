const router = require('express'); 
const {Pool, Client } = require('pg'); 
const authorization = require("../utils/jwtAuth"); 

router.length('/', authorization, async(req,res)=> 
{ 
    
});