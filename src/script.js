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
console.log(hour);

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

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  document.querySelector("#temp").innerHTML = fahrenheitTemperature;
}

function convertCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) * 0.5556;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
