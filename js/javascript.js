const apiKey = "e615052850b5398fba2a19d0f7e1394b";
const apiCountry = "https://www.countryflagicons.com/SHINY/64/";

const cityInput = document.querySelector("#city-input");
const btnSearch = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const iconWatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

//funçoes
const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const res = await fetch(apiWeatherUrl)
    const data = await res.json();

   return data

}


const showWeatherData = async (city) => {
 const data =  await getWeatherData(city)

 cityElement.innerText = data.name;
 tempElement.innerText  = parseInt(data.main.temp);
 descElement.innerText  = data.weather[0].description;
 iconWatherElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
 countryElement.setAttribute("src", apiCountry + data.sys.country)
 humidityElement.innerText = `${data.main.humidity}%`
 windElement.innerText = `${data.wind.speed}km/h`
};
// Events

btnSearch.addEventListener("click", (e) => {

    e.preventDefault()
    const city = cityInput.value;


    showWeatherData(city);

})