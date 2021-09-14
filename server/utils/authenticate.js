const Joi = require('joi'); 


//Registration Validation 
const registerSchema = Joi.object ({
    username: Joi.string()
    .min(6)
    .alphanum()  
    .disallow(' ') 
    .required(),  
    email: Joi.string()  
    .email()
    .required(),
    password: Joi.string() 
    .min(8) 
    .required(), 
    repeat_password: Joi.ref('password') 
    
}) 

//Login Validation
const loginSchema = Joi.object({ 
    
    emailOrUsername:Joi.string() 
    .required(), 
    password: Joi.string() 
    .required() 
}) 

const registrationValid = (data) => 
{ 
    return registerSchema.validate(data);

}  

const loginValid = (data)=> 
{ 
    return loginSchema.validate(data);
}

module.exports = {registrationValid, loginValid}