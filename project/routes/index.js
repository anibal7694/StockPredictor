var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var dataFetch = require('../config/dataFetch');


var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var errorMessages = req.flash('error');
  var successMessage = req.flash('success');
  
  res.render('index',{csrfToken:req.csrfToken(), errorMessages: errorMessages, hasErrors: errorMessages.length>0,
    successMessage : successMessage, hasSuccess : successMessage.length>0
  });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash :true,
  successFlash:true
}));

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/loading',
  failureRedirect: '/',
  failureFlash :true,
}));



router.get('/loading', function(req,res,next){
  res.render('loading');  
})



router.get('/mainPage', function(req,res,next){
  
      res.render('mainPage');
    
  
})

router.get('/currData', function(req,res,next){
  
      res.render('mainPage' );
    
})

router.get('/index', function(req,res,next){
  //console.log();
  
  res.render('/');
})

router.get('/stockdetails', function(req,res,next){
  //console.log();
  
  res.render('stockdetails');
})

router.get('/profile', function(req,res,next){
  //console.log();
  
  res.render('profile');
})

/*router.post('/signin', function(req,res,next){
  res.render('mainPage');
});*/

module.exports = router;
