var express = require('express');
var bodyParser = require('body-parser');
var	logger = require('morgan');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


// All configuration which we may do while doing it in app.configure in past 

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(__dirname + '/public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
//db.on('error',console.erorr.bind(console,"Connection erorr...."));
db.once('open',function callback(){
	console.log('multivision db is open');
});

//Mongo Scheme
var messageSchema = mongoose.Schema({
	message : String
});

var Message = mongoose.model('Message',messageSchema);
var mongoMessage;
Message.findOne().exec(function(err,messageDoc){
	console.log(messageDoc);
	mongoMessage = messageDoc.message;

});


// You can call them routes
app.get('/partials/:partialsPath', function(req,res){
	res.render('partials/' + req.params.partialsPath);
});
app.get('*', function(req,res){
	res.render('index',{
		mongoMessage: mongoMessage
	});
});

var port = 3000;

app.listen(port);
console.log('App is listening on ' + port + " .");