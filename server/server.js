//Express Server Setup
const express = require('express');  
let cookieParser = require('cookie-parser');
const app = express();   
const cors = require('cors');

app.use(express.json());  

//CORS Setup
app.use(cors());  
app.options('*', cors()); 
/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Credentials', true) 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type') 
    next()
  });  */

//COOKIES 
app.use(cookieParser());

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


