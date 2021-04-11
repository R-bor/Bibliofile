const express = require('express'); 
const router = express.Router();   
const db = require("../utils/database");  
const jwtGen = require("../utils/jwtGen");  
const bcrypt = require('bcryptjs');

router.post('/',async (req,res) => 
{ 
    let {email, password} = req.body;  

    console.log({
                email,
                password
                });
    
    //Query DB for credentials  
    const user = await db.query('SELECT * FROM accounts WHERE email = $1', [email]);  

    if(user.rows.length<1) 
    { 
        return res.status(401).json("Password or Email is incorrect");
    } 

    const hashedPassword = await bcrypt.compare(password,user.rows[0].password); 

    if(!hashedPassword) 
    { 
        return res.status(401).json("Password or Email is incorrect");
    } 

    //Send Session Token 
    const token = jwtGen(user.rows[0].username);
    res.json({token});
}); 

module.exports = router;