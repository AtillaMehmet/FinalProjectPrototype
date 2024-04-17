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

//coding languages
manager.addDocument('en', 'python', 'python');
manager.addDocument('en', 'java', 'java');
manager.addDocument('en', 'javascript', 'javascript');
manager.addDocument('en', 'c++', 'c++');
manager.addDocument('en', 'ruby', 'ruby');
manager.addDocument('en', 'swift', 'swift');
manager.addDocument('en', 'go', 'go');
manager.addDocument('en', 'php', 'php');
manager.addDocument('en', 'html', 'html');
manager.addDocument('en', 'css', 'css');
manager.addDocument('en', 'sql', 'sql');
manager.addDocument('en', 'typescript', 'typescript');
// add answers
manager.addAnswer('en', 'greeting', 'Hey!');
 manager.addAnswer('en', 'greeting', 'Hey there');
  manager.addAnswer('en', 'greeting', 'Hi');
   manager.addAnswer('en', 'greeting', 'Yo whatsup');


   manager.addAnswer('en', 'python', 'I hear that Sahil is great with python why not check out his profile.');
   manager.addAnswer('en', 'python', 'I hear that Adam is great with python why not check out his profile.');
   manager.addAnswer('en', 'python', 'I hear that Dan is great with python why not check out his profile.');
   manager.addAnswer('en', 'python', 'I hear that Jamie is great with python why not visit his profile.');

manager.addAnswer('en', 'java', 'Java is widely used in applications I think Jake is good with that.');
manager.addAnswer('en', 'java', 'Java is widely used in applications Check the profile of Dan for a real expert.');
manager.addAnswer('en', 'java', 'Java is widely used in applications It is a must and joyce is great with it.');

manager.addAnswer('en', 'javascript', 'I hear that Alex is skilled in JavaScript. Why not check out his profile?');
manager.addAnswer('en', 'javascript', 'JavaScript is powerful! Have you seen Emily\'s work with it?');
manager.addAnswer('en', 'javascript', 'I hear that Liam is great with JavaScript. Why not visit his profile?');
manager.addAnswer('en', 'javascript', 'JavaScript is awesome! Check out Mia\'s profile for some cool projects.');

manager.addAnswer('en', 'c++', 'C++ is known for its performance. Have you seen Ethan\'s work with it?');
manager.addAnswer('en', 'c++', 'I hear that Olivia is a C++ whiz. Why not check out her profile?');
manager.addAnswer('en', 'c++', 'C++ is fascinating! Take a look at Noah\'s profile for some amazing projects.');
manager.addAnswer('en', 'c++', 'C++ is powerful! Have you checked out Ava\'s profile for some inspiration?');

manager.addAnswer('en', 'ruby', 'Ruby makes programming elegant. I hear Sophie is a Ruby expert. Check out her profile!');
manager.addAnswer('en', 'ruby', 'I hear that Mia is great with Ruby. Why not visit her profile?');
manager.addAnswer('en', 'ruby', 'Ruby is fantastic! Have you seen Jack\'s work with it?');
manager.addAnswer('en', 'ruby', 'Ruby is elegant! Check out Liam\'s profile for some amazing Ruby projects.');

manager.addAnswer('en', 'swift', 'I hear that Aiden is great with Swift. Why not check out his profile?');
manager.addAnswer('en', 'swift', 'Swift is Apple\'s language for iOS development. Check out Olivia\'s profile for some cool iOS apps!');
manager.addAnswer('en', 'swift', 'I hear that Isabella is skilled in Swift. Why not visit her profile?');
manager.addAnswer('en', 'swift', 'Swift is awesome! Have you seen Ethan\'s iOS projects?');

manager.addAnswer('en', 'go', 'Go is efficient and easy to use. I hear that Noah is great with it. Check out his profile!');
manager.addAnswer('en', 'go', 'I hear that Mia is proficient in Go. Why not visit her profile?');
manager.addAnswer('en', 'go', 'Go is powerful! Have you seen Ava\'s work with it?');
manager.addAnswer('en', 'go', 'Go is fascinating! Check out Liam\'s profile for some amazing projects.');

