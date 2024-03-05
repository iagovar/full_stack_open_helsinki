import { useState, useEffect, useRef } from 'react'
import Country from './Country';

export function FilteredList({countries, searchString, getOneCountry}) {

    const countriesMatching = countries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()));
    
    const [selectedCountry, setSelectedCountry] = useState(null);

    function filterTOCountry(name) {
        const country = countries.find(country => country.name.common.toLowerCase() === name.toLowerCase());
        setSelectedCountry(country);
    }

    if (countriesMatching.length === 1) {
        return <Country country={countriesMatching[0]} />
    } else if (countriesMatching.length > 10) {
        return <div>Too many matches, be more specific</div>
    } else if (countriesMatching.length <= 10) {
        return (
        <div>
            <ul>
                {countriesMatching.map((country) => <li key={country.name.common}>{country.name.common} <button onClick={() => filterTOCountry(country.name.common)}>Show Data</button></li>)}
            </ul>

            <div>
                {selectedCountry && <Country country={selectedCountry} />}
            </div>
        </div>
        )
    }
}
