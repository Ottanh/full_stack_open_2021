
import React, { useState } from 'react'

const DisplayPersons = ({persons,filter}) => (
  persons.filter( person => person.name.includes(filter))
  .map(person => <p key={person.name}>{person.name} {person.number}</p>)
)

const Filter = ({filter, handleFilterChange}) => (
  <form>
    <div>
        filter shown with 
        <input value={filter}
        onChange={handleFilterChange}
        />
    </div>
  </form>
)

const PersonForm = ({addPerson, handleNameChange, handleNumberChange, newName, newNumber}) => (

  <form onSubmit={addPerson}>
    <div>
      name: 
      <input value={newName}
      onChange={handleNameChange} />
    </div>
    <div>
      number: 
      <input value={newNumber}
      onChange={handleNumberChange}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>

)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`);
      return
    }

    const personObj = {
      name : newName,
      number : newNumber
    }
    setPersons(persons.concat(personObj))
    setNewName("")
    setNewNumber("")
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter}
      handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} 
      newName={newName}
      newNumber={newNumber}/>

      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filter={filter}/>
    </div>
  )

}

export default App
