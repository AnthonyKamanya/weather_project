const locationApi = 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json'
const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"

const searchBox =document.querySelector('.search input')
const searchButton =document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')


async function getLocation(location){
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`)
    const data = await response.json()
    const result = data.results[0]
    console.log(result)
    return {
        name: result.name || "",
        lat: result.latitude,
        lon: result.longitude
    }
}

async function checkWeather(location) {
    const {lat,lon,name} = await getLocation(location)
    console.log(name)
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
    const data = await response.json()
    console.log(data);   
    // Updating the text in the app
    document.querySelector(".city").innerHTML = name
    document.querySelector(".temp").innerHTML = Math.round(data.current.temperature_2m) + `${data.current_units.temperature_2m}`
    document.querySelector(".humidity").innerHTML = data.current.relative_humidity_2m + `${data.current_units.relative_humidity_2m}`
    document.querySelector(".wind").innerHTML = Math.round(data.current.wind_speed_10m) + ` ${data.current_units.wind_speed_10m}`
    
    // Updating image
    const weatherCondition = data.current.weather_code
    if(weatherCondition < 4){
        weatherIcon.src = "images/clear.png"
    }else if([51,53,55,56,57].includes(weatherCondition)){
        weatherCondition.src = "image/drizzle.png"
    }else if([61,63,65,66,67].includes(weatherCondition)){
        weatherCondition.src = "image/rain.png"
    }else if([71,73,75,76,77].includes(weatherCondition)){
        weatherCondition.src = "image/snow.png"
    }else if([95,96,99].includes(weatherCondition)){
        weatherCondition.src = "image/wind.png"
    }

    //Blocking the weather when there is no input
    document.querySelector(".weather").style.display = "block"
    
    }

searchButton.addEventListener("click",async e=>{
    e.preventDefault()
    checkWeather(searchBox.value)
})

