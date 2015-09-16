var ddb = require('dynamodb').ddb({
	accessKeyId: 'AKIAIPANYR2BHGEN3UWQ',
	secretAccessKey: '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'
});

ddb.listTables({}, function(err, res) {
	console.log('Tables');
	res.TableNames.forEach(function (i) { console.log(' * ' + i); });
});

ddb.putItem('amdump', {
	userId: 'dutzi.b2@gmail.com',
	index: 0
}, {}, function(err, res, cap) {
	console.log('Item added');
	console.log(err, res, cap);
});

ddb.scan('amdump', {}, function(err, res) {
    if(err) {
      console.log(err);
    } else {
      console.log(res);
    }
});


console.log('hey');