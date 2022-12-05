const geoAPI = {
    key: "f8459d37bbe627c3ff7547e9a64d219d",
    baseurl: "http://api.openweathermap.org/geo/1.0/direct?q="
}

const weatherAPI = {
    weatherKey:"f8459d37bbe627c3ff7547e9a64d219d",
    baseurl: "https://api.openweathermap.org/data/2.5/onecall?"
}

const cityEl = document.getElementById('city');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const citysearchEl = document.getElementById('city-sbox');
const searchbuttonEl = document.getElementById('search-btn');
const cityHistoryContainerEl = document.getElementsByClassName('city-card-container');
const FiveDayCards = document.getElementsByClassName('FiveDayCards');
const weatherHistoryArr = JSON.parse(localStorage.getItem('weatherHist')) || [];




function setQuery() {

    if(citysearchEl.value === ""){
        window.alert("Please input a city name");
    } else {

    const cityName = citysearchEl.value;
    fetch(geoAPI.baseurl + cityName + "&appid=" + geoAPI.key)
    .then((locationInfo) => locationInfo.json())
    .then((locationInfo) => {
        console.log(locationInfo);
        fetch(weatherAPI.baseurl + "lat=" + locationInfo[0].lat + "&lon=" + locationInfo[0].lon + "&exclude=hourly,minutely&units=imperial&appid="+weatherAPI.weatherKey)
        .then((weather) => weather.json())
        .then((weather) => {
            console.log(weather);
            cityEl.innerText = cityName + " Today";
            tempEl.innerText = weather.current.temp + "° F";
            humidityEl.innerText = weather.current.humidity + "%";

            //Five Day Forecast
            for(var i = 0; i < 5; i++) {
                if(i === 0 + i) {
                    FiveDayCards[i].querySelectorAll("h3")[0].textContent = (cityName + " " + (i+1) + " Day(s) Out");
                    FiveDayCards[i].querySelectorAll("div")[0].textContent = (weather.daily[i + 1].temp.day + "° F");
                    FiveDayCards[i].querySelectorAll("div")[1].textContent = (weather.daily[i + 1].humidity + "% Humidity");
                }
            }


        })
    })
   
    }


}


searchbuttonEl.addEventListener('click', setQuery);


