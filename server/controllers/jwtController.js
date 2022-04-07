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

    //console.log(req.cookies);
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
        return res.status(403).json("Not Authorized");
    try {
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); 
        console.log(payload);
        //Access Token Verified
        req.user = payload.user;
        console.log('success');
        next(); 
    }
      
    catch (err) {
        
        const decoded = jwt.decode(accessToken); 
        console.log(decoded);
        const result = await Query.getUserRefreshToken(decoded.user);
        console.log(result.refreshtoken); 
        try{ 
            const payload = jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET); 
            accessToken = jwt.signJWT({user: payload.user, email: payload.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5m'}); 
            res.user = payload.user; 
            res.cookie('accessToken',accessToken,{ 
                httpOnly: true,
            }) 
            next();
        }
        catch(err)
            { 
                res.status(400).send('Invalid Refresh Token'); 
            }
        
    }
}
module.exports = {signJWT, signRefreshToken, verifyToken}