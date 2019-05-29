import { Router } from 'express';
const routes = new Router();

// use res.render to load up an ejs view file

// index page 
routes.get('/', function(req, res) {
	res.render('pages/index');
});

// about page 
routes.get('/about', function(req, res) {
	res.render('pages/about');
});

export default routes;