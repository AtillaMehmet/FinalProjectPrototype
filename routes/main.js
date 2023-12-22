module.exports = function(app, SiteData) {
    //validation checker
    const { check, validationResult } = require('express-validator');
      //allows all routes to access code below
      const redirectLogin = (req, res, next) => {
          if (!req.session.userId ) {
            res.redirect('./login')
          } else { next (); }
      }

      app.get('/',function(req,res){
        res.render('index.ejs', SiteData)
    });


    app.get('/about',function(req,res){
        res.render('about.ejs', SiteData);

    });

    app.get('/addpost', function (req, res) {
        res.render('addpost.ejs', SiteData);
     });
 
     app.post('/postadded', function (req,res) {
           // saving data in database
           let sqlquery = "INSERT INTO groupfinder (name,description,requirements,lookingfor,timeframe,startdate) VALUES (?,?,?,?,?,?)";
           // execute sql query
           let newrecord = [req.sanitize(req.body.name), req.sanitize(req.body.description),req.sanitize(req.body.requirements), req.sanitize(req.body.lookingfor),req.sanitize(req.body.timeframe),req.sanitize(req.body.startdate)];
           db.query(sqlquery, newrecord, (err, result) => {
             if (err) {
               return console.error(err.message);
             }
             else
             res.send(' <a href=' + './' + '>Home</a> This is added to posts Thanks for the post: '+ req.sanitize(req.body.name) + 'description:' + req.sanitize(req.body.description) + 'requirements:' + req.sanitize(req.body.requirements) + 'looking for:' + req.sanitize(req.body.lookingfor) + 'time frame in weeks:' + req.sanitize(req.body.timeframe) + ' start date in weeks'+ req.sanitize(req.body.startdate));
             });
       });    

       app.get('/listposts', function(req, res) {
        let sqlquery = "SELECT * FROM groupfinder"; 
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, SiteData, {AddedPosts:result});
            console.log(newData)
            res.render("listposts.ejs", newData)
         });
    });

    //register below
    app.get('/register', function (req,res) {
        res.render('register.ejs', SiteData);                                                                     
    });                                                                                                 
    app.post('/registered', [check('email').isEmail()],check('password').isLength({ min: 8 }).withMessage('Your password is too short make it at least 8 characters long'), function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          res.redirect('./register'); }
      else { 
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const plainPassword = req.body.password;
    
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.
        let sqlquery = "INSERT INTO userinfo (username, firstname, lastname, email, hashedPassword) VALUES (?,?,?,?,?)";
        // execute sql query
        let newrecord = [req.sanitize(req.body.username), req.sanitize(req.body.first),req.sanitize(req.body.last), req.sanitize(req.body.email),hashedPassword];
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return res.status(500).send('username taken try again.');
          }
          if (result.length > 0) {
            return res.send('User already taken try again');
        }
          else{
          result = 'Hello '+ req.sanitize(req.body.first) + ' '+ req.sanitize(req.body.last) +' you are now registered!  We will send an email to you at ' + req.sanitize(req.body.email);
          res.send(result);
        }
          });
    })
      }
    });

    //login
app.get('/login', function (req,res) {
    res.render('login.ejs', SiteData);
    });

    app.post('/loggedin', function(req, res) {
        let sqlquery = "SELECT hashedPassword FROM userinfo WHERE username = ?"; 
        let username = (req.sanitize(req.body.username));
        db.query(sqlquery, username, (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          else if (result.length == 0) {
            res.send('Invalid username or password');
          }
          else {
            let hashedPassword = result[0].hashedPassword;
            const bcrypt = require('bcrypt');
            bcrypt.compare((req.sanitize(req.body.password)), hashedPassword, function(err, result) {
              if (err) {
                return console.error(err.message);
              }
              else if (result == true) {
                req.session.userId = req.sanitize(req.body.username);
                res.send('You have logged in, ' + (req.sanitize(req.body.username)) + 'Welcome' + '<a href='+'./'+'>Home</a>');
              }
              else {
                res.send('User Details not recognised');
              }
            });
          }
        });
      });
//search
      app.get('/search',function(req,res){
        res.render("search.ejs", SiteData);
    });
    app.get('/search-result', function (req, res) {
        //searching in the database
        const keyword = '%' +  req.query.keyword + '%';

        const query = 'SELECT * FROM groupfinder WHERE description LIKE %';
        // execute sql query
        db.query(query, [keyword, keyword, keyword, keyword, keyword], (err, availableItems) => {
            if (err) {
              console.error('Error executing the search query:', err);
              res.status(500).send('Internal Server Error');
              return; 
            }
            let newData = Object.assign({}, SiteData, {availableItems:availableItems});
            console.log(newData)
            res.render("searchresults.ejs", newData)
         });        
    });
}
