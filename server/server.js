//Express Server Setup
const express = require('express'); 
const app = express();  
const cors = require('cors');

app.use(express.json());  

//CORS Setup
app.use(cors());  
app.options('*', cors());

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


