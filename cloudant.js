'use strict';

var cloudant = require('cloudant');
var me = 'dutzi' // Set this to your own account 
var password = 'dkml#KOD04'
 
var cloudant = cloudant({
	account:me, 
	password:password
});
 
// cloudant.db.list(function(err, all_dbs) {
// 	console.log('All my databases: %s', all_dbs.join(', '))
// });

var db = cloudant.db.use('amdump');

// db.insert({}, 'dutzi2@gmail.com', function(err, body, header) {
// 	if (err) {
// 		return console.log('[alice.insert] ', err.message);
// 	}

// 	console.log('you have inserted the rabbit.');
// 	console.log(body);
// });

// cloudant.set_cors({ enable_cors: true, allow_credentials: true, origins: ["*"]}, function(err, data) {
// 	console.log(err, data);
// });

var LineByLineReader = require('line-by-line');

var lr = new LineByLineReader('emails.txt');

lr.on('error', function (err) {
    // 'err' contains error object
});

var i = 0;
var count = 0;
var start = 29300000;
var docs = [];
lr.on('line', function (line) {
	if (!line) { return; }
	else if (line.startsWith('_')) {
		console.log(line + ' starts with "_", passing.');
		return;
	}

	if (i >= start) {
		docs.push({
			_id: line
		});
		count++;
		// console.log(count + ': ' + line);
	}

	i++;

	if (count === 100000) {
		lr.pause();

		var time = new Date();
		console.log('Starting to upload from line #' + (i - count));

		db.bulk({
			docs: docs
		}, function(err, data) {
			if (err) {
				console.log(err);
			} else {
				count = 0;
				docs = [];
				lr.resume();
				console.log('Added another 100,000.');
			}
			console.log('It took', (new Date()).getTime() - time.getTime() + 'ms');
		});
	}
});



function convertFile() {
	var LineByLineReader = require('line-by-line');

	var lr = new LineByLineReader('/Users/dutzi/Downloads/dmps/aminno_member_email.dump');

	lr.on('error', function (err) {
	    // 'err' contains error object
	});

	lr.on('line', function (line) {
	    var re = line.match(/,'(.*)'/);
	    if (re && re.length === 2) {
	    	console.log(re[1]);
	    }
	});

	lr.on('end', function () {
	    // All lines are read, file is closed now.
	});
}