import React from 'react'

const Search = ({search, handleSearchChange}) => (
    <form>
      <div>
          Find countries
          <input value={search}
          onChange={handleSearchChange}
          />
      </div>
    </form>
  )

  export default Search