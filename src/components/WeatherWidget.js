import WeatherInfoCard from "./WeatherInfoCard"
import WeatherForecastCard from "./WeatherForecastCard"
const WeatherWidget = ({currentData, forecastData}) =>{
    return (
        <div className="widgetBanner">
            <WeatherInfoCard {...currentData}/>
            <WeatherForecastCard forecastData={forecastData}/>
        </div>
    )
}
export default WeatherWidget