// index.js
// where your node app starts

// init project

var express = require('express');
var app = express ();
const dotenv = require('dotenv')
const browser = require('browser-detect')


dotenv.config({path: './config/config.env'})
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/whoiam', (req, res) => {
  const ipaddress = req.socket.remoteAddress
  const lang = req.acceptsLanguages('fr','es', 'en')
  const result = browser(req.headers['user-agent'])


  if (ipaddress && lang && browser) {
    res.json({ip: ipaddress, language: lang, software: result})
  } else {
    // res.json({ip: ipaddress, language: 'en' })
  }
})



// listen for requests :)
const PORT = process.env.PORT || 2000

app.listen(PORT, () => console.log(`server is running in development mode on port ${PORT} `))