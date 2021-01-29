import React, {useState, useEffect} from "react";
import {MenuItem, FormControl, Select} from '@material-ui/core';
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import Map from "./components/Map";
import {sortData} from "./utils";
import LineGraph from "./components/LineGraph"
import './App.css';
// import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // const [mapCenter, setMapCenter] = useState({
  //   lat : 34.80746,
  //   lng : -40.4796
  // })
  

  const getCountries = async() => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();

  const sortedData = sortData(data);
  setTableData(sortedData)
   setCountries(data)}

useEffect(() => {
   getCountries()
  }, []);

const getWorldwide = async() => {
  const response = await fetch("https://disease.sh/v3/covid-19/all")
  const data = await response.json();
  setCountryInfo(data)
}

useEffect(() => {
getWorldwide()
}, [])

  const onCountryChange = async(e) => {
  const countryCode = e.target.value;
  setCountry(countryCode)
  const url = countryCode === "worldwide" ?
   "https://disease.sh/v3/covid-19/all" :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`
    const response = await fetch(url);
    const data = await response.json()

    setCountryInfo(data)
  }
 

  return (
    <main className = 'app'>
      <section className = "app-left">
      <div className = "header">
    <h1 className = "heading">COVID-19 TRACKER</h1>
    <FormControl className = "appDropdown">
      <Select value = {country} onClick = {onCountryChange} variant = "outlined">
        <MenuItem value = "worldwide">Worldwide</MenuItem>
   {countries.map((each, index) => {
     return <MenuItem value = {each.countryInfo.iso3} key = {index}>{each.country}
            </MenuItem> })}
      </Select>
      </FormControl>
      </div>
      <section className = "appInfoBox">
<InfoBox title = "Covid Cases" cases = {countryInfo.todayCases} total = {countryInfo.cases}></InfoBox>
<InfoBox title = "Recovered" cases = {countryInfo.todayRecovered} total = {countryInfo.recovered}></InfoBox>
<InfoBox title = "Deaths" cases = {countryInfo.todayDeaths} total = {countryInfo.deaths}></InfoBox>
      </section>
      <Map />
    </section>
  <section className = "app-right">
    <h2>Live Cases by Country</h2>
    <Table countries = {tableData}/>
    <LineGraph/>
  </section>
    </main>
     );
}
export default App;
