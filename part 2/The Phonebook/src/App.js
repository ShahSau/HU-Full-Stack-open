import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

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
    setPersons(persons.concat(newObj));
    setNewName("");
    setNewNumber("");
  };

  let filter_persons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        filter shown with <input value={search} onChange={updateSearch} />
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter_persons.map((person) => (
        <Person key={Math.random()} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
