const express = require('express')
const app = express()
const PORT = 3006

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/node-demo', { useNewUrlParser: true })

const taskSchema = new mongoose.Schema({
	taskContent: String,
	taskDeadline: Date,
})

const Task = mongoose.model('Task', taskSchema)

app.use(express.static('front-end'))
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../front-end', 'index.html'))
})

axios
	.post('/addname', {
		taskContent: taskName,
		taskDeadline: taskDeadline,
	})
	.then(function(response) {
		console.log(response)
	})
	.catch(function(error) {
		console.log(error)
	})

app.post('/addname', (req, res) => {
	const myData = new Task(req.body)
	myData
		.save()
		.then(item => {
			res.send('item saved to database')
		})
		.catch(err => {
			res.status(400).send('unable to save to database')
		})
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`))
