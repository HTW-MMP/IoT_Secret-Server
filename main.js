var mraa = require('mraa');
var express = require('express');
var app = express();
var path = require('path');

// The button on pin 2
var digitalButtonPin = new mraa.Gpio(2);
digitalButtonPin.dir(mraa.DIR_IN);

var buttonIsPressed = 0;

// When website is accessed, show either normal or secret page
app.get('/', function(req, res) {
    if(buttonIsPressed) {
      res.sendFile(path.join(__dirname, '/client/secret.html')); // Send the secret page
    } else {
      res.sendFile(path.join(__dirname, '/client/index.html')); // Send the normal page
    }
});

// Serve static files like the index.css file
app.use(express.static(__dirname + '/client'));

// Start web server
var server = app.listen(3000, function(){
    console.log('Web server listening on port 3000');
    readPin();
});

function readPin() {
  buttonIsPressed = digitalButtonPin.read();
  setTimeout(readPin, 100);
}
