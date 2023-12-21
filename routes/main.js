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

}
