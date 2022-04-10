import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthyear from './components/SetBirthyear'

const App = () => {
  const [page, setPage] = useState('authors')
  const authorQuery = useQuery(ALL_AUTHORS);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} result={authorQuery} />
      <SetBirthyear show={page === 'authors'} result={authorQuery} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
