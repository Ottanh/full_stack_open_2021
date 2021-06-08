
import React, { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'
import Services from './services/services'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  useEffect(() => {
    Services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name : newName,
      number : newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson !== undefined){
      if(window.confirm(`${newName} is already added to phonebook,
       replace the old number with a new one?`)){
         Services
          .update(existingPerson.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
       }
      return
    }

    Services
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
  }

  const deletePerson = (id) => {

    const person = Object.values(persons)
    .find(person => person.id === id); 

    if(window.confirm(`Delete ${person.name}`)){
      Services
        .deletePerson(id)
        .then(() => {
          Services.getAll().then(
            initialPersons => {
              setPersons(initialPersons)
            })
        })
    }
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
      <Persons persons={persons} filter={filter} onclick={deletePerson}/>
    </div>
  )

}

export default App
