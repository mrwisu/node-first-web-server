'use strict';
const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use((req, res) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Under construction',
    welcomeText: 'Comming back soon...'
  });
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText: 'Welcome on Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  });
});

const PORT = 3000;
app.listen(PORT);
console.log(`The server is up on port ${PORT}`);
