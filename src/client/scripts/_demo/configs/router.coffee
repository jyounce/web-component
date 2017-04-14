angular.module('demo').config ['$routeProvider', ($routeProvider) ->
	$routeProvider
		.when '/demo',
			templateUrl: '/views/_demo/mains/fretboard.html'

		.when '/demo/staff',
			templateUrl: '/views/_demo/mains/staff.html'

		.otherwise
			redirectTo: '/_demo'
]
