var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


// All configuration which we may do while doing it in app.configure in past 

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');

app.get('*', function(req,res){
	res.render('index');
});

var port = 3000;

app.listen(port);
console.log('App is listening on ' + port + " .");