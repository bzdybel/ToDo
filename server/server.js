const express = require('express')
const app = express()
const PORT = 3006

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const url = 'mongodb://localhost:27017'
const db = mongoose.connect(url, { useNewUrlParser: true })

const taskSchema = new mongoose.Schema({
	Content: String,
	Deadline: Date,
	status: String,
})

const Task = mongoose.model('Task', taskSchema)

app.use(express.static('front-end'))
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../front-end', 'index.html'))
})

app.post('/addname', (req, res) => {
	const myData = new Task(req.body)
	myData
		.save()
		.then(item => {
			res.send('Task saved to database')
		})
		.catch(err => {
			res.status(400).send('unable to save to database')
		})
})

app.get('/tasks', (req, res) => {
	Task.find({}, (err, data) => {
		res.send(data)
		if (err) {
			res.send('error')
		}
	})
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`))
