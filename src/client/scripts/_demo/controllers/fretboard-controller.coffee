angular.module('demo').controller 'fretboardController', ['$scope',
	($scope) ->
		$scope.flip   = false
		$scope.rotate = direction: undefined
]