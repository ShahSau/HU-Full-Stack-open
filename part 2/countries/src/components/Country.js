import React from "react";
import Languages from "./Languages";

const Country = ({ capital, population, language, namme, flag }) => {
  return (
    <div>
      <h2>{namme}</h2>
      <p>capital is {capital}</p>
      <p>population is {population}</p>
      <h5>Languages</h5>
      {language.map((cc) => (
        <Languages lang={cc} />
      ))}
      <img src={flag} alt={namme} height="125" widht="125"></img>
    </div>
  );
};

export default Country;
