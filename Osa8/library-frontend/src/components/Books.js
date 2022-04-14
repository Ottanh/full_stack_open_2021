import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import BookTable from './BookTable'

const Books = (props) => {
  const [select, setSelect] = useState('all genres')
  const result = useQuery(ALL_BOOKS, {
    variables: {genre: select === 'all genres' ? undefined : select}
  })

  const genres = ['all genres', 'refactoring', 'agile', 'patterns', 'design', 'crime', 'classic']

  const handleChange = (event) => {  
    event.preventDefault()  
    setSelect(event.target.value);  
  }


  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return (
    <div>
      <h2>books</h2>
      loading...
    </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      genre
      <select value={select} onChange={handleChange}>            
        {genres.map(a => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <BookTable books={result.data.allBooks} />
    </div>
  )
}

export default Books
