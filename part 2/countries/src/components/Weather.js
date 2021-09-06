import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather =({city})=>{
  const API_KEY=process.env.REACT_APP_API_KEY
  useEffect( ()=>{
    axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`)
    .then(response=>{
      console.log("fulfilled")
      setTemperature(response.data.current)
      console.log(temperature)
    })
    .catch(error => console.log(error));
  },[city,API_KEY])
  const [temperature, setTemperature] = useState('')
    return(
        <div>
            <h3>Weather in {city}</h3>
            <p><strong>temperature </strong>is {temperature.temperature}°C (feels like: {temperature.feelslike}°C)</p>
            <img src={temperature.weather_icons} alt={'wind'}height="125" widht="125"></img> 
           <p>weather is {temperature.weather_descriptions}</p>
            <p><strong>wind</strong> {temperature.wind_speed} mph direction {temperature.wind_dir}</p>
        </div>
    )
}


export default Weather;