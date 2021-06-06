import {useState} from 'react'

const WeatherSearchCard = ({searchHandler}) =>{
    const [location, setLocation] = useState('')
    return (
        <section className="d-flex margin__bottom-2rem">
             <input type="text"
                className="custom__input"
                aria-label="Search Weather by location"
                value={location} 
                name="location"
                onChange={(e)=>setLocation(e.target.value)}
                placeholder="Search Weather by location"/>
             <button type="button" className="custom__button" onClick={()=>searchHandler(location)}>Search</button>
        </section>
    )
}

export default WeatherSearchCard