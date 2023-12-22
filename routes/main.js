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
             res.send(' <a href=' + './' + '>Home</a> This post is added to the posts: '+ req.sanitize(req.body.name) + 'description:' + req.sanitize(req.body.description) + 'requirements:' + req.sanitize(req.body.requirements) + 'looking for:' + req.sanitize(req.body.lookingfor) + 'time frame:' + req.sanitize(req.body.timeframe) + ' start date '+ req.sanitize(req.body.startdate));
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
}
