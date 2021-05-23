
import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good,neutral,bad}) => {
  
  if(good === 0 && neutral === 0 && bad === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good}/>
          <StatisticsLine text={"neutral"} value={neutral}/>
          <StatisticsLine text={"bad"} value={bad}/>
          <StatisticsLine text={"all"} value={[good,bad,neutral]}/>
          <StatisticsLine text={"average"} value={[good,bad,neutral]}/>
          <StatisticsLine text={"positive"} value={[good,bad,neutral]}/>
        </tbody>
      </table>
    </>
  )

}

const StatisticsLine = ({text, value}) => {

  let good,bad,neutral;
  
  if(text === "average"){
    [good,bad,neutral] = value
    return(
      <>
        <tr>
          <td>{text}</td> 
          <td>{(good+(bad*-1))/(good+bad+neutral)}</td>
        </tr>
      </>
    )
  }
  else if(text === "positive"){
    [good,bad,neutral] = value
    return(
      <>
        <tr>
          <td>{text}</td> 
          <td>{good/(good+bad+neutral)*100} %</td>
        </tr>
      </>
    )
  }

  else if(text === "all"){
    [good,bad,neutral] = value
    return(
      <>
        <tr>
          <td>{text}</td> 
          <td>{good+bad+neutral}</td>
        </tr>
      </>
    )
  }

  return(
    <>
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    </>
  )

}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const add_to_good = () => {
    setGood(good + 1)
  }
  const add_to_neutral = () => {
    setNeutral(neutral + 1)
  }
  const add_to_bad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={add_to_good} text={"good"} />
      <Button handleClick={add_to_neutral} text={"neutral"} />
      <Button handleClick={add_to_bad} text={"bad"} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
