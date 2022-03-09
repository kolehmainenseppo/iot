const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(express.static('stc'))

app.use(bodyParser.json())

let ac_threshold = 100
let temperature = null
let humidity = null

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/stc/adminpanel.html`)
})

app.get('/api', (req, res) => {
	console.log((new Date), "NOTE", req.query)

	temperature = Number.parseFloat(req.query.temp)
	humidity = Number.parseFloat(req.query.humi)

	console.log(temperature, humidity)

	res.send(String(ac_threshold))
})

app.get('/getdata', (req, res) => {
	console.log((new Date), "NOTE", 'getdata', req.query)

	data = {
	 	temperature: temperature,
		humidity: humidity
	}

	res.header("Content-Type", "application/json")
	res.json(data)
})




app.post('/setthreshold', (req,res) => {
	console.log((new Date), "NOTE", 'setthreshold', req.body)
	
	ac_threshold = req.body.threshold

	res.header("Content-Type", "application/json")
	res.json({status: "ok"})
})


app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})