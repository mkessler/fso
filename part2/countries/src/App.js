import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import Country from './components/Country'

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

  const countriesToShow = newFilter
    ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    : []

  const content = countriesToShow.length === 1 ?
    <Country country={countriesToShow[0]} />  : <CountriesList countries={countriesToShow} />

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        filter={newFilter}
        handleChange={handleFilterChange}
      />
      {content}
    </div>
  )
}

export default App;
