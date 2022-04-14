import { useState, useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ login, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ loginQuery, result ] = useMutation(LOGIN,{
    refetchQueries: [  {query: ME} ]
  })

  const client = useApolloClient()

  useEffect(() => {    
    if ( result.data ) {      
      const token = result.data.login.value      
      login(token)    
      localStorage.setItem('phonenumbers-user-token', token)    
    }  
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    client.resetStore()
    loginQuery({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm