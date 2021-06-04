
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


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
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App
