const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

module.exports = (req,res,next) => 
{ 
    const jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(403).json("Not Authorized");
    try 
    { 
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET); 
        req.user = payload; 
        next();
    }
    catch(err) 
    { 
        res.status(400).send('Invalid Token');
    } 
}

  