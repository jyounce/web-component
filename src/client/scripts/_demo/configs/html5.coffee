angular.module('demo').config ['$locationProvider', ($locationProvider) ->
	$locationProvider.html5Mode
		enabled: true
		requireBase: false
]