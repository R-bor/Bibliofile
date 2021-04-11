const express = require('express'); 
const router = express.Router();   
const authorization = require("../utils/jwtAuth"); 
const db = require("../utils/database"); 

//Token Verification
router.get('/', authorization, async (req, res)=> 
{ 
    try
    { 
        res.json(true);
    } 
    catch(err) 
    { 
        res.status(500).send("Server Error");
    }

});
module.exports = router;
