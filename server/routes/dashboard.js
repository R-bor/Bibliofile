const express = require('express'); 
const router = express.Router();   
const Query = require('../controllers/QueryController');
const jwtController = require('../controllers/jwtController');

router.get('/', jwtController.verifyToken, async (req,res) => 
{ 
    //Grab User Bookshelf 
    const bookshelf = await Query.getUserBookshelf(req.user);
    console.log(bookshelf);
    res.send(bookshelf);
 
    console.log("made it");
});   

module.exports = router;