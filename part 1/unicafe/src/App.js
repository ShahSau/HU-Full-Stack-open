import React, { useState } from "react";

const App = () => {
  // creating state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //Button
  const Button = ({ func, text }) => {
    return <button onClick={func}>{text}</button>;
  };
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

  // single statistic line
  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text} </td>
        <td>{value}</td>
      </tr>
    );
  };
  // creating statistics component
  const Statistics = ({ good, bad, neutral }) => {
    if (good + bad + neutral === 0) {
      return <p>No feedback given</p>;
    }
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={good + bad + neutral} />
            <StatisticLine
              text={"average"}
              value={(good - bad) / (good + bad + neutral)}
            />
            <StatisticLine
              text={"positive"}
              value={
                parseFloat((good / (good + bad + neutral)) * 100).toFixed(2) +
                "%"
              }
            />
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button func={increaseGood} text={"good"} />
      <Button func={increaseNeutral} text={"neutral"} />
      <Button func={increaseBad} text={"bad"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
