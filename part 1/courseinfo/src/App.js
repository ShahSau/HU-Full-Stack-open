import React from 'react'

const App = () => {
  //Header component
 const Header = (props)=>{
  return (
    <h1>{props.course}</h1>
  )
}
//part component
const Part = (props)=>{
  return (
    <p>{props.part} {props.exercise}</p>
  )

}

//Content component
const Content = (props)=>{
  return (
    <div>
    <Part  part={props.course[0]} exercise={props.exercise[0]}/>
    <Part  part={props.course[1]} exercise={props.exercise[1]}/>
    <Part  part={props.course[2]} exercise={props.exercise[2]}/>
    </div>
  )
}

//Total component
const Total = (props)=>{
  return (
    <p>Number of exercises {props.total}</p>
  )
}
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
       <Header course={course}/>
       <Content course={[part1,part2,part3]} exercise={[exercises1, exercises2,exercises3]}/>
       <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App