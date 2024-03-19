const mongoose = require('mongoose');
const dbCredentials = require('./mongodb.config.json');

/**
 * Connects to MongoDB using the provided credentials.
 *
 */
async function connectToMongoDB() {
    try {
        await mongoose.connect(`mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@fsodb.jvq6uqb.mongodb.net/${dbCredentials.database}?retryWrites=true&w=majority&appName=fsodb`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

/**
 * Function to get the number of entries in a collection.
 *
 * @param {string} collectionName - The name of the collection (optional, defaults to dbCredentials.collectionName)
 * @return {Promise<number>} The estimated count of documents in the collection
 */
async function getNumberOfEntries(collectionName = dbCredentials.collectionName) {
    return await mongoose.connection.db.collection(collectionName).estimatedDocumentCount();
}

/**
 * Retrieves all entries from the specified collection.
 *
 * @param {string} collectionName - the name of the collection to retrieve entries from
 * @return {Promise<Array>} a promise that resolves to an array of all entries in the specified collection
 */
async function getAllEntries(collectionName = dbCredentials.collectionName) {
    return await mongoose.connection.db.collection(collectionName).find().toArray();
}

/**
 * Retrieves a single entry from the specified collection by its ID.
 *
 * @param {Object} collectionName - The name of the collection (optional, defaults to dbCredentials.collectionName)
 * @param {string} id - The ID of the entry to retrieve
 * @return {Promise} A promise that resolves to the retrieved entry
 */
async function getOneEntry({collectionName = dbCredentials.collectionName, id}) {
    // IDs in MongoDB are objects so we need to convert the id string into an object
    // This method is deprecated but mongoose provides no alternative to transform a string into an object id...
    const thisId = new mongoose.Types.ObjectId(id);
    return await mongoose.connection.db.collection(collectionName).findOne({ _id: thisId });
}

/**
 * Delete one entry from the specified collection by ID.
 *
 * @param {string} collectionName - The name of the collection (defaults to dbCredentials.collectionName)
 * @param {string} id - The ID of the entry to be deleted
 * @return {Promise} A promise that resolves to the result of the deletion operation
 */
async function deleteOneEntry({collectionName = dbCredentials.collectionName, id}) {
    // IDs in MongoDB are objects so we need to convert the id string into an object
    // This method is deprecated but mongoose provides no alternative to transform a string into an object id...
    const thisId = new mongoose.Types.ObjectId(id);
    return await mongoose.connection.db.collection(collectionName).deleteOne({ _id: thisId });
}

/**
 * Asynchronously inserts a single entry into a specified collection.
 *
 * @param {Object} collectionName - optional parameter for the name of the collection, defaults to dbCredentials.collectionName
 * @param {Object} entry - the entry to be inserted into the collection
 * @return {Promise} A promise that resolves with the result of the insertion operation
 */
async function insertOneEntry({collectionName = dbCredentials.collectionName, entry}) {
    return await mongoose.connection.db.collection(collectionName).insertOne(entry);
}

/**
 * Updates one entry in the specified collection.
 *
 * @param {Object} options - The options for updating the entry.
 * @param {string} options.collectionName - The name of the collection to update the entry in. Defaults to the value of `dbCredentials.collectionName`.
 * @param {string} options.id - The ID of the entry to update.
 * @param {Object} options.entry - The updated entry object.
 * @return {Promise<Object>} A promise that resolves to the result of the update operation.
 */
async function updateOneEntry({collectionName = dbCredentials.collectionName, id, entry}) {
    // IDs in MongoDB are objects so we need to convert the id string into an object
    // This method is deprecated but mongoose provides no alternative to transform a string into an object id...
    const thisId = new mongoose.Types.ObjectId(id);
    return await mongoose.connection.db.collection(collectionName).updateOne({ _id: thisId }, { $set: entry });
}

/**
 * Check if a specific name exists in a given collection.
 *
 * @param {string} collectionName - the name of the collection to search in
 * @param {string} name - the name to check for existence
 * @return {Object} an object indicating if the name exists and its corresponding ID if found
 */
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