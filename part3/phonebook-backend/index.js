const express = require('express');
const { requestLogger, unknownEndpoint } = require('./someMiddleware');
const morgan = require('morgan');
const cors = require('cors');
const mongodb = require('./mongodb.js');

/* ==================================================
                    Setup
===================================================*/

const app = express();

mongodb.connectToMongoDB().then(reply => {
    // Do nothing for now;
})

/* ==================================================
                    Middleware
===================================================*/

app.use(cors());
// We have to use this middleware as the request.body comes as a stream in the request, this middleware saves us the work of reading, storing and interpreting the stream.
app.use(express.json());
//app.use(requestLogger);
//app.use(unknownEndpoint);
morgan.token('jsonContent', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonContent'));

// Will try to match any get request against files in this directory
app.use(express.static('./dist'))



/* ==================================================
                    Routing
===================================================*/


app.get('/info', (request, response) => {

    const date = new Date();

    try {
        mongodb.getNumberOfEntries().then(numberOfEntries => {
            response.send("<div>Phonebook has info for " + numberOfEntries + " people</div><div>" + date + "</div>")
        });
    } catch (error) {
        response.send("<div>An error occurred: " + error + "</div>")
    }
})
  
app.get('/api/persons', (request, response) => {

    mongodb.getAllEntries().then(persons => {

        // Mongo uses _id instead of id property.
        // Instead of rewriting all the frontend code, we will pass the property id = _id to the frontend.
        // This will allow us to update and delete entries in the frontend.

        persons.forEach(person => {
            person.id = person._id
        })

        response.json(persons);
    })
    .catch(error => {
        response.status(400).json({ "error": error });
    });

})

app.get('/api/persons/:id', (request, response) => {

    mongodb.getOneEntry({id: request.params.id})
    .then(person => {

        // Mongo uses _id instead of id property.
        // Instead of rewriting all the frontend code, we will pass the property id = _id to the frontend.
        // This will allow us to update and delete entries in the frontend.

        person.id = person._id

        response.json(person);
    })
    .catch(error => {
        response.status(400).json({ "error": error });
    })

})

app.delete('/api/persons/:id', (request, response) => {

    // Validation
    if (String(request.params.id).length < 1) {
        response.status(400).json({
            error: "ID can't be empty"
        })
        return
    }

    mongodb.deleteOneEntry({id: request.params.id})
    .then(() => {
        response.status(204).end();
    })
    .catch(error => {
        response.status(400).json({ "error": error });
    })

})

app.post('/api/persons', (request, response) => {
    const person = request.body;

    if (!person.name || !person.number) {
        response.status(400).json({
            error: 'You must provide Name AND Number'
        })
    }

    const doesNameExist = mongodb.checkIfNameExists(person.name)
    .then(result => {
        if (result) {
            response.status(400).json({error: 'Name already exists, please use a different name'});
        } else {
            mongodb.insertOneEntry({entry: person})
            .then(() => {
                response.json(person);
            })
            .catch(error => {
                response.status(400).json({ "error": error });
            })
        }
    })

})

app.post('/api/test', (request, response) => {
    // Using express.json() middleware
    console.log(request.body);
    response.json(request.body);
})



// Listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

