import React from "react";

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  //Header component
  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };
  //part component
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    );
  };

  //Content component
  const Content = (props) => {
    return (
      <div>
        <Part part={props.course[0]} exercise={props.exercise[0]} />
        <Part part={props.course[1]} exercise={props.exercise[1]} />
        <Part part={props.course[2]} exercise={props.exercise[2]} />
      </div>
    );
  };

  //Total component
  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content
        course={[part1.name, part2.name, part3.name]}
        exercise={[part1.exercises, part2.exercises, part3.exercises]}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
