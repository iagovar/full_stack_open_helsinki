import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter';
import FilteredList from './components/FilteredList';

const App = () => {
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]); */

  /* Fetching data from local json-server with axios
     Check: https://www.w3schools.com/react/react_useeffect.asp */
  const [persons, setPersons] = useState([])
  console.log('Fetching Data');
  useEffect(() => {
    axios
      .get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
        setLoading('');
      })
  }, []);
  console.log('Data loaded: ' + persons.length);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [loading, setLoading] = useState('Loading..');

  function addPerson(event) {
    event.preventDefault();
    
    let newPersons = [...persons];

    // Alert if the name or phone already exists, and prevent updating list
    const isNameIncluded = newPersons.some(element => element.name === newName);
    const isPhoneIncluded = newPersons.some(element => element.number === newPhone);
    if (isNameIncluded && !isPhoneIncluded) {
      alert(`Name ${newName} already exist!`);
      return
    } else if (!isNameIncluded && isPhoneIncluded) {
      alert(`Phone ${newPhone} already exist!`);
      return      
    } else if (isNameIncluded && isPhoneIncluded) {
      alert(`Entry ${newName} with ${newPhone} already exist!`);
      return        
    }

    const lastId = newPersons[newPersons.length -1].id;
    const newId = lastId +1;
    newPersons.push({name: newName, id: newId, number: newPhone})
    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter className='filter' newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>AddNew</h2>
      <form onSubmit={addPerson}>
        <div>Name: <input className='name' value={newName} onChange={event => setNewName(event.target.value)} /></div>
        <div>Phone: <input className='phone' value={newPhone} onChange={event => setNewPhone(event.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ol className="list-of-numbers">
        <FilteredList listOfObjects={persons} stringToSearch={newFilter} />
        {loading}
      </ol>
    </div>
  )
}

export default App