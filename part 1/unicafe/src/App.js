import React, { useState } from "react";

const App = () => {
  // creating state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => increaseGood()}>good</button>
      <button onClick={() => increaseNeutral()}>neutral</button>
      <button onClick={() => increaseBad()}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
