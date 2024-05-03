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

            const username = req.session.userId
           let sqlquery = "INSERT INTO groupfinder (name,description,requirements,lookingfor,timeframe,startdate,group_size,username) VALUES (?,?,?,?,?,?,?,?)";
           // execute sql query
           //req.sanitize and body is fine for decription and requirements but not username or somet5hing that is being added.
           let newrecord = [req.sanitize(req.body.name), req.sanitize(req.body.description),req.sanitize(req.body.requirements), req.sanitize(req.body.lookingfor),req.sanitize(req.body.timeframe),req.sanitize(req.body.startdate),req.sanitize(req.body.group_size),  username];
           db.query(sqlquery, newrecord, (err, result) => {
             if (err) {
               return console.error(err.message);
             }
             else
             res.send(' <a href=' + './' + '>Home</a> This is added to posts Thanks for the post: '+ req.sanitize(req.body.name) + 'description:' + req.sanitize(req.body.description) + 'requirements:' + req.sanitize(req.body.requirements) + 'looking for:' + req.sanitize(req.body.lookingfor) + 'time frame in weeks:' + req.sanitize(req.body.timeframe) + ' start date in weeks'+ req.sanitize(req.body.startdate));
             });
       });    

       app.get('/listposts',redirectLogin, function(req, res) {
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
app.get('/search-result', [check('keyword').isLength({ min: 1 })], function(req, res) {
  const searchKeyword = req.query.keyword;  // Assuming keyword is passed as a query parameter
  if (!searchKeyword) {
      res.status(400).send("Keyword is required.");
      return;
  }

  let query = 'SELECT * FROM groupfinder WHERE lookingfor LIKE ?';// Ensure correct column name 'lookingfor'
  const keysearch = `%${searchKeyword}%`;  // Correct usage of template literals

  console.log("Final SQL Query:", query);
  console.log("Using search keyword: ", keysearch);

  db.query(query, [keysearch], (err, availableItems) => {
      if (err) {
          console.error('Error executing the search query:', err);
          res.status(500).send('Internal Server Error');
          return;
      }
      let newData = Object.assign({}, SiteData, { availableItems: availableItems });
      console.log("Query results: ", newData);
      res.render("searchresults.ejs", newData);
  });
});
//delete user
app.get('/removeuser', redirectLogin, function (req, res) {
  res.render('removeuser.ejs', SiteData);
});
// app.post('/removeuser', redirectLogin, function (req, res) {
//   const userremoval = req.sanitize(req.body.username);

//   // Perform the deletion in the database only works with username need to find a way to make it work with pasword.
//   const deleteQuery = "DELETE FROM userinfo WHERE username = ?";
//   db.query(deleteQuery, [userremoval], (err, result) => {
//       if (err) {
//           console.log('Error did not remove user:', err);
//           res.status(500).send('Internal Server Error');
//       } else {
//           console.log('Result:', result);

//           if (result.affectedRows > 0) {
//               console.log('Removed the user succesfully');
//               res.send('The user corresponding to the username give has been successfully removed. <a href=' + './' + '>Home</a>');
//           } else {
//               console.log('User not found');
//               res.send('Please try a different username this user was not found. Check capitilization and any other variables before trying again or check the listusers page. <a href=' + './' + '>Home</a>');
//           }
//       }
//   });
// });

//updated user removal system

app.post('/removeuser', redirectLogin, function (req, res) {
  const UsernameRemoval = req.sanitize(req.body.username);
  const PasswordCheckRemoval = req.sanitize(req.body.password);

  // Query to find the user's hashed password
  let sqlQuery = "SELECT hashedPassword FROM userinfo WHERE username = ?";
  db.query(sqlQuery, [UsernameRemoval], (err, result) => {
      if (err) {
          console.error('Error with username.', err);
          return res.status(500).send('Internal Server Error');
      }
      if (result.length == 0) {
          return res.send('User not found.');
      }
      
      // Compare provided password with stored hashed password
      let hashedPassword = result[0].hashedPassword;
      const bcrypt = require('bcrypt');
      bcrypt.compare(PasswordCheckRemoval, hashedPassword, function(err, passwordMatch) {
          if (err) {
              console.error('Error with password try again.', err);
              return res.status(500).send('Internal Server Error');
          }
          if (!passwordMatch) {
              return res.send('Password is incorrect try again.');
          }

          // If password matches, proceed to delete user
          const deleteQuery = "DELETE FROM userinfo WHERE username = ?";
          db.query(deleteQuery, [UsernameRemoval], (err, deleteResult) => {
              if (err) {
                  console.error('Error try again.', err);
                  return res.status(500).send('Internal Server Error');
              }
              if (deleteResult.affectedRows > 0) {
                  res.send('User successfully deleted. <a href="./">Home</a>');
              } else {
                  res.send('User deletion failed please try again later thanks. <a href="./">Home</a>');
              }
          });
      });
  });
});

//logout
//logout
app.get('/logout', redirectLogin, (req,res) => {
  req.session.destroy(err => {
  if (err) {
    return res.redirect('./')
  }
  res.send('you are now logged out. <a href='+'./'+'>Home</a>');
  })
})



//test api
const request = require('request');
app.get('/aichatbotapi', function(req, res) {
const options = {
  method: 'POST',
  url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '36671203c3msh275b5c1bca224b5p1c4565jsn99c93937b3da',
    'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
  },
  body: {
    messages: [
      {
        role: 'user',
        content: 'Hello, how is it going?'
      }
    ],
    model: 'gpt-4-turbo-preview',
    max_tokens: 200,
    temperature: 0.9
  },
  json: true
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

});

app.post('/aichatbotapi', function(req, res) {
  // Extract data from the request body
  const { role, content } = req.body;

  const options = {
    method: 'POST',
    url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '36671203c3msh275b5c1bca224b5p1c4565jsn99c93937b3da',
      'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
    },
    body: {
      messages: [
        {
          role: role || 'user',
          content: content || 'Hello, how is it going?'
        }
      ],
      model: 'gpt-4-turbo-preview',
      max_tokens: 200,
      temperature: 0.9
    },
    json: true
  };
  res.render('index', { response: body });
});





}
