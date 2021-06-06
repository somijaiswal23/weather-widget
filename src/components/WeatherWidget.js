import WeatherInfoCard from "./WeatherInfoCard"
import WeatherForecastCard from "./WeatherForecastCard"
const WeatherWidget = ({currentData, forecastData, unit, unitHandler}) =>{
    return (
        <div className="widgetBanner">
            <WeatherInfoCard {...currentData}  unit={unit} unitHandler={unitHandler}/>
            <WeatherForecastCard forecastData={forecastData}/>
        </div>
    )
}
export default WeatherWidget