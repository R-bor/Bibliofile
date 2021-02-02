//Express Server Setup
const express = require('express'); 
const app = express();  

app.use(express.json()); 

//server listener
app.listen(5000, () => console.log('Server Started...'));   

/*******************
 *      ROUTES     *
 *******************/  

//Login
app.use('/login',require('./routes/login')); 

//Register 
app.use('/register',require('./routes/register')); 

//Verify Token


//Dashboard  
//app.use('/dashboard', require('./routes/dashboard'));


