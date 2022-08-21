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
h5.innerHTML = `${day} ${now.toLocaleTimeString()}`;

function showCurrentWeather(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country} `;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
}

function citySearch(event) {
  event.preventDefault();
  let apiKey = `5ee080a084160ec534f65b526b1fa3f4`;
  let city = document.querySelector("#local-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  //https://api.openweathermap.org/data/2.5/weather?q=$las vegas&appid=5ee080a084160ec534f65b526b1fa3f4&units=imperial
  axios.get(apiUrl).then(showCurrentWeather);
}

let localForm = document.querySelector("#local-form");
localForm.addEventListener("submit", citySearch);

function convertFahrenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  tempDisplay.innerHTML = "42°";
}

function convertCelsius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp");
  tempDisplay.innerHTML = `108°`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertFahrenheit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertCelsius);
