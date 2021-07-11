import moment from 'moment';
import React from 'react';

const IMPERIAL = 'imperial'
const METRIC = 'metric'
const WeatherInfoCard = ({name, dt, desc, icon, temp, clouds, humidity, wind, unit, unitHandler}) =>{
    const dateTime = moment(dt * 1000).format('dddd, MMMM Do')
    return(<section className="margin__bottom-2rem" aria-labelledby="widgetTitle" aria-describedby="widgetDesc">
        <h1 id="widgetTitle" className="infocard__header text__dark_grey">{name}</h1>
        <div className="font--14px text__light_grey" title={dateTime}>{dateTime}</div>
        <div className="font--14px text__light_grey" title={desc}>{desc}</div>
        <div className="d-flex">
            <div className="d-flex">
                <img src={`${process.env.REACT_APP_ICON_URL}/${icon}@2x.png`} alt={desc}/>
                <div className="font--40px text__dark_grey"> {Math.round(temp)} 
                    <sup onClick={()=>unitHandler(METRIC)}className={`font--24px cursor ${unit === 'metric' && 'infocard__active'}`} role="link">°C</sup> 
                    <sup>|</sup> 
                    <sup  onClick={()=>unitHandler(IMPERIAL)} role="link" className={`font--24px cursor ${unit !== 'metric' && 'infocard__active'}`}>°F</sup>
                </div>
            </div>
            <div className="font--14px margin__auto text__light_grey">
                <div><strong className="text__dark_grey">Clouds: </strong>{clouds}% </div>
                <div><strong className="text__dark_grey">Humidity: </strong>{humidity}% </div>
                <div><strong className="text__dark_grey">Wind: </strong>{wind}m/s </div>
            </div>
        </div>
        <div id="widgetDesc" className="sr-only">Weather in {name} on {dateTime} is {Math.round(temp)} and looks like {desc}</div>
    </section>)
}

export default WeatherInfoCard