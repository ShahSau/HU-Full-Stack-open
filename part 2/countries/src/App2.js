import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Search from "./components/Search";
import Results from "./components/Results";

const App = () => {
  let country = "";
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setListCountry(response.data);
        console.log(listCountry);
      })
      .catch((error) => console.log(error));
  }, [listCountry]);
  const [listCountry, setListCountry] = useState([]);
  const [search, setSearchs] = useState("");
  const [country22, setCountry22] = useState(true);
  const updateSearch = (event) => {
    setSearchs(event.target.value);
  };
  let filter_country = listCountry.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  const [showResults, setShowResults] = useState([]);

  const onClick2 = (event) => {
    country = filter_country.filter((c) => c.name === event.name)[0];
    console.log(event.name);
    console.log(country);

    setShowResults([country]);
  };

  if (filter_country.length > 3) {
    setCountry22(false);
    return (
      <div>
        <Search search={search} updateSearch={updateSearch} />
        <p>too many matches</p>
      </div>
    );
  } else if (filter_country.length > 1 && filter_country.length <= 3) {
    console.log(filter_country);
    console.log(showResults);
    setCountry22(false);
    country = "";

    return (
      <div>
        <Search search={search} updateSearch={updateSearch} />
        {filter_country.map((country) => (
          <p key={Math.random()} id={country.name}>
            {country.name}{" "}
            <button onClick={() => onClick2(country)}>Button </button>
          </p>
        ))}

        {/* {country22 &&
          showResults.map((c) => <Results key={Math.random()} country={c} />)} */}
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
      </div>
    );
  }
};

export default App;
