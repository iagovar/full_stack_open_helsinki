import axios from 'axios';

export async function getAllCountries() {
    const request = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return request.data;
}

export async function getcountryByName(name) {
    const request = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
    return request.data;
}