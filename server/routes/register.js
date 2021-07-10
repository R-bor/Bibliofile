const express = require('express'); 
const router = express.Router();  
const db = require("../utils/database");
const bcrypt = require('bcryptjs'); 
const saltRounds = 10; 
const User = require('../models/User');   



router.post('/', async (req, res) => {
    try {
        let { username, password, password2, email } = req.body;
        
        let errorMessages = [];

        console.log({
            username,
            password,
            password2,
            email
        });

        //Check for all form fields
        if (!username) {
            errorMessages.push("Username missing");
        } 
        if(!password)  
        { 
            errorMessages.push("Passoword missing");
        }
        if(!password2)  
        { 
            errorMessages.push("Password confirmation missing")
        }
        if(!email) 
        { 
            errorMessages.push("Email missing");
        }
        //Check for matching passwords
        if (password != password2) {
            errorMessages.push("Passwords do not match" );
        }
        //Check minimum password length 
        if (password.length < 8) {
            errorMessages.push("Password must be a minimum of 8 characters");
        }  

        //Check Unique Username 
        if(username) 
        { 
            result = await User.findAll({ 
                where: 
                { 
                    username: username
                }
            });  
            if(result.length>0) 
            { 
                errorMessages.push({message:"Username already in use"});  
            } 
        } 

        //Send back errors 
        if(errorMessages.length>0) 
        { 
            res.json({errors:errorMessages}); 
            return; 
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