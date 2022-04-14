import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { 
  ApolloClient, 
  ApolloProvider, 
  HttpLink, 
  InMemoryCache
} from '@apollo/client' 
import { setContext } from 'apollo-link-context'

const token = localStorage.getItem('phonenumbers-user-token')
let auth = token ? `bearer ${token}` : null

export const setAuth = (token) => {
  auth = `bearer ${token}`
}

const authLink = setContext((_, { headers }) => {   
  return {    
    headers: {      
      ...headers,      
      authorization: auth,    
    }  
  }
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>    
    <App />
  </ApolloProvider>,  document.getElementById('root')
)
