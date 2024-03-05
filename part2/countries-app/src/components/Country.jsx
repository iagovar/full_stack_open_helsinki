import { useState, useEffect } from 'react'

export default function Country({country}) {
    
    const [weatherData, setWeatherData] = useState(null);
    const [weatherImage, setWeatherImage] = useState(null);

    useEffect(() => {
            // Fetching weather data
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[0]}&current_weather=true`)
            .then(response => response.json())
            .then(body => {
                setWeatherData(body);
                setWeatherImage(getImage(body.current_weather.weathercode, body.current_weather.is_day));
            });
        }, [country])

    function getImage(code, is_day) {
        let dayString;
        let wmoCode;
        if (is_day == 1) {dayString = "d"} else {dayString = "n"};

        // Check if a code is a single digit and puts a 0 in front
        if (code < 10) {wmoCode = `0${code}`} else {wmoCode = `${code}`};
        if (wmoCode == "00") {wmoCode = "01"};

        return `http://openweathermap.org/img/wn/${wmoCode}${dayString}@2x.png`
    }

    return (
        <div>
            <div>Country: {country.name.common}</div>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area} Km2</div>
            <div>Languages: <br></br> <ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul></div>
            <div><img src={country.flags.svg} /></div>
            <br /><br />
            <div>Temperature: {weatherData && weatherData.current_weather && weatherData.current_weather.temperature} Celsius</div>
            <div>Wind: {weatherData && weatherData.current_weather && weatherData.current_weather.windspeed} Km/h</div>
            <div>Weather: <img src={weatherImage ? weatherImage : console.log("No weather image yet")}/></div>
        </div>
    )
}