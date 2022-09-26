let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let h5 = document.querySelector("h5");
h5.innerHTML = `${day} ${now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}`;

let hour = now.getHours();
if (hour >= 5 && hour <= 11) {
  document.querySelector("h1").innerHTML = `Good Morning`;
}
if (hour >= 12 && hour <= 17) {
  document.querySelector("h1").innerHTML = `Good Afternoon`;
}
if (hour <= 4 || hour >= 18) {
  document.querySelector("h1").innerHTML = `Good Evening`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function fiveDayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6)
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="nextOne"> 
              ${formatDay(forecastDay.dt)}
              <div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="weather icon" width="40"/>
              </div>
  <div><strong>High ${Math.round(forecastDay.temp.max)}°F</strong></div>
            <div>Low ${Math.round(forecastDay.temp.min)}°F</div>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showForecast(coordinates) {
  let apiKey = `62bc298785543e137bc6756e514eb1c3`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(fiveDayForecast);
}

function showCurrentWeather(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country} `;
  document.querySelector("#temp").innerHTML = `Currently ${Math.round(
    response.data.main.temp
  )}°F`;
  document.querySelector("h4").innerHTML = `${
    response.data.weather[0].main
  } | Wind Speed: ${Math.round(response.data.wind.speed)} mph`;

  let todayEmojiElement = document.querySelector("#todayEmoji");
  todayEmojiElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("h6").innerHTML = `H: ${Math.round(
    response.data.main.temp_max
  )}° | L: ${Math.round(response.data.main.temp_min)}°`;

  fahrenheitTemperature = Math.round(response.data.main.temp);

  showForecast(response.data.coord);
}

function citySearch(event) {
  event.preventDefault();
  let apiKey = `5ee080a084160ec534f65b526b1fa3f4`;
  let city = document.querySelector("#local-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let localForm = document.querySelector("#local-form");
localForm.addEventListener("submit", citySearch);
