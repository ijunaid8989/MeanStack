var express = require('express');
var bodyParser = require('body-parser');
var	logger = require('morgan');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


// All configuration which we may do while doing it in app.configure in past 

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(__dirname + '/public'));


app.get('*', function(req,res){
	res.render('index');
});

var port = 3000;

app.listen(port);
console.log('App is listening on ' + port + " .");