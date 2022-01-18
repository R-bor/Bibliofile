const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

module.exports = (req,res,next) => 
{ 
    
    //console.log(req.headers['authorization']); 
    const jwtToken = req.headers['authorization'];
    if(!jwtToken) return res.status(403).json("Not Authorized");
    try 
    { 
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET); 
        req.user = payload.user; 
        console.log('success');
        next();
    }
    catch(err) 
    { 
        res.status(400).send('Invalid Token');
    }  
}

  