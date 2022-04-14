import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_BORN, ALL_AUTHORS } from "../queries";

const SetBirthyear = ({ show, result}) => {
  const [ addBook ] = useMutation(SET_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]  
  })

  const [born, setYear] = useState('')
  const [select, setSelect] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    addBook({  variables: { name: select, born: parseInt(born)  } })
    setSelect('')
    setYear('')
  }

  const handleChange = (event) => {  
    event.preventDefault()  
    setSelect(event.target.value);  
  }

  if (!show) {
    return null
  }

  if(result.loading) {
    return null
  }
  
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <label>
          <select value={select} onChange={handleChange}>            
            {result.data.allAuthors.map(a => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}


export default SetBirthyear;