import bodyParser from 'body-parser';
import Routes from './routes';

// load the things we need
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set routes
app.use('/', Routes);

app.listen(8080);
console.log('8080 is the magic port');