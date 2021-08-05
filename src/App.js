import React, { useState, useEffect } from "react";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountryData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, //Name of the country. Ex. America, Africa
            value: country.countryInfo.iso2 //Abriviation for the contry. Ex. USA, RSA, UK
          }
        ));
        setCountries(countries);
      });
    };
    getCountryData();

  }, []);

  const onCountryChange = async( event ) =>{
    const countryCode = event.target.name;

    console.log(countryCode);
  };


  return (
    <div className="app">
      <div className="header">
        <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/*Loop through all the different countries in the dropdown */}

              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem> 
                ))
              }
            </Select>
          </FormControl>
      </div>
      {/*Header */}
      {/* */}
      {/* */}
      {/* */}
      {/* */}

    </div>
  );
}

export default App;
