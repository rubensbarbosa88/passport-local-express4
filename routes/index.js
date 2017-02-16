var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

// HOME PAGE
//get 
router.get('/', function(req, res) {
  res.render('index', { title: 'Home', user: req.user });
});

// REGISTER PAGE
//get
router.get('/register', function(req, res){
	res.render('register' , { });
});
//post
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

//LOGIN PAGE
//get
router.get('/login' , function(req, res){
	res.render('login', {user: req.user});
});
//post
router.post('/login', passport.authenticate('local'), function(req, res){
	res.redirect('/');
});

//LOGOUT
//get
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

//****
router.get('/ping', function(req, res){
	res.status(200).send("pong!");
});



module.exports = router;
