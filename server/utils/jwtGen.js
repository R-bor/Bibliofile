const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

function jwt_GenerateToken(username) 
{ 
    const payload = { 
        user: username
    } 

   return jwt.sign(payload,process.env.JWT_SECRET);
} 

module.exports = jwt_GenerateToken;