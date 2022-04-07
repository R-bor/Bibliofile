const express = require('express');
const router = express.Router();
const db = require("../controllers/databaseController");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const Auth = require('../controllers/dataValidationController');



router.post('/', async (req, res) => {
    try {
        let { username, password, password2, email } = req.body;

        const { error } = Auth.registrationValid(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        //Check Unique Username 

        userExists = await User.findOne({
            where: { username: username }
        });

        if (userExists) {
            return res.status(400).send('Username Already Exists')
        }

        //Hash Password 
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store in Database 
                newAccount = User.create({
                    username: username,
                    password: hash,
                    email: email
                })
            });
        });
    }
    catch (err) {
        console.log(err);
    }

    res.send('User Created');
});

module.exports = router;