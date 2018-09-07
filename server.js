const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs'); //set(key, value)

// see req & res: expressjs.com+APIreference
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials'); //console nodemon name.js -e js,hbs
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	//res.send('<h1>Hello Express, how you doing?</h1>');
	// res.send({
	// 	name: 'Me',
	// 	likes: [
	// 		'Eating',
	// 		'Wind',
	// 		'Food',
	// 		'Beds'
	// 	]
	// })
	res.render('home.hbs', {
		barTitle: '¡Home!',
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome duuddd',
		//currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	//res.send('About page'); //static
	res.render('about.hbs', {
		pageTitle: 'About Page',
		//currentYear: new Date().getFullYear()
	}); 
});

app.get('/bad',(req, res) => {
	res.send({
		errorMessage: 'UPS! Something is wrong',
	});
});

// Localhost
app.listen(3000, () => {
	console.log('Server is up on port 3000');
});