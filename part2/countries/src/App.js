import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const fetchCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(fetchCountries, [])

  const setToFilter = (filter) => () => setNewFilter(filter)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        filter={newFilter}
        handleChange={handleFilterChange}
      />
      <Countries
        countries={countries}
        filter={newFilter}
        handleClick={setToFilter}
      />
    </div>
  )
}

export default App;
