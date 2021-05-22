
import React from 'react'

const Header = (props) => {

  return (
    <>
      <h1>{props.kurssi}</h1>
    </>
  )

}

const Content = (props) => {

  let content = []

  for (let part of props.parts){
    content.push(<Part part={part.name} exercises={part.exercises}/>)
  }

  return content
  
}

const Total = (props) => {

  let sum

  for (let part of props.parts){
    sum += part.exercises
  }

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )

}

const Part = (props) => {

  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )

}

const App = () => {

  const course = {

    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

}

  return (
    <div>
      <Header kurssi={course.name}/>
      
      <Content parts={course.parts} />

      <Total parts={course.parts}/>

    </div>
  )
}

export default App