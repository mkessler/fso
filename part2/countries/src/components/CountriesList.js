import React from 'react'

const CountriesList = ({ countries, handleClick }) => {
  const rows = () => countries.map(country =>
    <div key={country.name}>
      {country.name}
      <button onClick={handleClick(country.name)}>show</button>
    </div>
  )

  const tooMany = () =>
    <div>Too many matches, specify another filter</div>

  const content = countries.length > 10 ?
    tooMany() : rows()

  return (
    <div>{content}</div>
  )
}

export default CountriesList;
