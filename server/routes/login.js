const express = require('express'); 
const router = express.Router();   
const db = require("../utils/database");  
const jwtGen = require("../utils/jwtGen");  
const bcrypt = require('bcryptjs');
const User = require('../models/User');  

router.post('/',async (req,res) => 
{ 
    let errorMessages = [];
    db.authenticate() 
    .then(()=> console.log('Database Connected...')) 
    .catch(err=>console.log('Error:'+err)) 

    let {email, password} = req.body;  

    if(!email) 
    { 
        errorMessages.push('No email provided');  
    } 

    if(!password) 
    { 
        errorMessages.push('No password provided'); 
    } 

    if(errorMessages.length>0) 
    { 
        res.json({errors:errorMessages}); 
        return; 
    } 

    const users = await User.findAll({ 
        where: 
        { 
            email: email
        }
    }); 

    const hashedPassword = await bcrypt.compare(password, users[0].password); 
    if(!hashedPassword) 
    { 
        return res.status(401).json("Email or password is incorrect"); 
    }   
    const token = jwtGen(users[0].username);
    res.json({token});
});  

module.exports = router;