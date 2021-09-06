import React from "react";
import Languages from "./Languages";

const Results = ({ country }) => {
  return (
    <div>
      <p>capital is {country.capital}</p>
      <p>population is {country.population}</p>
      <img src={country.flag} alt={"namme"} height="125" width="125"></img>
      <h5>Spoken Languages:</h5>
      {country.languages.map((cc) => (
        <Languages key={Math.random()} lang={cc.name} />
      ))}
    </div>
  );
};

export default Results;
