var express = require('express');
var app = express();
var router = express.Router();

 
router.get('/',function (req, res) {
	res.sendfile('index.html');
});

router.get('/dist/bundle.js',function(req, res)	{
	res.sendfile('./dist/bundle.js');
});




app.use('/',router);

app.use(function(req,res){
	res.send(404);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});