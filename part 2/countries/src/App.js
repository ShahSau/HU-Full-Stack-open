import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Search from "./components/Search";
import Results from "./components/Results";
import Weather from "./components/Weather";

const App = () => {
  // creating hooks to list countries and search countries and results
  const [listCountry, setListCountry] = useState([]);
  const [search, setSearchs] = useState("");
  const [showResults, setShowResults] = useState([]);

  /// using axios to fetch data
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setListCountry(response.data);
        // console.log(listCountry);
      })
      .catch((error) => console.log(error));
  }, []);

  // creating updateseacrch function
  const updateSearch = (event) => {
    setSearchs(event.target.value);
  };

  //filtering countries
  let filter_country = listCountry.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  // creating a function to show details of the countries
  const onClickDetails = (event) => {
    let country = filter_country.filter((c) => c.name === event.name)[0];

    setShowResults([country]);
  };

  //rendering countries list depending on the filter data
  if (filter_country.length > 10) {
    return (
      <div>
        <Search search={search} updateSearch={updateSearch} />
        <p>too many matches</p>
      </div>
    );
  } else if (filter_country.length <= 10 && filter_country.length > 1) {
    return (
      <div>
        <Search search={search} updateSearch={updateSearch} />
        {filter_country.map((country) => (
          <p key={Math.random()} id={country.name}>
            {country.name}{" "}
            <button onClick={() => onClickDetails(country)}>Button </button>
          </p>
        ))}
        {showResults.map((c) => (
          <Results key={Math.random()} country={c} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <Search search={search} updateSearch={updateSearch} />
        {filter_country.map((country) => (
          <Country
            key={Math.random()}
            capital={country.capital}
            population={country.population}
            namme={country.name}
            flag={country.flag}
            language={country.languages.map((country) => country.name)}
          />
        ))}
        {filter_country.map(country =>
    <Weather key={Math.random()} city={country.capital}/>
    )}
      </div>
    );
  }
};

export default App;
