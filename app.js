const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();


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

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us21.api.mailchimp.com/3.0/lists/d41d7d529d';
  const apiKey = process.env.API_KEY;
  
  const options = {
    method: 'POST',
    auth: `flash:${apiKey}`
  }

  const request = https.request(url, options, (response) => {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    response.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post('/failure', (req, res) => {
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});