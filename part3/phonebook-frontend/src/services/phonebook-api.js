import axios from 'axios'
const baseUrl = '/api/persons'

export async function getAll() {
    try {
        console.log('\nGetting all data...');
        const response = await axios.get(baseUrl);
        console.info("\nSuccessfully got all data:");
        console.log(response);
        return response.data;
    } catch (error) {
        console.info("\nError getting all data:");
        console.error(error);
        return error;
    }
}


export async function create(newObject) {
    try {
        console.log('\nCreating new data...');
        const response = await axios.post(baseUrl, newObject);
        console.info("\nSuccessfully created new data:");
        console.log(response);
        return response.data;
    } catch (error) {
        console.info("\nError creating new data:");
        console.error(error);
        throw error;
    }
}

export async function update(id, newObject) {
    try {
        console.log('Updating data...');
        const response = await axios.put(`${baseUrl}/${id}`, newObject);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteEntry(id) {
    console.log('Deleting data...');
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}