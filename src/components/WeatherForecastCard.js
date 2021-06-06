import moment from 'moment'

/***This component create the tile for each day ***/
const WeatherTile = (props) =>{
    const {desc, dt, icon, temp_max, temp_min } = props.data
    const day = props.index === 0? 'Today' :moment(dt * 1000).format('dddd')
    return <div className="forecastcard__tile" tabIndex="0">
        <div><strong>{day}</strong></div>
        <div><img src={`${process.env.REACT_APP_ICON_URL}/${icon}@2x.png`} alt={`${day} ${desc}`}/></div>
        <div className="font--18px">
            <span className="text__dark_grey">{Math.round(temp_max)}<sup>°</sup></span>{' '}
            <span className="text__light_grey">{Math.round(temp_min)}<sup>°</sup></span>
        </div>
    </div>
}
/***This component create the card that contains the tiles for all days ***/
const WeatherForecastCard = ({forecastData=[]}) =>{
    return (
        <section className="d-flex flex-wrap justify-content-space-between">
            {forecastData.map((item, index)=><WeatherTile data={item} index={index} key={item.dt}/>)}
        </section>
    )
}

export default WeatherForecastCard