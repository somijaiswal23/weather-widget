
import React, {useEffect, useState} from 'react'
import FadeLoader from "react-spinners/FadeLoader";

/**Component Imports ***/
import WeatherSearchCard from './components/WeatherSearchCard'
import WeatherWidget from './components/WeatherWidget'

/**Helpers Imports ***/
import httpRequest from './helpers/httpRequest'
import {getErrorMessage, transformCurrentData, transformForecastData} from './helpers/utils'

const App=()=> {
  /*** Local properties ***/
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loadingCurrentData, setLoadingCurrentData] = useState(true);
  const [loadingForecastData, setLoadingForecastData] = useState(true);
  const [error, setError] = useState(null)

   /*** Onload hook ***/
   useEffect(()=>{
    const fetchData = async () =>{
      navigator.geolocation.getCurrentPosition(function(position) {
        const {latitude, longitude} = position.coords
        setLat(latitude);
        setLong(longitude);
        fetchCurrentData({latitude, longitude})
      });
    }
    fetchData()
  })

  /***Method to fetch the current location data based on lat long or city */
  const fetchCurrentData = async ({latitude, longitude, city, unit='metric'}) =>{
     setLoadingCurrentData(true)
    const url = city ? 
    `${process.env.REACT_APP_API_URL}/weather?q=${city}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`:
    `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`

    try {
      const {data} = await httpRequest({url})
      setCurrentData(transformCurrentData(data))
      if(city){
        fetchForecastData({latitude:data.coord.lat, longitude:data.coord.lon, unit})
      } else {
        fetchForecastData({latitude, longitude, unit})
      }
    } catch(error){
      const erroMsg = getErrorMessage(error)
      setError(erroMsg)
    } finally{
      setLoadingCurrentData(false)
    }
    setLoadingCurrentData(false)
  }

   /***Method to fetch the forecast data for current location based on lat long or city */
  const fetchForecastData= async ({latitude, longitude,  unit='metric'}) =>{
    setLoadingForecastData(true)
    const url = `${process.env.REACT_APP_API_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`
    try {
      const {data} = await httpRequest({url})
       //slicing because api is returning 8 days of records
      const transformedData = data.daily?.slice(0,7).map(item=>transformForecastData(item))
      setForecastData(transformedData)
    } catch(error){
      const erroMsg = getErrorMessage(error)
      setError(erroMsg)
    } finally{
      setLoadingForecastData(false)
    }
    setLoadingForecastData(false)
  }

   /***Method to fetch the current location data and forecast data for current location based location */
  const searchHandler = (city) =>{
    if(city && city.trim()){
      setCity(city)
      fetchCurrentData({city, unit})
    }
  }

  const unitHandler = (newUnit) =>{
    if(unit !== newUnit){
      setUnit(newUnit)
      fetchCurrentData({latitude:lat, longitude:long, city, unit:newUnit})
    }
  }
  /***If data is loading keep showing the spinner ***/
  if(loadingCurrentData && loadingForecastData){
    return <div className="loading">
        <FadeLoader color='white' loading={true} size={250} />
    </div>
  }
  return (
    <main className="app__container">
      <header>Weather Widget</header>
      <WeatherSearchCard searchHandler={searchHandler}/>
      {!error && forecastData && currentData?
      <WeatherWidget 
      currentData={currentData}
      forecastData={forecastData}
      unit={unit}
      unitHandler={unitHandler}
      />:
      <p>{error} Service issue Please try again</p> }
    </main>
  );
}

export default App;
