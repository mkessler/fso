import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleClick }) => {
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
      handleClick={handleClick}
    />
  )

  return (
    <div>{rows()}</div>
  )
}

export default Persons
