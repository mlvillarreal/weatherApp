let newCityGo = document.querySelector('#goBtn');
let newCityInput = document.querySelector('#city-input');
let weatherContainer = document.querySelector('#weather-container');
let myWeatherBtn = document.querySelector('#myWeather');
 


newCityGo.addEventListener('click', async () => { 
    let selectedCity = newCityInput.value;
    // console.log(selectedCity);
    let weatherInfo = await getWeatherStatus(selectedCity);
    if (weatherInfo.cod!=200) {
        let message = createErrorCardHtml(weatherInfo.message, weatherInfo.cod);
        weatherContainer.innerHTML = message;
    }
    else{
        let cityName = weatherInfo.name;
        let cityCountry = weatherInfo.sys.country;
        let temperature = weatherInfo.main.temp;
        let ST = weatherInfo.main.feels_like;
        let description = weatherInfo.weather[0].description;
        const cardHtml = createCardHtml(cityName, cityCountry, temperature, ST, description );
        weatherContainer.innerHTML = cardHtml;
    };
});

async function getWeatherStatus(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74cf9aad542ba0362b638cca56523499&units=metric`);
        
    const weather = await response.json();
    return weather;

};

const createCardHtml = (city, country, temperature, ST, description) => {
    img = weatherImage(description)
    let weatherCard = `
    <div class=" text-center card  mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src=${img} class="card-img mt-4" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${city}, ${country}</h5>
                    <p class="card-text">The temperature is ${temperature}°C, and it feels like ${ST}°C</p>
                    <p class="card-text">The weather is: ${description}</p>
                </div>
            </div>
        </div>
    </div>`
    return weatherCard;
}

const createErrorCardHtml = (message, code) => {
    let weatherErrorCard = `
    <div class="card bg-light mb-3">
        <div class="card-body">
            <h2 class="card-title text-center">Oops!</h3>
            <h4 class="card-text">${message}</h4>
            <p class="card-text text-muted">Error code: ${code}</p>
        </div>
        <img src="./images/undraw_warning_cyit.png" class="card-img-bottom" alt="...">
    </div>`
    return weatherErrorCard;
}
let weatherImage = (description) => {
    if (description.includes("rain")){
        let img = "./images/undraw_Raining_re_4b55.png"
        return img;
    }
    else if (description.includes("cloud")){
        let img = "./images/undraw_i_can_fly_7egl.png"
        return img;
    }
    else if (description.includes("snow")){
        let img = "./images/undraw_snow_games_ohkc.png"
        return img;
    }
    else if (description.includes("clear")){
        let img = "./images/undraw_sunny_day_bk3m.png"
        return img;
    }
    else {
        let img = "./images/undraw_Weather_app_re_kcb1.png"
        return img;
    }

}


myWeatherBtn.addEventListener('click', myWeather);

async function myWeather() {
    const status = document.querySelector('#status');
    // const mapLink = document.querySelector('#map-link');
    // let coordinates;
  
    // mapLink.href = '';
    // mapLink.textContent = '';
  
    async function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        // let coordinates = [latitude, longitude]; 
  
        status.textContent = '';
    //   mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    //   mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        let weatherInfo = await getWeatherStatusCoord(latitude, longitude);
        if (weatherInfo.cod!=200) {
            let message = createErrorCardHtml(weatherInfo.message, weatherInfo.cod);
            weatherContainer.innerHTML = message;
        }
        else{
            let cityName = weatherInfo.name;
            let cityCountry = weatherInfo.sys.country;
            let temperature = weatherInfo.main.temp;
            let ST = weatherInfo.main.feels_like;
            let description = weatherInfo.weather[0].description;
            const cardHtml = createCardHtml(cityName, cityCountry, temperature, ST, description );
            weatherContainer.innerHTML = cardHtml;
        };
      
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } 
    else {
      status.textContent = 'Locating…';
      coordinates = navigator.geolocation.getCurrentPosition(success, error);
    }    
  
};
  
async function getWeatherStatusCoord(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=1&appid=74cf9aad542ba0362b638cca56523499&units=metric`);    
    const weather = await response.json();
    return weather;

};

  
  