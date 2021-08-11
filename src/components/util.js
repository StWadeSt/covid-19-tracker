import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColor ={
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 400,
      },
      recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 600,
      },
      deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 1000,
      },
};

export const sortData = (data) =>{
    const sortedData = [...data];

    //inline if statement 
    //return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);

    sortedData.sort((a, b) => {
        if( a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    })

    return sortedData;
};

//Print the new cases in nice format
export const printPrettyStat = (stat) => 
    stat ? `+${numeral(stat).format("0a")}` : "Unavailable";
//Print the totals in nice format
export const printTotalStat = (stat) => 
    stat ? `${numeral(stat).format("0.0a")}` : "Unavailable";



//Draw circels on the map with interactive tooltop showing cases for the country
export const showDataOnMap = (data, casesType = "cases") => (
    data.map(country =>(
        <Circle 
            center={ [country.countryInfo.lat, country.countryInfo.long] }
            fillOpacity={0.4}
            color={casesTypeColor[casesType].hex}
            fillColor={casesTypeColor[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
              }
        >
            <Popup>
            <div className="popup-container">
                <div className="popup-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})`}} />
                <div className="popup-country">{country.country}</div>
                <div className="popup-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                <div className="popup-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                <div className="popup-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
            </div>
            </Popup>
        </Circle>
    ))
);