import './App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core"
import { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from "./Map";
import Table from "./Table"
import { sortData } from './util'
import LineGraph from "./LineGraph"


function App() {

  //for dropdown
  const [countries,setCountries] = useState([])
  const  [country,setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])

  //for 1st time only worldwide is loaded

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])


  useEffect(() => {
    //async coz we need to wait for response from server

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {
        const countries = data.map((country)=>{
          return ({
            name:country.country,
            value:country.countryInfo.iso2
         })  
        })
        //for table view:

        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries)
      })
    }

    getCountriesData();
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("Drop down selected: "+countryCode);
    // setCountry(countryCode)

    //for worldwide:
    ///v3/covid-19/all

    //calling api for spicifc country: /v3/covid-19/countries/{country}
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      
      setCountry(countryCode)
      setCountryInfo(data)
    })
  }


  return (
    <div className="app">

     {/*Header */}
      <div className="app__left">

        <div className="app__header" >
          <h1> COVID 19 TRACKER </h1>
            <FormControl className="app__dropdown">
              <Select value={country}  variant="outlined" onChange={onCountryChange}>
                <MenuItem value="worldwide"> WorldWide </MenuItem>
                {/*looping thru countries using state*/}
                {
                  countries.map( (country) => {
                    return(
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    )
                    
                  })
                }
                
              </Select>
            </FormControl>
            </div>

        {/*TItle*/}

        {/*Infoboxes 3*/}
        <div className="app__stats">
          <InfoBox title="CoronaVrius" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths}  total={countryInfo.deaths}/>
        </div>


        
        


        {/*Map */}
        <Map />
    </div>

      <Card className="app__right">
      <CardContent>
        <h3>Live Cases by Country</h3>
{/*Right sidebar table*/}
        <Table countries={tableData} />
        <h3>WorldWide new Cases</h3>
    
        {/*Line graph*/}
        <LineGraph />
      </CardContent>
      </Card>
  </div>
    
  );
}

export default App;
