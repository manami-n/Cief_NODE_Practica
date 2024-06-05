//import modules (express and 
const express = require('express');
const path = require('path');
//import router.js file
const router = require('./router.js');

//create app
const app = express();

//set the port
const port = process.env.PORT || 3000;
//define ejs as engine
app.set('view engine', 'ejs');
//json configure
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
//define static folder path
app.use(express.static(path.join('public')));

//use router (after defining static folder)
app.use(router);

//server to listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})