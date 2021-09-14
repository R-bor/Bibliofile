const express = require('express'); 
const Book = require('../models/Book');
const router = express.Router();   
const Verify = require("../utils/jwtAuth");   
const Query = require('../utils/queries');

//   

router.get('/', Verify, async (req,res) => 
{ 
  res.send("DASHBOARD ACCESSED");

});   

module.exports = router;



