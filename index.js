var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')
const mysql = require('mysql');

var session = require ('express-session');

var validator = require ('express-validator');

const expressSanitizer = require('express-sanitizer');

const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }))

// Set up css
app.use(express.static(__dirname + '/public'));
// Create an input sanitizer
app.use(expressSanitizer());


// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
//code added above

// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'appuser',
    password: 'qwerty',
    // idk why password is app2027 i made it qwerty.
    database: 'FinalPrototype'
});
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

// Define our data
var SiteData = {WebsiteName: "Student Zone"}

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  All the routes will go in this file
require("./routes/main")(app, SiteData);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const {NlpManager} = require('node-nlp')
const manager = new NlpManager(({languages: ['en']}))

manager.addDocument('en', 'hello', 'greeting');
manager.addDocument('en', 'hi', 'greeting');
manager.addDocument('en', 'hey you', 'greeting');
manager.addDocument('en', 'yo', 'greeting');
manager.addDocument('en', 'good morning', 'greeting');
manager.addDocument('en', 'good afternoon', 'greeting');
// add answers
manager.addAnswer('en', 'greeting', 'Hey!');
 manager.addAnswer('en', 'greeting', 'Hey there');
  manager.addAnswer('en', 'greeting', 'Hi');
   manager.addAnswer('en', 'greeting', 'Yo whatsup');
// train model
manager.train().then(async() => {
manager.save();
//test response change after en for language to the input so we can see if there is a response and how it rates it as and what the tag is e.g. greeting or future adding stuff like languages/courses/interests
let response = await manager.process('en', 'asdas');
console.log(response)
})