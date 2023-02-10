const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  console.log(req.body);
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  console.log(email);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});