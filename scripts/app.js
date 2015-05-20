var app = angular.module('downloadsApp', []);

app.factory('Releases', function($http) {
	return {
		fetch: function() {
			return $http({
				method: 'GET',
				url: 'https://api.github.com/repos/gridclient/dummy/releases',
				headers: {
					Accept: 'application/vnd.github.v3+json'
				}
			});
		}
	}
});

app.controller('downloads', function($scope, $timeout, Releases) {
	$scope.loading = true;
	$scope.failed = false;
	$scope.releases = [];

	$scope.get = function() {
		$scope.loading = true;
		$scope.failed = false;
		$scope.releases = [];

		var request = Releases.fetch();
		request.success(function(response) {
			response.forEach(function(data) {
				var release = {
					name: data.name,
					version: data.tag_name,
					link: data.html_url,
					prerelease: data.prerelease,
					description: data.body
				};

				$scope.releases.push(release);
			});
		});

		request.error(function(why) {
			$scope.failed = true;
			console.log(why);
		});

		console.log($scope.releases);
		$timeout(function() {
			$scope.loading = false;
		}, 1800);
	};

	$scope.get();
});