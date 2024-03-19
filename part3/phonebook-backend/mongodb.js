const mongoose = require('mongoose');
const dbCredentials = require('./mongodb.config.json');

async function connectToMongoDB() {
    try {
        await mongoose.connect(`mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@fsodb.jvq6uqb.mongodb.net/${dbCredentials.database}?retryWrites=true&w=majority&appName=fsodb`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

async function getNumberOfEntries(collectionName = dbCredentials.collectionName) {
    return await mongoose.connection.db.collection(collectionName).estimatedDocumentCount();
}

async function getAllEntries(collectionName = dbCredentials.collectionName) {
    return await mongoose.connection.db.collection(collectionName).find().toArray();
}

async function getOneEntry({collectionName = dbCredentials.collectionName, id}) {
    // IDs in MongoDB are objects so we need to convert the id string into an object
    // This method is deprecated but mongoose provides no alternative to transform a string into an object id...
    const thisId = new mongoose.Types.ObjectId(id);
    return await mongoose.connection.db.collection(collectionName).findOne({ _id: thisId });
}

async function deleteOneEntry({collectionName = dbCredentials.collectionName, id}) {
    // IDs in MongoDB are objects so we need to convert the id string into an object
    // This method is deprecated but mongoose provides no alternative to transform a string into an object id...
    const thisId = new mongoose.Types.ObjectId(id);
    return await mongoose.connection.db.collection(collectionName).deleteOne({ _id: thisId });
}

async function insertOneEntry({collectionName = dbCredentials.collectionName, entry}) {
    return await mongoose.connection.db.collection(collectionName).insertOne(entry);
}

async function updateOneEntry({collectionName = dbCredentials.collectionName, id, entry}) {
    // IDs in MongoDB are objects so we need to convert the id string into an object
    // This method is deprecated but mongoose provides no alternative to transform a string into an object id...
    const thisId = new mongoose.Types.ObjectId(id);
    return await mongoose.connection.db.collection(collectionName).updateOne({ _id: thisId }, { $set: entry });
}

async function checkIfNameExists({collectionName = dbCredentials.collectionName, name}) {
    
    const document = await mongoose.connection.db.collection(collectionName).findOne({ name: name });

    if (document != null) {
        return {doesExist: true, id: document._id};
    } else {
        return {doesExist: false};
    }
}

module.exports = {
    connectToMongoDB,
    getNumberOfEntries,
    getAllEntries,
    getOneEntry,
    deleteOneEntry,
    insertOneEntry,
    updateOneEntry,
    checkIfNameExists
}