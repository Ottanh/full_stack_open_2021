import React from "react"

const Course = ({course}) => (
  <>
    <Header kurssi={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const Header = (props) => (
  <>
    <h2>{props.kurssi}</h2>
  </>
)


const Content = ({parts}) => (
  parts.map(part =>
    <Part key={part.id} part={part.name} exercises={part.exercises}/>)
)


const Total = ({parts}) => (
  <>
    <h3>
      total of {parts.reduce((sum,part) => (
      sum + part.exercises),0)} exercises
    </h3>
  </>
)

const Part = ({part,exercises}) => (
  <>
    <p>{part} {exercises}</p>
  </>
)

export default Course