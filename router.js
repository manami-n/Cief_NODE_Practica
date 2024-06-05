//import modules
const express = require('express');
const path = require('path');
const mysql = require('mysql');
//start router
const router = express.Router();

//configuration from .env file
const configConnection = {
    host: process.env.HOST,
    port: process.env.MYPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};
//mysql connection
const connection = mysql.createConnection(configConnection);


//================ ROUTER =================

//---DINAMIC NAV BAR---
let nav = []; // making empty container
const selectNav = "SELECT departamento FROM team GROUP BY departamento" // def query
connection.query(selectNav, (err, result) => { // query to mysql
    if (err) throw err; // error handling
    nav = result; // save result to depas
});

//---ROUTER FOR HOME---
router.get('/', (req, res) => { // route "/"
    const selectAll = "SELECT * FROM team ORDER BY departamento ASC"; // def query
    connection.query(selectAll, (err, result) => { // query to mysql
        if (err) throw err; // error handling
        res.render('index', { // show index
            team: result,
            nav
        });
    });
})
//---ROUTER FOR DEPARTAMENTO---
router.get('/departamento/:depa', (req,res) =>{
    const depa = req.params.depa;
    const selectDepa = `SELECT * FROM team WHERE departamento = '${depa}'`; // def query
    connection.query(selectDepa, (err, result) => { // query to mysql
        if (err) throw err; // error handling

        // if depa does not exist
        if (result.length === 0) { 
            // show error page
            res.render("error", {nav});
        }
        // if depa exists
        res.render('index', { //show index
            team: result,
            nav
        });
    });
})

//---ROUTER FOR TEAM---
router.get('/team/:ape', (req,res) =>{
    const ape = req.params.ape;
    const selectTeam = `SELECT * FROM team WHERE apellido = '${ape}'`; // def query
    connection.query(selectTeam, (err, result) => { //query to mysql
        if (err) throw err; // error handling

        // if team does not exist
        if (result.length === 0) {
            // show error page
            res.render("error", {nav});
        }
        // if team exists
        res.render('index', { // show index
            team: result,
            nav
        });
    });
})

//---ROUTER FOR ERROR 404---
router.use((req,res) => {
    res.status(404).render("error", {nav}); // show error.ejs
});

//export router
module.exports = router;