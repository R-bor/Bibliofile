//Express Server Setup
const express = require('express');  
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express(); 

app.use(express.json()); 
app.use(cookieParser()); 
app.use(express.urlencoded({extended: true})); 

//CORS Setup
app.use(cors({ 
  credentials: true, 
  origin: "http://localhost:3000",
}));  


//server listener
app.listen(5000, () => console.log('Server Started on port 5000')); 


/*******************
 *      ROUTES     *
 *******************/    
//Login
app.use('/login',require('./routes/login'));  

//Register 
app.use('/register',require('./routes/register')); 

//Dashboard  
app.use('/dashboard', require('./routes/dashboard'));


