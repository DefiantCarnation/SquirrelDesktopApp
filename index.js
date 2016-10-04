var electron = require('electron');
var fs = require('fs');
var files = fs.readdirSync(__dirname);
var authserver = require('./authserver.js');
var firstserver = require('./firstserver.js');
console.log(files.indexOf('fbkeys.js'));

if (files.indexOf('fbkeys.js') !== -1) {
  var listener = require('./src/listener.js');
  var fetch = require('./src/fetch.js');
  fetch.call();
}

var BrowserWindow = electron.BrowserWindow;

var app = electron.app;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function(){
   global.login= new BrowserWindow({
    width: 1360, 
    title:'Your stash',
    height: 800, 
    "node-integration": "iframe", // and this line
    "web-preferences": {
      "web-security": false
      }
    });

  global.login.loadURL(`http://localhost:4030`);
});



