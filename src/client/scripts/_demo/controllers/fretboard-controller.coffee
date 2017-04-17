angular.module('demo').controller 'fretboardController', ['$scope', '$element',
	($scope, $element) ->
		# properties
		# ==========
		$scope.flip   = false
		$scope.rotate = direction: undefined
		$scope.note   = undefined;

		# fretboard
		# =========
		fretboard = $element[0].querySelector 'chordc-fretboard'

		# events
		# ======
		fretboard.addEventListener 'note-selected', (e) ->
			$scope.note = e.detail.note
			$scope.$apply()

]