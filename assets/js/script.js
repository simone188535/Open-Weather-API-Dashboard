const cityTextInputEl = document.getElementById("city-text-input");
const submitBtnEl = document.getElementById("submit-button");
const APIKEY = "14396699e98c2a6c2a2fd6780d2fbba0";
const BASE_URL = "http://api.openweathermap.org/data/2.5";
const citySearchHistory = 
  localStorage.getItem("city-search-history") || [];

function getCurrentDayForcastAPIData(city) {
  return fetch(`${BASE_URL}/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
      const { coord, name, main, wind } = data;

      const today = moment().format("M/DD/YYYY");
      const CDFPrimaryHeaderEl = document.querySelector(
        "#current-day-forecast .city-name-data"
      );
      const CDFTempDataEl = document.querySelector(
        "#current-day-forecast .temp-data"
      );
      const CDFWindDataEl = document.querySelector(
        "#current-day-forecast .wind-data"
      );
      const CDFhumidityDataEl = document.querySelector(
        "#current-day-forecast .humidity-data"
      );

      CDFPrimaryHeaderEl.textContent = `${name} ${today}`;
      CDFTempDataEl.textContent = `${main.temp}\u2109`;
      CDFWindDataEl.textContent = `${wind.speed} MPH`;
      CDFhumidityDataEl.textContent = `${main.humidity}\u0025`;

      return fetch(
        `${BASE_URL}/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&appid=${APIKEY}`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      const { current, daily } = data;

      const fiveDayForecastResultsEls = document.getElementsByClassName(
        "five-day-forecast-results"
      );
      const fiveDayForecastContainer = document.getElementById(
        "five-day-forecast-container"
      );
      const currentDayForecastEl = document.getElementById(
        "current-day-forecast"
      );
      const UvhumidityDataEl = document.querySelector(
        "#current-day-forecast .uv-data"
      );

      UvhumidityDataEl.textContent = `${current.uvi}`;
      currentDayForecastEl.style.display = "flex";

      // get Five Day Forcast
      const fiveDayForcast = daily.splice(1, 5);

      // remove clear five dsy forcast
      fiveDayForecastContainer.innerHTML = "";
      // iteratively show five day forcast
      fiveDayForcast.forEach((singleDayForcast) => {
        const { dt, temp, wind_speed, humidity } = singleDayForcast;
        const FCDate = moment.unix(dt).format("MM/DD/YYYY");

        // append HTML block to this element fiveDayForecastResultsEls
        const sectionEl = document.createElement("section");
        sectionEl.setAttribute(
          "class",
          "col-lg-2 mb-3 mb-lg-0 ml-lg-1 text-center text-lg-left five-day-forecast"
        );
        sectionEl.innerHTML = `<h2 class="my-3 mb-4 tertiary-header city-name-data">${FCDate}</h2>
            <p class="mb-4">Temp: <span class="temp-data">${temp.day}\u2109</span></p>
            <p class="mb-4">Wind: <span class="wind-data">${wind_speed} MPH</span></p>
            <p class="mb-4">Humidity: <span class="humidity-data">${humidity}\u0025</span></p>`;
        fiveDayForecastContainer.appendChild(sectionEl);
      });

      for (const fiveDayForecastResultsEl of fiveDayForecastResultsEls) {
        // map through fiveDayForecastResultsEls and display flex
        fiveDayForecastResultsEl.style.display = "flex";
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
}


function addNewSearchElement(city) {
    const SearchHistoryEl = document.getElementById("search-history");
    const listItem = document.createElement('li');
    listItem.innerHTML = `<button class="w-100 btn mb-3 text-dark search-history-btn">${city}</button>`;

    SearchHistoryEl.insertAdjacentElement('afterbegin', listItem);
}

function displaySearchHistory() {
    
  if (citySearchHistory.length > 0) {
    const parsedCitySearchHistory = JSON.parse(citySearchHistory);
    parsedCitySearchHistory.forEach((city) =>addNewSearchElement(city)); 
  }
}

function searchCity(event) {
  const city = cityTextInputEl.value.toLowerCase();
  event.preventDefault();

  // if city has a value Display search result and save city in local storage so that can be mapped through
  if (city) {
    getCurrentDayForcastAPIData(city);

    if (!citySearchHistory.includes(city)) {

      citySearchHistory.push(city);
      localStorage.setItem(
        "city-search-history",
        JSON.stringify(citySearchHistory)
      );
      addNewSearchElement(city);
    }
  }
}

displaySearchHistory();
submitBtnEl.addEventListener("click", searchCity);
