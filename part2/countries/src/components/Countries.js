import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter, handleClick }) => {
  const countriesToShow = filter
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : []

  const rows = () => countriesToShow.map(country =>
    <div key={country.name}>
      {country.name}
      <button onClick={handleClick(country.name)}>show</button>
    </div>
  )

  const tooMany = () =>
    <div>Too many matches, specify another filter</div>

  const content = countriesToShow.length > 10 ?
    tooMany() : rows()

  if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />
  }

  return (
    <div>{content}</div>
  )
}

export default Countries;
