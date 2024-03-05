import { useState, useEffect } from 'react'
import { FilteredList } from './components/FilteredList'

import * as countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState('');

  // Fill the countries list
  useEffect(
    () => {

       countriesService.getAllCountries().then(thisCountries => {
        setCountries(thisCountries);
       });
    },
    []
  )


  return (
    <div>
      <div className="find-countries">
        Find countries: <input type="text" onChange={event => setSearchString(event.target.value)}/>
      </div>
      <FilteredList countries={countries} searchString={searchString} getOneCountry={countriesService.getcountryByName}/>
    </div>
  )
}

export default App
