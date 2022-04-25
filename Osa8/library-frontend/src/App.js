import { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, BOOK_ADDED, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthyear from './components/SetBirthyear'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { setTokenHeader } from '.'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authorQuery = useQuery(ALL_AUTHORS);
  const client = useApolloClient()

  useEffect(() => {
    const token = window.localStorage.getItem('phonenumbers-user-token');
    if (token) {
      setToken(token)
    }
  }, []);

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  const login = (value) => {
    setToken(value)
    setPage('authors')
    setTokenHeader(value)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`${newBook.title} added`)


      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {        
        return {          
          allBooks: allBooks.concat(newBook),        
        }      
      })

    }
  })


  return (
    <div>
      { token &&
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
      } 
      { !token &&
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
      }

      <Authors show={page === 'authors'} result={authorQuery} />
      <SetBirthyear show={page === 'authors'} result={authorQuery} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
      <LoginForm show={page === 'login'} login={login} />

    </div>
  )
}

export default App
