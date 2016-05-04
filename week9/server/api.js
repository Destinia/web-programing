const Router = require('express').Router;
const router = new Router();
const UserData = require('./userdata');

router.get('/users', function(req,res){
	res.json(UserData);
	console.log("here");
});

router.get('/users/:username', function(req,res){
	const name = req.params.username;
	res.json(UserData.find(function(usr){return usr.name===name;}));
});


module.exports = router;
