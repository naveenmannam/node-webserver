// Getting the express module
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
var port = 8080;

//Middle Ware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log("Error loggind the details.");
        }
    });
    next();
});

// Enable this while performing the site maintenance.
// app.use((req, res, next) => {
//     res.render("brb", {
//         pageTitle: "Be Right Back"
//     })
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get("/", (req, res) => {
    res.render("home", {
        pageTitle: "Home"
    })
});

app.get("/about", (req, res) => {
    // res.send("About Page");
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get("/contact", (req, res) => {
    // res.send("About Page");
    res.render('contact', {
        pageTitle: 'Contact'
    });
});

app.listen(port, () => {
    console.log("Server started on port" + port);
});
