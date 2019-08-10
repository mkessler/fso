import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  return (
    <div>{rows()}</div>
  )
}

export default Persons
