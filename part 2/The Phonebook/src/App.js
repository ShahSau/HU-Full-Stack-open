import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const newObj = {
      name: newName,
    };
    setPersons(persons.concat(newObj));
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={Math.random()} person={person.name} />
      ))}
    </div>
  );
};

export default App;
