
import React from 'react'
import Country from './country'

const SearchResults = ({countries, weather, handleclick}) => {
    var length = Object.keys(countries).length
  
    if (length > 10){
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
  
    if (length === 1){
      var country = countries[0]
      return (
        <Country country={country} weather={weather}/>
      )
    }

    return(
      countries.map((country,index) => 
        <div key={country.name}>
            <p>
            {country.name}{" "}
            <button onClick={() => handleclick(index)}>
                show
            </button>
            </p>
        </div>
      )
    )
  
  }

  export default SearchResults