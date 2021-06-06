import React from 'react'


const Country = ({country, weather}) => (
  <>
        <h2>{country.name}</h2>
        <p>
          capital {country.capital} <br/>
          population {country.population}
        </p>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} height="200" alt={"Flag"} />
        <h3>Weather in {country.capital}</h3>
        <p><b>Temperature:</b> {weather.current.temperature} Celsious</p>
        <img src={weather.current.weather_icons[0]} alt = "kuva" />
        <p><b>Wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        <p></p>
      </>
)

export default Country