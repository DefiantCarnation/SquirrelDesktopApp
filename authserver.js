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

app.get('/auth/facebook', passport.authenticate('facebook'));

//check to see req session?
app.get('/checkAuth', function(req, res){
  console.log('hello robert', req.user, 'yoloo')
  res.send(req.user);
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3010/#/',
    failureRedirect: 'http://localhost:3010/'
  }));


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
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

app.get('/cache',function(req,res){
  //var id = req.query.id;
  var url = req.query.url;
  var id = require('./fbkeys.js').id;
  // if (url.indexOf('https://')===-1){
  //   url = "https://" + url;
  // }
  // if (url.indexOf('https://www.') === -1){
  //   url = "https://www." + url;
  // }
  console.log('HERE',url);
  res.end();
  axios({
  method: 'put',
  url: `http://localhost:8888/links/${id}`,
  data:{'url':url}
  // params: {
  //   userid: id
  // }
  })
  res.end('Saved');
})

app.get('/login',function(req,res){
  require('dns').resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
     res.end();
  } else {
     console.log("Connected");
  }
});
  res.sendFile(__dirname + '/test.html')
  //res.end();
})

app.get('/stash',function(req,res){
  if(fs.readdirSync(__dirname).indexOf('fbkeys.js') === -1){
    console.log('HERE1')
    fs.writeFileSync('fbkeys.js','module.exports = ' + JSON.stringify(req.query))
    var fetch = require('./src/fetch.js');
    fetch.call();
    global.login.loadURL('file://'+ __dirname+'/index.html')
  }
  var id = require('./fbkeys.js').id
  var queryid = req.query.id;
  console.log('id',id,'queryid',queryid);
  // if(queryid !== id){
  //   console.log('HERE2')
  //   fs.writeFileSync('fbkeys.js','module.exports = ' + JSON.stringify(req.query));
  // }
 console.log('file://'+ __dirname+'/index.html');
 console.log('PARAMS',req.query);
  var fetch = require('./src/fetch.js');
  fetch.call();
  global.login.loadURL('file://'+ __dirname+'/index.html')

  //console.log('LOGIN',global.login.loadURL,'LOGIN');
  //global.login.loadUrl('www.google.com')
  //res.end();
 // res.sendFile(__dirname + '/index.html');
 res.end();
})

app.listen('3030', function() {
  console.log('listening on port 3030!');
});



//options for request-promise http request
var options = function(id, name, avatar){
  return {
    method: 'POST',
    uri: 'http://localhost:8888/login/' + id,
    body: {
        userID: id,
        name: name || undefined,
        avatar: avatar || undefined,
    },
    json: true // Automatically stringifies the body to JSON
  }
}
//profile fields to request from facebook
var FBprofileFields = [
    'id',
    'displayName',
    'first_name',
    'last_name',
    'email',
    'bio',
    'work',
    'education',
    'location',
    'birthday',
    'cover',
    'picture.type(large)',
    'gender',
    'interested_in',
    'link', // FB timeline 
    'website',
    'is_verified'
  ];

//passport configuration
function passportConfig(passport){
  passport.use(new FacebookStrategy({
    clientID: APIKeys.keys.facebook.key,
    clientSecret: APIKeys.keys.facebook.secret,
    callbackURL: 'http://localhost:3010/auth/facebook/callback',
    profileFields: FBprofileFields,
  },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile.photos[0].value, 'what is this thing?');
      var apiFields = options(profile.id, profile.displayName, profile.photos[0].value)

      rp(apiFields) //<===== server-side http request
      .then(function (user) {
          console.log(user, 'IS THIS THE DATA');
          done(null, user);
      })
      .catch(function (err) {
        console.log(err,'could not reach SquirrelDBService');
      });
    }
  ));

  passport.use(new TwitterStrategy({
    consumerKey: APIKeys.keys.twitter.key,
    consumerSecret: APIKeys.keys.twitter.secret,
    callbackURL: 'http://localhost:3010/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile, 'twitter profile?');
    User.findOrCreate({}, function(err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }));

  //user ID is serialized to the session, when a request of the same ID is received it will restore the session
  passport.serializeUser(function(user, done) {
    done(null, user.fbid);
  });
  //used to check if user session is actuallly a verified user in database! 
  passport.deserializeUser(function(id, done) {
    var apiFields = options(id);

    rp(apiFields)
      .then(function(user){
        console.log('passport.deserilizeUser', user);
        done(null, user);
      })
      .catch(function(err){
        console.log('passport.deserilizeUser 2', err);
      })

  });
};