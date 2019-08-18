import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newNotification, setNotification] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = findPersonByName(newName)

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNotification({
              type: 'success',
              message: `Updated ${returnedPerson.name}`
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setNotification({
              type: 'error',
              message: `the person '${existingPerson.name}' was already deleted from server`
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            type: 'success',
            message: `Added ${returnedPerson.name}`
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const deletePerson = id => () => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .destroy(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({
            type: 'error',
            message: `Deleted ${person.name}`
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({
            type: 'error',
            message: `the person '${person.name}' was already deleted from server`
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const findPersonByName = (name) =>
    persons.find(person => person.name.toLowerCase() === name.toLowerCase())

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={newNotification} />
      <Filter
        filter={newFilter}
        handleChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleClick={deletePerson}
      />
    </div>
  )
}

export default App
