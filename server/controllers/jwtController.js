const jwt = require('jsonwebtoken'); 
const Query = require('./QueryController');
require("dotenv").config(); 

function signJWT(payload,expiresIn) 
{ 
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn});
} 

function signRefreshToken (payload,expiresIn) 
{ 
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn});
} 

async function verifyToken (req, res, next){

    
    const accessToken = req.headers['authorization'].split(' ')[1];
  
    if (!accessToken)
        return res.status(403).json("Not Authorized");
    
        try { 
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); 
        const user = payload.user;
        //console.log(payload);
        //Access Token Verified
        req.user = payload.user;
       // console.log('success');
        next();
    }
    catch (err) {  

        const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET); 
        console.log(decoded.user);
        const userData= await Query.getUserRefreshToken(decoded.user);  
        if(!userData) 
            return res.status(403).json("Not Authorized");  
        console.log(userData.refreshtoken); 
        const refreshtoken = userData.refreshtoken;
        payload = jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET);   
        console.log(payload); 
        user = payload.user; 
        const newAccessToken = signJWT({user: payload.user, email: payload.email},"5m");
        console.log(newAccessToken);
        req.user = payload.user;
        res.header('Authorization', 'Bearer ' + newAccessToken);
        next();
    } 
}
module.exports = {signJWT, signRefreshToken, verifyToken}