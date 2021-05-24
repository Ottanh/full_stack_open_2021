
import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {

  const [anecdote, nextAnecdote] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [votes, addVote] = useState(
    Array(anecdotes.length).fill(0)
  )

  const next = () => {
    let rand
    do {
    rand = Math.floor(Math.random() * 5)
    } while (rand === anecdote) //ettei tuu samaa montaa kertaa peräkkäin
    console.log(rand)
    nextAnecdote(rand)
  }

  const vote = () => {
    let copy = [...votes]
    copy[anecdote] += 1
    addVote(copy)
  }

  let max = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[anecdote]} <br/>
        has {votes[anecdote]} votes
      </p>
      <Button text={"vote"} handleClick={vote} />
      <Button text={"next anecdote"} handleClick={next} />
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[max]} <br/>
        has {votes[max]} votes
      </p>
    </div>
  )
}

export default App

