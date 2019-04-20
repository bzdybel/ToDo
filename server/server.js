// All external dependencies should be declared on top of the file
// for the sake of readability
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = express();
const PORT = 3006;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('front-end'));

// mongodb url structure: <protocol name>://<host>:<port>/<database name>
const url = 'mongodb://localhost:27017/todo';

const db = mongoose.connect(url, { useNewUrlParser: true });

// Following schema is also correct, but makes all the fields nullable:
// const taskSchema = new mongoose.Schema({
//   content: String,
//   deadline: Date,
//   status: String,
// });

// This one makes all fields required and sets default value
const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        //enum means that a string value needs to be from statuses array
        enum: ['NEW', 'DONE', 'DELETED'],
        required: true,
        // but when you create a new task, status is always "NEW"
        // no need to send status in axios/httpie request anymore after setting default value here
        default: 'NEW',
    },
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end', 'index.html'));
});

app.post('/task', (req, res) => {
    // a task object created from data sent in axios/httpie request body
    // ready to be inserted to db
    const task = new Task({
        content: req.body.content,
        deadline: req.body.deadline,
    });


    return (
        task
            .save()
            // if validation passes, newly inserted task will be available
            // in `createdTask` variable
            .then(createdTask => {

                // HTTP status code 201 means Created
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
                // we also need to return the task we created
                // so it can be e.g displayed in the list
                res.status(201).send(createdTask);
            })
            // an error object containing all the validation/db connection messages
            .catch(error => {
                console.log(error);
                // HTTP status code 400 means Bad Requst
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
                // apart from that, we send errors object back
                res.status(400).send(error.errors);
            })
    );
});

// ignoring req.body, we just want to GET all tasks
app.get('/tasks', (req, res) =>
    // `tasks` can be either empty array - [] or array of tasks
    // empty array is not an error in this case,
    // it represents a proper state of db - no items
    // HTTP status code 200 generally means OK - an indicator of success
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
    Task.find()
        .then(tasks => res.status(200).send(tasks))
        .catch(error => {
            console.log(error);
            res.send(error.errors);
        })
);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
