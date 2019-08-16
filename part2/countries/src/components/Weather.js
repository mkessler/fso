import React from 'react'

const Weather = ({ weather }) => {
  if (Object.keys(weather).length === 0) {
    return null
  }

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div>
        <b>temperature: {weather.current.temp_c} Celsius</b>
      </div>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
      <div>
        <b>wind: {weather.current.wind_kph} kph direction {weather.current.wind_dir}</b>
      </div>
    </div>
  )
}

export default Weather;
