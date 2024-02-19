import axios from 'axios'
const baseUrl = 'http://192.168.196.8:3000/persons'

export async function getAll() {
    try {
        console.log('Getting all data...');
        const response = await axios.get(baseUrl);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function create(newObject) {
    try {
        console.log('Creating new data...');
        const response = await axios.post(baseUrl, newObject);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
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