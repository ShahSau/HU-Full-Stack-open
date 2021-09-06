import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from './services/Persons'
const App = () => {

  useEffect(() => {
    console.log('effect')
    personService 
    .getAll()
    .then(allPersons=>
      setPersons(allPersons))
    .catch(error => console.log(error));
      
  }, [])

  // creating person hook
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 


  // creating states for name, number and search
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearchs] = useState("");

  const name_array = persons.map((person) => person.name);

  // event handler for adding name
  const handleNewName = (event) => {
    if (name_array.includes(event.target.value)) {
      alert(`${event.target.value} is already added to phonebook`);
    } else {
      setNewName(event.target.value);
    }
  };

  // event handler for adding number
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // event handler for updating search parameter
  const updateSearch = (event) => {
    setSearchs(event.target.value);
  };

  // adding new person to the person list
  const addName = (event) => {
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNumber,
    };
    personService
    .create(newObj)
    .then(newPerson=>
      setPersons(persons.concat(newPerson))
      )
    setNewName("")
    setNewNumber("")
  };
  //creating a function for delete person
  const deletePerson =(event)=>{
    if (window.confirm(`Are you sure, you want to delete ${event.name}`)) {
      console.log('it works!!!');
      personService
      .deletePersons(event.id)
      let filter_persons2 = filter_persons.filter(person=> person.id !== event.id)
      setPersons(filter_persons2)

    }
    console.log(persons)
  }

  let filter_persons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter
        text={"filter shown with"}
        search={search}
        updateSearch={updateSearch}
      />

      <h2>Add a new</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handlenewName={handleNewName}
        handlenewNumber={handleNewNumber}
        name={"name : "}
        number={"number : "}
      />
      <h2>Numbers</h2>
      {filter_persons.map((person) => (
        <Person key={Math.random()} name={person.name} number={person.number} onClick={()=>deletePerson(person)}/>
      ))}
    </div>
  );
};

export default App;
