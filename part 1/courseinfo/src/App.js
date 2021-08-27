import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
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
        <Part
          part={props.course[0].name}
          exercise={props.exercise[0].exercises}
        />
        <Part
          part={props.course[1].name}
          exercise={props.exercise[1].exercises}
        />
        <Part
          part={props.course[2].name}
          exercise={props.exercise[2].exercises}
        />
      </div>
    );
  };

  //Total component
  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>;
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        course={[course.parts[0], course.parts[1], course.parts[2]]}
        exercise={[course.parts[0], course.parts[1], course.parts[2]]}
      />
      <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

export default App;
