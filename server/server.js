//Express Server Setup
const express = require('express'); 
const app = express();  

app.use(express.json()); 

//server listener
app.listen(5000, () => console.log('Server Started...'));   

//ROUTES//  

//Users API
app.use('/users', require('./routes/userauth'));


