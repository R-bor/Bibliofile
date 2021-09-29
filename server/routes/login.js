const express = require('express');
const router = express.Router();
const db = require("../utils/database");
const jwtGen = require("../utils/jwtGen");
const bcrypt = require('bcryptjs');
const Query = require("../utils/queries");
const Auth = require("../utils/authenticate");

router.post('/', async (req, res) => {
   
    console.log(req.body);
    let { emailOrUsername, password } = req.body; 

    db.authenticate()
        .then(() => console.log('Database Connected...'))
        .catch(err => console.log('Error:' + err));

    //Verify login data valid
    const { error } = Auth.loginValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //Verify username exists 
    const user = await Query.getUser(emailOrUsername);
    if (!user) return res.status(400).send("Email or Username does not exist");

    //Verify correct password 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Password incorrect");

    //Generate JWT Token and add to Authroization field
    const token = jwtGen(user.username);
   // res.header('Access-Control-Allow-Origin','*'); 
   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    //res.json({token});{{
    res.header('Authorization','Bearer ' + token).json({'Message':'OK'}).status(200);
    //console.log(token);
});

module.exports = router;