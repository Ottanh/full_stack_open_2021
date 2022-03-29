import {  useNavigate } from "react-router-dom"
import { useField } from "../hooks/useField"

const CreateNew = ({ addNew, setNotification}) => {
  const navigate = useNavigate()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`New anecdote ${content.value} added!`)
    setTimeout(() => {setNotification('')}, 5000)
    navigate('/')
  }

  const reset = () => {
    content.onChange()
    author.onChange()
    info.onChange()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={reset}>reset</button>
      </form>
    </div>
  )
}



export default CreateNew