angular.module('demo').controller 'fretboardController', ['$scope', '$element',
	($scope, $element) ->
		# properties
		# ==========
		$scope.flip   = false
		$scope.rotate = undefined
		$scope.note   = undefined

		# fretboard
		# =========
		fretboard = $element[0].querySelector 'chordc-fretboard'

		# events
		# ======
		fretboard.addEventListener 'note-selected', (e) ->
			$scope.note = e.detail.note
			$scope.$apply()

		# fretboard.addEventListener 'fretboard-changed', (e) ->
			# console.log e.detail.value
			# $scope.fretboard = e.detail.value
			# $scope.$apply()

		# fretboard.addEventListener 'rotate-changed', (e) ->
		# 	$scope.rotate = e.detail.value
		# 	$scope.$apply()

		# testing
		# =======
		# console.log fretboard.model

]