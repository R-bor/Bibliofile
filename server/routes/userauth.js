const express = require('express'); 
const router = express.Router();   
const jwtGen = require("../utils/jwtGen");

//Bcrypt 
const crypt = require('bcryptjs');
const saltRounds = 10;  

//PostgreSQL Connection Setup  
console.log(require('dotenv').config())
const {Pool, Client } = require('pg'); 
const jwt_GenerateToken = require('../utils/jwtGen');

const pool = new Pool({ 
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

//User Registration
router.post('/register', async (req, res) => {
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
        var result = await pool.query('SELECT * FROM accounts WHERE username = $1', [username]);

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
            crypt.genSalt(saltRounds, function (err, salt)  
            { 
                crypt.hash(password, salt, function (err, hash)  
                { 
                    // Store in Database
                    pool.query('INSERT INTO accounts (username, password, email) VALUES($1,$2,$3)', [username, hash, email], (err, results) => 
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

//User Login 
router.post('/login',async (req,res) => 
{ 
    let errorMessage = [];
    let {email, password} = req.body;  

    console.log({
                email,
                password
                });
    
    //Query DB for credentials  
    const user = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);  

    if(user.rows.length<1) 
    { 
        return res.status(401).json("Password or Email is incorrect");
    } 

    
    const hashedPassword = await crypt.compare(password,user.rows[0].password); 

    if(!hashedPassword) 
    { 
        return res.status(401).json("Password or Email is incorrect");
    } 

    
    //Send Session Token 
    
    const token = jwtGen(user.rows[0].username);
    res.json({token});
});

module.exports = router;
