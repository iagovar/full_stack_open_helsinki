// Importing tlfs JSON

const localTelephones = require("./tlfs.json");

// Connecting to mongodb via mongoose on fsdb > phonebook.tlfs database

const mongoose = require("mongoose");

const credentials = require("../mongodb.config.json");

let personSchema;
let Person;

// Connecting to MongoDB
async function connectToMongoDB() {
    try {
        await mongoose.connect(`mongodb+srv://${credentials.username}:${credentials.password}@fsodb.jvq6uqb.mongodb.net/${credentials.database}?retryWrites=true&w=majority&appName=fsodb`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

async function populateDatabase() {
    // Defining Schema on Mongose (app-level, MongoDB does not care)
    personSchema = new mongoose.Schema({
        name: String,
        number: String
    });

    Person = mongoose.model("Person", personSchema);

    // Populating database
    for (const element of localTelephones) {
        try {
            const person = new Person(element);
            await person.save();
            console.log(`Added ${element.name}`);
        } catch (error) {
            console.error(error);
        }
    }

}

async function browseDatabase() {
    console.log("Printing Collection");
    let collection = await Person.find({});
    collection.forEach(element => console.log(JSON.stringify(element)));
}


async function main() {
    await connectToMongoDB();
    await populateDatabase();
    await browseDatabase();
    try {
        console.log("Disconnecting...");
        await mongoose.connection.close();
    } catch (error) {
        console.error(error);
    }
}

main();

