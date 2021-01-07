const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

function jwt_GenerateToken(user) 
{ 
    const payload = { 
        username: user
    } 

   return jwt.sign(payload,process.env.JWT_SECRET);
} 

module.exports = jwt_GenerateToken;