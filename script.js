let temp = document.querySelector(".temp");
let cityElement = document.querySelector(".city");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let userInput = document.querySelector(".search input");
let searchBox = document.querySelector(".search button");
let icon = document.querySelector(".icon i");

let KEY = "N4X5YWV8EDM68G9RM5LB6S9DS";
let URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";


let getWeatherData = async () => {
  let city = userInput.value.trim(); 

 
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  try {
    let response = await fetch(
      `${URL}/${city}/today?unitGroup=metric&key=${KEY}&contentType=json`
    );

    let result = await response.json();
    console.log(result);

    cityElement.textContent = `${result.address}`;
    temp.textContent = `${result.days[0].temp}°C`;
    wind.textContent = `${result.days[0].windspeed} kph`;
    humidity.textContent = `${result.days[0].humidity} %`;

    let condition = result.days[0].conditions.toLowerCase();
    updateWeatheIcon(condition);

    userInput.value = ""; 
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(
      "Unable to fetch data for the entered city. Please check the city name and try again."
    );
  }
};


let updateWeatheIcon = (condition) => {
  if (condition.includes("cloud")) {
    icon.className = "fa-solid fa-cloud";
  } else if (condition.includes("rain")) {
    icon.className = "fa-solid fa-cloud-showers-heavy";
  } else if (condition.includes("clear") || condition.includes("sun")) {
    icon.className = "fa-regular fa-sun";
  } else if (condition.includes("snow")) {
    icon.className = "fa-regular fa-snowflake";
  } else if (condition.includes("thunder")) {
    icon.className = "fa-solid fa-cloud-bolt";
  } else {
    icon.className = "fa-solid fa-cloud";
  }
};

searchBox.addEventListener("click", getWeatherData);

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeatherData();
  }
});