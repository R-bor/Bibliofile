const express = require('express');
const router = express.Router();
const db = require("../controllers/databaseController");
const jwtGen = require("../controllers/jwtController");
const bcrypt = require('bcryptjs');
const Query = require("../controllers/QueryController");
const Auth = require("../controllers/dataValidationController"); 

router.post('/', async (req, res) => {
   
    //console.log(req.body);
    let { username, password } = req.body;  

    db.authenticate()
        .then(() => console.log('Database Connected...'))
        .catch(err => console.log('Error:' + err));

    //Verify login data valid
    const { error } = Auth.loginValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Verify username exists 
    const user = await Query.getUser(username);
    if (!user) return res.status(400).send("Email or Username does not exist");

    //Verify correct password 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Invalid Password");
    
    //Generate JWT Tokens
    const accessToken =  jwtGen.signJWT({user: user.username, email: user.email},"5m");
    const refreshToken = jwtGen.signRefreshToken({user: user.username, email: user.email},"7d"); 
    
    //Store Refresh Token in DB
    user.refreshtoken = refreshToken;
    await user.save();
    //console.log(refreshToken); 
    //console.log(accessToken);

    //Send Access token to be stored client side in localstorage
    res.header('Authoirization','Bearer ' + accessToken).status(200).send('OK');
});

module.exports = router;