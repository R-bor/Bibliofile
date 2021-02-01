//Express Server Setup
const express = require('express'); 
const app = express();  

app.use(express.json()); 

//server listener
app.listen(5000, () => console.log('Server Started...'));   

/*******************
 *      ROUTES     *
 *******************/  

//Users API
app.use('/user', require('./routes/userauth'));

//Dashboard  
app.use('/dashboard', require('./routes/dashboard'));


