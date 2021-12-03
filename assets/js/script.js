const cityTextInputEl = document.getElementById("city-text-input");
const submitBtnEl = document.getElementById("submit-button");
// const displaySearchResultsEl = document.getElementById("display-search-results");
// const currentDayForecastEl = document.getElementById('current-day-forecast');
// const fiveDayForecastResultsEls = document.getElementsByClassName('five-day-forecast-results');
// const fiveDayForecastEls = document.getElementsByClassName('five-day-forecast');

const APIKEY = '14396699e98c2a6c2a2fd6780d2fbba0';
const citySearchHistory = [];

function getCurrentDayForcastAPIData(apiURL) {
    return fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const { name, main, wind } = data;
        // console.log('currentDayForecast', data);
        const currentDayForecastEl = document.querySelector('#current-day-forecast');
        const CDFPrimaryHeaderEl = document.querySelector('#current-day-forecast .city-name-data');
        const CDFTempDataEl = document.querySelector('#current-day-forecast .temp-data');
        const CDFWindDataEl = document.querySelector('#current-day-forecast .wind-data');
        const CDFhumidityDataEl = document.querySelector('#current-day-forecast .humidity-data');
        const UvhumidityDataEl = document.querySelector('#current-day-forecast .uv-data');


        // CDFPrimaryHeaderEl.textContent(`${} `);
        currentDayForecastEl.style.display = 'flex';
        
    })
    .catch(function (error) {
        alert("Unable to connect to GitHub");
    });
  };

  function getFiveDayForcastAPIData(apiURL) {
    return fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const fiveDayForecastResultsEls = document.getElementsByClassName('five-day-forecast-results');
        const fiveDayForecastCardEls = document.getElementsByClassName('five-day-forecast');
        console.log('fiveDayForecastResultsEl', data);

        // map through fiveDayForecastCardEls and api data display in Els

        // map through fiveDayForecastResultsEls and display flex
        for(const fiveDayForecastResultsEl of fiveDayForecastResultsEls) {
            fiveDayForecastResultsEl.style.display = 'flex';
        }
    })
    .catch(function (error) {
        alert("Unable to connect to GitHub");
    });
  };

function searchCity(event) {
    const city = cityTextInputEl.value;
    event.preventDefault();

    if (city) {
        getCurrentDayForcastAPIData(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`);
        getFiveDayForcastAPIData(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=imperial`);
    }
}

submitBtnEl.addEventListener("click", searchCity);


