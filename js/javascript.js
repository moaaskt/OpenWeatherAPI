const apiKey = "e615052850b5398fba2a19d0f7e1394b";
const apiCountry = "https://flagsapi.com/br/BE/shiny/";

const cityInput = document.querySelector("#city-input");
const btnSearch = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const iconWatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

//funçoes
const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const res = await fetch(apiWeatherUrl)
    const data = await res.json();

    console.log(data);

}


const showWeatherData = (city) => {
    getWeatherData(city)
};


// Events

btnSearch.addEventListener("click", (e) => {

    e.preventDefault()
    const city = cityInput.value;


    showWeatherData(city);

})