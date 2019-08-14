import React from 'react'

const Country = ({ country }) => {
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
    </div>
  )
}

export default Country;
