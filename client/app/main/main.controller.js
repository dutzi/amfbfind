/*jshint multistr:true*/
'use strict';

angular.module('amfbfindApp').controller('MainCtrl', function (
	$scope, 
	$http,
	$q
) {
	var lastIndexChecked, numChecking;
	const STATE_IS_WAITING = 'is-waiting';
	const STATE_IS_CHECKING = 'is-checking';
	const STATE_IS_ONLIST = 'is-onlist';
	const STATE_IS_OFFLIST = 'is-offlist';

	$scope.startChecking = function () {

		var contacts = $scope.contactsString.split('\n');

		$scope.contacts = [];

		for (var i = 0; i < contacts.length; i++) {
			var contact = contacts[i].split(',');
			if (contact.length === 2) {
				$scope.contacts[i] = {
					name: contact[0].trim(),
					email: contact[1].trim()
				};
			} else {
				$scope.contacts[i] = {
					email: contact[0].trim()
				};
			}
			$scope.contacts[i].state = STATE_IS_WAITING;
		}

		startQueue();
	};

	$scope.contactsString = '';
	function startQueue() {
		lastIndexChecked = -1;
		numChecking = 0;
		updateQueue();
	}

	function checkEmail(email) {
		var deferred = $q.defer();

		$http({
			method: 'GET', 
			url: '/api/check', 
			params: {
				email: email
			}
		}).then(function (res) {
			deferred.resolve({
				email: res.data.email,
				found: res.data.found
			});
		});

		// $http({
		// 	method: 'POST',
		// 	url: 'https://dutzi.cloudant.com/amdump/_find',
		// 	data: {
		// 		'selector': {
		// 			'_id': {
		// 				'$eq': email
		// 			}
		// 		}
		// 	}
		// }).then(function (res) {
		// 	deferred.resolve({
		// 		email: email,
		// 		found: res.data.docs.length > 0
		// 	});
		// });

		return deferred.promise;
	}

	function gotResult(res) {
		var email = res.email;
		for (var i = 0; i < $scope.contacts.length; i++) {
			if ($scope.contacts[i].email === email) {
				$scope.contacts[i].state = (res.found) ?
					STATE_IS_ONLIST :
					STATE_IS_OFFLIST;

				break;
			}
		}
		numChecking--;
		updateQueue();
	}

	function updateQueue() {
		while (numChecking < 5 && lastIndexChecked < $scope.contacts.length - 1) {
			lastIndexChecked++;
			numChecking++;
			$scope.contacts[lastIndexChecked].state = STATE_IS_CHECKING;
			checkEmail($scope.contacts[lastIndexChecked].email).then(gotResult);
		}
	}
});
