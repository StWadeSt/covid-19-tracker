import React, { useState, useEffect } from "react";
import { Select, FormControl, MenuItem, Card, CardContent } from "@material-ui/core";
import './App.css';
import InfoBox from "./components/infoBox";
import Map from "./components/map";
import Table from "./components/table";
import { sortData } from "./components/util";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

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

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountryData();

  }, []);

  const onCountryChange = event  => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 
    "https://disease.sh/v3/covid-19/all" :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      fetch(url)
     .then(response => response.json())
     .then((data) => {
        setCountry(countryCode);
        //All of the data for the specific country
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
     });
  };

  return (
    <div className="app">
     <div className="leftside">
        {/*Header */}
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

        {/* Body */}
          <div className="statistics">
            
                {/* InfoBox for Covid Cases */}
                <InfoBox 
                  title="New Cases" 
                  cases= {countryInfo.todayCases}
                  total={countryInfo.cases}
                 />

                {/* InfoBox for Covid Recoveries */}
                <InfoBox 
                  title="Latest Recoveries"
                  cases= {countryInfo.todayRecovered}
                  total={countryInfo.recovered}
                  />

                {/* InfoBox for Covid Deaths*/}
                <InfoBox 
                  title="Covid Deaths"
                  cases= {countryInfo.todayDeaths} 
                  total={countryInfo.deaths}
                 />

          </div>

          {/*----*************MAP***********--------- */}
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className="rightside">
          <CardContent>
            <h3> Live Cases</h3>
            <Table countries={tableData}/>
            <h3> Worldwide New Cases</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
      </Card>


      {/* */}
      {/* */}
      {/* */}

    </div>
  );
}

export default App;
