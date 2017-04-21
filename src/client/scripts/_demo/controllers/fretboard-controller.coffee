angular.module('demo').controller 'fretboardController', ['$scope', '$element',
	($scope, $element) ->
		# properties
		# ==========
		$scope.flip   = false
		$scope.rotate = undefined
		$scope.note   = undefined # {}
		$scope.notes  = undefined # [{}]

		# fretboard
		# =========
		fretboard = $element[0].querySelector 'chordc-fretboard'

		# events
		# ======
		fretboard.addEventListener 'active-note-changed', (e) ->
			# console.log e.detail
			$scope.note = e.detail.value
			$scope.$apply()

		# fretboard.addEventListener 'active-notes-changed', (e) ->
			# console.log e.detail.value
			# console.log fretboard.activeNotes
			# console.log e.detail.value.indexSplices
			# $scope.notes = fretboard.activeNotes
			# $scope.$apply()

		# custom event example
		# fretboard.addEventListener 'note-selected', (e) ->
		# 	$scope.note = e.detail.note
		# 	$scope.$apply()

		# fretboard.addEventListener 'fretboard-changed', (e) ->
			# console.log e.detail.value
			# $scope.fretboard = e.detail.value
			# $scope.$apply()

]