manager.addAnswer('en', 'php', 'PHP remains popular for web development. I hear Olivia is a PHP expert. Check out her profile!');
manager.addAnswer('en', 'php', 'I hear that Noah is great with PHP. Why not visit his profile?');
manager.addAnswer('en', 'php', 'PHP is powerful! Have you checked out Mia\'s profile for some inspiration?');
manager.addAnswer('en', 'php', 'PHP is versatile! Check out Ethan\'s profile for some amazing PHP projects.');

manager.addAnswer('en', 'html', 'HTML is the backbone of web pages. I hear that Ava is great with it. Check out her profile!');
manager.addAnswer('en', 'html', 'I hear that Liam is skilled in HTML. Why not visit his profile?');
manager.addAnswer('en', 'html', 'HTML is essential! Have you seen Olivia\'s work with it?');
manager.addAnswer('en', 'html', 'HTML is fascinating! Check out Mia\'s profile for some amazing HTML projects.');

manager.addAnswer('en', 'css', 'CSS brings style to the web. I hear that Noah is great with it. Check out his profile!');
manager.addAnswer('en', 'css', 'I hear that Ava is proficient in CSS. Why not visit her profile?');
manager.addAnswer('en', 'css', 'CSS is powerful! Have you seen Liam\'s work with it?');
manager.addAnswer('en', 'css', 'CSS is fascinating! Check out Olivia\'s profile for some amazing CSS projects.');

manager.addAnswer('en', 'sql', 'SQL is essential for database interactions. I hear that Mia is great with it. Check out her profile!');
manager.addAnswer('en', 'sql', 'I hear that Ethan is skilled in SQL. Why not visit his profile?');
manager.addAnswer('en', 'sql', 'SQL is powerful! Have you seen Olivia\'s work with it?');
manager.addAnswer('en', 'sql', 'SQL is fascinating! Check out Noah\'s profile for some amazing SQL projects.');

manager.addAnswer('en', 'typescript', 'TypeScript adds types to JavaScript. I hear that Ava is great with it. Check out her profile!');
manager.addAnswer('en', 'typescript', 'I hear that Liam is skilled in TypeScript. Why not visit his profile?');
manager.addAnswer('en', 'typescript', 'TypeScript is powerful! Have you seen Mia\'s work with it?');
manager.addAnswer('en', 'typescript', 'TypeScript is fascinating! Check out Ethan\'s profile for some amazing TypeScript projects.');


// Adding prompts related to role queries in web development
manager.addDocument('en', 'front end developer', 'front end developer');
manager.addDocument('en', 'back end developer', 'back end developer');
manager.addDocument('en', 'full stack developer', 'full stack developer');
manager.addDocument('en', 'UI/UX designer', 'UI/UX designer');
manager.addDocument('en', 'web designer', 'web designer');
manager.addDocument('en', 'web developer', 'web developer');

// Adding responses for role queries in web development
manager.addAnswer('en', 'front end developer', 'Front end developers focus on the user interface and user experience.');
manager.addAnswer('en', 'back end developer', 'Back end developers work on server-side logic and databases.');
manager.addAnswer('en', 'full stack developer', 'Full stack developers handle both front end and back end development.');
manager.addAnswer('en', 'UI/UX designer', 'UI/UX designers create visually appealing and intuitive interfaces.');
manager.addAnswer('en', 'web designer', 'Web designers focus on the visual aspects of websites.');
manager.addAnswer('en', 'web developer', 'Web developers build and maintain websites and web applications.');



// train model
manager.train().then(async() => {
manager.save();

app.get('/bot', async() => {
    let response = await manager.process('en', req.query.message);
    console.log(response)
});
//test response change after en for language to the input so we can see if there is a response and how it rates it as and what the tag is e.g. greeting or future adding stuff like languages/courses/interests

})