import React, { useState } from "react";

const Button = ({ func, text }) => {
  return <button onClick={func}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const change = () => {
    setSelected(Math.floor(Math.random() * 6));
  };
  const [vote, setVote] = useState(
    new Array(6 + 1).join("0").split("").map(parseFloat)
  );

  const x = vote.indexOf(Math.max(...vote));
  console.log(x);
  const vote_change = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
    console.log(vote);
  };

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {vote[selected]} votes <br></br>
      <Button func={vote_change} text={"vote"} />
      <Button func={change} text={"next anecdotes"} />
      <h1>Anecdotes with most vote</h1>
      {anecdotes[x]}
      <br></br>
    </div>
  );
};

export default App;
