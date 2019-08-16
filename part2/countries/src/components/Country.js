import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
  console.log(process.env)

  const [ weather, setWeather ] = useState({})
  const fetchWeather = () => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_APIXUKEY}&q=${country.capital}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }

  useEffect(fetchWeather, [])

  const languages = () => country.languages.map(language =>
    <li key={language.name}>
      {language.name}
    </li>
  )

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>{languages()}</ul>
      <img src={country.flag} alt={country.name} width="150" />
      <Weather
        weather={weather}
      />
    </div>
  )
}

export default Country;
