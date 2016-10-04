var APIKeys = require('./config.js');
var request = require('request');
var rp = require('request-promise');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');
var fs = require('fs')
var axios = require('axios')

var app = express();  
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ 
  secret: 'keyboard squirrel',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.get('/',function(req,res){
  //console.log(fs.readdirSync(__dirname).indexOf('fbkeys.js') );
  if(fs.readdirSync(__dirname).indexOf('fbkeys.js') !== -1){
    global.login.loadURL('file://'+ __dirname+'/index.html');
    res.end()
  } else {
    res.sendFile(__dirname + '/test.html')
  }
})

app.listen('4030', function() {
  console.log('first server on port 4030!');
});