// For Day and Time
let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let d = now.getDate();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = days[now.getDay()];
let hrTime = now.getHours();
let minutes = now.getMinutes();
document.querySelector(".day").innerHTML = `${day}`;
document.querySelector(".time").innerHTML = `${hrTime}:${minutes}`;
document.querySelector(".date").innerHTML = `${month} / ${d} / ${year}`;


// Displays all changes after submit
function showTemperature(response) {
    document.querySelector("#cityName").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector(
        "#humi"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
        response.data.wind.speed
    )} km/hr`;
    document.querySelector("#condition").innerHTML = response.data.weather[0].description;
    document.querySelector("#iconOne").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function showForecast(response) {
    console.log(response.data)
}


function valueToDisplay(result) {
    let apiKey = "ef30aa9056a9ed9d86308d59509e7ff4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${result}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function pointy(event) {
    event.preventDefault();
    let result = document.querySelector("#city-input").value;
    valueToDisplay(result);
}

let citySearchButton = document.querySelector("#search-form");
citySearchButton.addEventListener("submit", pointy);


// submit current location
function myLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "ef30aa9056a9ed9d86308d59509e7ff4";
    let locApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(locApi).then(showTemperature);
}
function locButton(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myLocation);
}

let loc = document.querySelector("#currentPlace");
loc.addEventListener("click", locButton);


// Convert Celsius to Fahrenheit!!
function fahren(event) {
    event.preventDefault();
    let selectFah = document.querySelector("#temp")
    cels.classList.remove("active");
    fah.classList.add("active");
    let convertResult = (selectFah.innerHTML * 9) / 5 + 32;
    selectFah.innerHTML = Math.round(convertResult);
}

let fah = document.querySelector("#fahrenheit-link")
fah.addEventListener("click", fahren);


// Convert Fahrenheit to Celsius!!
function cells(event) {
    event.preventDefault();
    let selectCels = document.querySelector("#temp")
    fah.classList.remove("active")
    cels.classList.add("active")
    let convertBack = (selectCels.innerHTML - 32) * 5 / 9;
    selectCels.innerHTML = Math.round(convertBack);
}

let cels = document.querySelector("#celsius-link")
cels.addEventListener("click", cells);

valueToDisplay("Toronto");

// Math.round(((temperature - 32) * 5) / 9);