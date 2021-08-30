import React, { useState } from "react";

const App = () => {
  // creating state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //creating event handlers
  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };

  // creating statistics component
  const Statistics = (props) => {
    return (
      <div>
        <h2>statistics</h2>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.good + props.bad + props.neutral}</p>
        <p>
          average{" "}
          {(props.good - props.bad) / (props.good + props.bad + props.neutral)}
        </p>
        <p>
          positive{" "}
          {(props.good / (props.good + props.bad + props.neutral)) * 100}%
        </p>
      </div>
    );
  };
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => increaseGood()}>good</button>
      <button onClick={() => increaseNeutral()}>neutral</button>
      <button onClick={() => increaseBad()}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
