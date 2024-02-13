import { useState } from 'react'

import Filter from './components/Filter';
import FilteredList from './components/FilteredList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');

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
      </ol>
    </div>
  )
}

export default App