var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
router.get('/',function (req, res) {

	/*require('fs').readFile('index.html',function(err,data){
		if(err) throw err;
		res.set({'Content-Type' : 'text/html'});
		res.send(data);
	});*/
	res.sendfile('index.html');

});


router.get('/api/query', function (req, res) {
	res.json(req.query);
});

router.get('/api/user/1', function (req,res) {
	res.json({id:1,name:"Joe",age:18});
});

router.get('/api/user/2', function (req,res) {
	res.json({id:2,name:"John",age:22});
});

router.post('/api/body', function(req, res) {
  res.send(JSON.stringify(req.body));
});

app.use(express.static(__dirname + '/public'));

app.use('/',router);

app.use(function(req,res){
	res.send(404);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

