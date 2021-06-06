import moment from 'moment'
const WeatherInfoCard = ({name, dt, desc, icon, temp, clouds, humidity, wind}) =>{
    const dateTime = moment(dt * 1000).format('dddd, MMMM Do')
    return(<section className="margin__bottom-2rem" aria-labelledby="widgetTitle" aria-describedby="widgetDesc">
        <h1 id="widgetTitle" className="infocard__header text__dark_grey">{name}</h1>
        <div className="font--14px text__light_grey">{dateTime}</div>
        <div className="font--14px text__light_grey">{desc}</div>
        <div className="d-flex">
            <div className="d-flex">
                <img src={`${process.env.REACT_APP_ICON_URL}/${icon}@2x.png`} alt={desc}/>
                <div className="font--40px text__dark_grey"> {Math.round(temp)} <sup className="font--24px">°C</sup></div>
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

// clouds: 75
// desc: "broken clouds"
// dt: 1622972916
// humidity: 86
// icon: "04n"
// temp_max: 13.4
// temp_min: 10.7
// wind: 3.13
// name:'Melbourne'
export default WeatherInfoCard