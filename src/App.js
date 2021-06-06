
import {useEffect, useState} from 'react'

import FadeLoader from "react-spinners/FadeLoader";
import WeatherSearchCard from './components/WeatherSearchCard'
import httpRequest from './helpers/httpRequest'
import {getErrorMessage, transformCurrentData, transformForecastData} from './helpers/utils'
import {CurrentDataDummy, ForecastDataDummy} from './DATA/dummy'
import './App.css';
import WeatherWidget from './components/WeatherWidget'



function App() {
  const [unit, setUnit] = useState('metric');
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loadingCurrentData, setLoadingCurrentData] = useState(true);
  const [loadingForecastData, setLoadingForecastData] = useState(true);
  const [error, setError] = useState(null)
  const fetchCurrentData = async (lat, long, city) =>{
    setLoadingCurrentData(true)
    // setCurrentData(transformCurrentData(CurrentDataDummy)) 
    const url = city ? 
    `${process.env.REACT_APP_API_URL}/weather?q=${city}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`:
    `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`
   
    try {
      const {data} = await httpRequest({url})
      setCurrentData(transformCurrentData(data))
      if(city){
        fetchForecastData(data.coord.lat, data.coord.lon)
      }
    } catch(error){
      const erroMsg = getErrorMessage(error)
      setError(erroMsg)
    } finally{
      setLoadingCurrentData(false)
    }
  }
  const fetchForecastData= async (lat, long) =>{
    setLoadingForecastData(true)
    // const transformedData = ForecastDataDummy.daily?.slice(0,7).map(item=>transformForecastData(item))
    // console.log({transformedData})
    
    const url = `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`
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
  }
  useEffect(()=>{
    const fetchData = async () =>{
      navigator.geolocation.getCurrentPosition(function(position) {
        const {latitude, longitude} = position.coords
        fetchCurrentData(latitude, longitude)
        fetchForecastData(latitude, longitude)
      });
    }
    fetchData()
  }, [])
  const searchHandler = (location) =>{
    if(location && location.trim()){
      fetchCurrentData(null, null, location)
    }
  }
  if(loadingCurrentData && loadingForecastData){
    return <div className="loading">
        <FadeLoader color='white' loading={true} size={250} />
    </div>
  }
  return (
    <main className="app__container">
      <WeatherSearchCard searchHandler={searchHandler}/>
      {!error && forecastData && currentData?
      <WeatherWidget 
      currentData={currentData}
      forecastData={forecastData}
      />:
      <p>{error}. Please try again</p> }
    </main>
  );
}

export default App;
