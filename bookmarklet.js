javascript:(function () {
/*
Go to: https://us-mg4.mail.yahoo.com/neo/launch?action=contacts
Run bookmarklet
*/

function toArray(list) {
	return Array.prototype.slice.call(list);
}

var frame = toArray(document.querySelectorAll('iframe')).filter(function (item) {
	return item.src.indexOf('/yab-fe/mu/MainView') > -1;
})[0];

var emails = toArray(frame.contentWindow.document.querySelectorAll(
	'.subj.contact-detail'
)).map(function (item) {
	return {
		name: item.previousElementSibling.innerText,
		email: item.innerText
	};
}).filter(function (item) {
	return item.email;
}).map(function (item) {
	return item.name + ', ' + item.email;
}).join('\n');

window.open(
	'about:blank',
	'_blank',
	'width=500,height=520,resizable=1'
).document.write(
	'<style>body { font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif } </style>' + 
	'<h3>Copy the text below and paste it back in amfbfind.xyz</h3>' + 
	'<textarea id=\'emails\' style=\'position:absolute; left: 1%; width: 98%;' + 
		'top: 35px; bottom: 5px; font-family: monospace;font-size: 12px;\'>' +
		emails + '</textarea>' + 
	'<script>' + 
		'var emails = document.querySelector(\'textarea\');' + 
		'emails.setSelectionRange(0, emails.value.length)' + 
	'</script>'
);

console.log(emails);
}());