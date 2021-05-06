const express = require('express'); 
const router = express.Router();  
const db = require("../utils/database");
const bcrypt = require('bcryptjs'); 
const saltRounds = 10; 
const User = require('../models/User');   



router.post('/', async (req, res) => {
    try {
        let { username, password, password2, email } = req.body;
        let errorMessage = [];

        console.log({
            username,
            password,
            password2,
            email
        });

        //Check for all form fields
        if (!username || !password || !password2 || !email) {
            errorMessage.push({ message: "Please fill out all required fields" });
        }
        //Check for matching passwords
        if (password != password2) {
            errorMessage.push({ message: "Passwords do not match" });
        }
        //Check minimum password length 
        if (password.length < 8) {
            errorMessage.push({ message: "Password must be a minimum of 8 characters" });
        }  

        //Check Unique Username
        result = await User.findAll({ 
            where: 
            { 
                username: username
            }
        }); 

        if(result.length>0) 
        { 
            errorMessage.push({message:"Username already in use"}); 
        } 
        
        //Send back errors 
        console.log(errorMessage.length);
        if(errorMessage.length>0) 
        { 
            res.json(errorMessage); 
        } 
        //if no errors, Add New user 
        else 
        { 
            //Hash Password 
            bcrypt.genSalt(saltRounds, function (err, salt)  
            { 
                bcrypt.hash(password, salt, function (err, hash)  
                { 
                    // Store in Database 

                    newAccount = User.create({ 
                        username: username, 
                        password: hash, 
                        email: email
                    })
                }); 
            });
        } 
    }
    catch (err) 
    {
        console.log(err);
    } 
    res.send('User Created');
}); 

module.exports = router;