const apiKey = "e615052850b5398fba2a19d0f7e1394b";
const apiCountry = "https://www.countryflagicons.com/SHINY/64/";

const cityInput = document.querySelector("#city-input");
const btnSearch = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const iconWeatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async (city) => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const res = await fetch(apiWeatherUrl);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  try {
    const data = await getWeatherData(city);

    if (data.cod === "404") {
      throw new Error("Cidade não encontrada");
    }

    // Remover mensagem de erro, se existir
    const errorContainer = document.querySelector(".error-container");
    if (errorContainer) {
      errorContainer.remove();
    }

    // Remover dados da cidade anterior
    clearWeatherData();

    // Exibir os novos dados
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp - 273.15);
    descElement.innerText = data.weather[0].description;
    iconWeatherElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountry + data.sys.country + ".png");
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
  } catch (error) {
    console.error(error);
    showError("Não foi possível encontrar o clima da cidade com esse nome.");

    // Remover dados da cidade anterior
    clearWeatherData();
  }
};

const showError = (message) => {
  let errorContainer = document.querySelector(".error-container");

  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");
    weatherContainer.appendChild(errorContainer);
  }

  errorContainer.innerHTML = ""; // Limpar conteúdo existente

  const errorElement = document.createElement("p");
  errorElement.innerText = message;

  errorContainer.appendChild(errorElement);
};

const clearWeatherData = () => {
  cityElement.innerText = "";
  tempElement.innerText = "";
  descElement.innerText = "";
  iconWeatherElement.setAttribute("src", "");
  countryElement.setAttribute("src", "");
  humidityElement.innerText = "";
  windElement.innerText = "";
};

// Eventos
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
