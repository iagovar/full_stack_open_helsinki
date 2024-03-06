const express = require('express');
const app = express();
const PORT = 3001;

let persons = require('./tlfs.json');


app.get('/', (request, response) => {
    response.send('<div>Something</div>')
  })
  
app.get('/api/persons', (request, response) => {
response.json(persons)
})

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})