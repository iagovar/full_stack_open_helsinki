
const mongoose = require('mongoose');
const dbCredentials = require('../mongodb.config.json');

let db;

mongoose.connect(`mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@fsodb.jvq6uqb.mongodb.net/${dbCredentials.database}?retryWrites=true&w=majority&appName=fsodb`)
.then(() => {
    db = mongoose.connection.db;
    db.collection('people').estimatedDocumentCount().then(result => console.log(result))
})



