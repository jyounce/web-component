module.exports = (server) ->
	app  = server.app
	path = require 'path'
	cors = require 'cors'
	app.use cors()

	# Data
	# ====
	Fretboard = require './data/fretboard'

	# Routes
	# ======
	app.get '/api/fretboard', (req, res) ->
		res.json Fretboard

	# Demo
	# ====
	app.get '/demo*', (req, res) ->
		demo = path.join server.paths.client, 'views/_demo/spa.html'
		res.sendFile demo

