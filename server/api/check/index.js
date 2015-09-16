'use strict';

var express = require('express');

var router = express.Router();
var request = require('request');

router.get('/', function (req, res) {
	// console.log(req, res);
	console.log('Checking ' + req.query.email);
	request({
		method: 'POST',
		url: 'https://ashley.cynic.al/check',
		form: {
			email: req.query.email
		}
	}, function (err, data) {
		console.log(req.query.email, data.body);
		var json = JSON.parse(data.body);
		json.email = req.query.email;
		res.send(JSON.stringify(json));
		res.end();
	});
	// return res.status(200).json({'as':'asd"'});
});

module.exports = router;