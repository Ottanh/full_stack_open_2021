
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/search'
import SearchResults from './components/searchresults'



function App() {

  const [ countries, setCountries ] = useState([])
  const [ search, setNewSearch ] = useState('')
  const [ weather, setWeather ] = useState([])


  useEffect(() => {
    console.log('effect')

    if(search.trim() === ''){
      axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${search}`)
        .then(response => {
          setCountries(response.data)
        })
      }
  }, [search])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countries[0].capital}`)
      .then(response => {
        setWeather(response.data)
      })

  },[search])


  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleClick = (index) => {
    var country = []
    country.push(countries[index])
    setCountries(country)
  }


  return (
    <div>
      <Search search={search}
      handleSearchChange={handleSearchChange} />

      <SearchResults countries={countries} weather={weather} handleclick={handleClick} />
    </div>
  );
}

export default App;
