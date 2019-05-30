import bodyParser from 'body-parser';
import Routes from './routes';
import path from 'path';

// load the things we need
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * VIEW ENGINE
 */
// set the view engine to ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/**
 * ROUTES
 */
// serve static files
app.use(express.static(path.join(__dirname, "static")));
// set routes
app.use('/', Routes);

app.listen(8080);
console.log('8080 is the magic port');