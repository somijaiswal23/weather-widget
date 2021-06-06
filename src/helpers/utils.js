/***Error message formation ***/
export const getErrorMessage = (error)=>{
    if(!error){
        return null
    } else if (error.body && typeof error.body.message === 'string'){
        return error.body.message
    } else if (typeof error.message === 'string'){
        return error.message
    } else {
        return error.statusText
    }
}

/***Transform Current Location Data***/

export const transformCurrentData = (data)=>{
    if(!data) return null
    return {
        dt: data.dt,
        name:data.name,
        temp:data.main.temp,
        temp_min: data.main?.temp_min,
        temp_max: data.main?.temp_max,
        humidity: data.main?.humidity,
        icon: data.weather[0]?.icon,
        desc: data.weather[0]?.description,
        clouds: data.clouds?.all,
        wind: data.wind?.speed,
      }
}

/***Transform forecast Location Data***/

export const transformForecastData = (data)=>{
    if(!data) return null
    return {
        dt: data.dt,
        temp_min: data.temp?.min,
        temp_max: data.temp?.max,
        humidity: data.humidity,
        icon: data.weather[0]?.icon,
        desc: data.weather[0]?.description,
        clouds: data.clouds,
        wind: data.wind_speed,
      }
}
