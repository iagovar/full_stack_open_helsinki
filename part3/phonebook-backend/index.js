const express = require('express');
const { requestLogger, unknownEndpoint } = require('./someMiddleware');
const morgan = require('morgan');

const app = express();
const PORT = 3001;


let personsArray = require('./tlfs.json');

morgan.token('jsonContent', function (req, res) { return JSON.stringify(req.body) })

// We have to use this middleware as the request.body comes as a stream in the request, this middleware saves us the work of reading, storing and interpreting the stream.
app.use(express.json());
//app.use(requestLogger);
//app.use(unknownEndpoint);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonContent'));


app.get('/', (request, response) => {
    response.send('<div>Something</div>')
})

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<div>Phonebook has info for ${personsArray.length} people</div><br><br><div>${date}</div>`)
})
  
app.get('/api/persons', (request, response) => {
response.json(personsArray)
})

app.get('/api/persons/:id', (request, response) => {
    
    const person = personsArray.find(element => element.id === Number(request.params.id));

    if (person === undefined) {
        return response.status(404).end();
    }

    response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
    personsArray = personsArray.filter(element => element.id !== Number(request.params.id));
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const person = request.body;
    const personId = personsArray.length + 1;
    person.id = personId;

    if (!person.name || !person.number) {
        response.status(400).json({
            error: 'You must provide Name AND Number'
        })
    }

    if (personsArray.some(element => element.name === person.name)) {
        response.status(400).json({
            error: 'Name already exists, please use a different name'
        })
    }

    personsArray = personsArray.concat(person);
    response.json(person);
})

app.post('/api/test', (request, response) => {
    // Using express.json() middleware
    console.log(request.body);
    response.json(request.body);
})





app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

