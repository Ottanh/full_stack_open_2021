import { useParams } from "react-router-dom"

const Anecdote = ({anecdotes}) => {

  const id = useParams().id  
  const anecdote = anecdotes.find(n => n.id === Number(id))

  return (
    <div>
      <h1> {anecdote.content}</h1>
      <p>{anecdote.author}</p>
      <p>{anecdote.info}</p>
      <p>Has {anecdote.votes} votes</p>
    </div>
  )
}

export default Anecdote