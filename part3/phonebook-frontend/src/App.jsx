import { useState, useEffect } from 'react'

import Filter from './components/Filter';
import FilteredList from './components/FilteredList';
import Notification from './components/Notification';
import * as courseService from './services/phonebook-api';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [loading, setLoading] = useState('Loading..');
  const [notification, setNotification] = useState({message: null, type: null, time: null});

  /* 
     Check: https://www.w3schools.com/react/react_useeffect.asp 
  
  NOTA: Components are rendered twice in dev-strict mode, not in production, due to
  some lenghty reasons: https://www.reddit.com/r/reactjs/comments/ugzopd/why_is_my_fetch_getting_called_twice/
  */
  useEffect(() => {
    courseService.getAll().then(response => {
      setPersons(response);
      setLoading('');
    })
  }, []);



  function addPerson(event) {
    event.preventDefault();

    // Check against local list if name and phone already exist
    // If it does, offer confirmation to update the phone.
    const isNameIncluded = persons.some(element => element.name === newName);
    const isPhoneIncluded = persons.some(element => element.number === newPhone);

    if (isNameIncluded && !isPhoneIncluded) {

      const confirmation = confirm(`Name ${newName} already exist! Would you like to update phone to ${newPhone}?`);
      if (!confirmation) {return}

      const newPersonId = persons.find(element => element.name === newName).id;
      courseService.update(newPersonId, {name: newName, number: newPhone}).then(() => {
        courseService.getAll().then(response => {
          setPersons(response);
        })
      });
      return

    } else if (!isNameIncluded && isPhoneIncluded) {
      alert(`Phone ${newPhone} already exist!`);
      return 
    } else if (isNameIncluded && isPhoneIncluded) {
      alert(`Entry ${newName} with ${newPhone} already exist!`);
      return
    }

    // If it doesn't exist, add it without confirmation

    const newPerson = {name: newName, number: newPhone};

    (async () => {
      setLoading('');
      
      try {
        await courseService.create(newPerson);
        const personsPromise = await courseService.getAll();
        setPersons(personsPromise);
        setNotification({message: "Added " + newName, type: "success", time: 1000});
      } catch (error) {
        setNotification({message: error.response.data.error.message, type:"error", time:1000});
      }
      
    })();
  }

  async function deletePerson(id) {
    try {
      setLoading('');
      await courseService.deleteEntry(id);
      const response = await courseService.getAll();
      setPersons(response);
      setNotification({message: "Removed " + persons.find(element => element.id === id).name + " from list", type: "error", time: 1000});
    } catch (error) {
      setNotification({message:"Can't remove " + persons.find(element => element.id === id).name + " from list, already done?", type:"error", time:1000});
    }
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
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
        <FilteredList listOfObjects={persons} stringToSearch={newFilter} methods={{deletePerson}} />
        {loading}
      </ol>
    </div>
  )
}

export default App