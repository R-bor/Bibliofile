const express = require('express'); 
const router = express.Router();  
const db = require("../utils/database");
const bcrypt = require('bcryptjs'); 
const saltRounds = 10;


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
        var result = await db.query('SELECT * FROM accounts WHERE username = $1', [username]);

        if(result.rowCount>0) 
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
            res.send('Pass'); 
            //Hash Password 
            bcrypt.genSalt(saltRounds, function (err, salt)  
            { 
                bcrypt.hash(password, salt, function (err, hash)  
                { 
                    // Store in Database
                    db.query('INSERT INTO accounts (username, password, email) VALUES($1,$2,$3)', [username, hash, email], (err, results) => 
                    {
                        if (err) 
                        {
                           throw err;
                        }
                    });
                }); 
            });
        } 
    }
    catch (err) 
    {
        console.log(err);
    }
}); 

module.exports = router;