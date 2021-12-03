const cityTextInputEl = document.getElementById("city-text-input");
const submitBtnEl = document.getElementById("submit-button");
// const displaySearchResultsEl = document.getElementById("display-search-results");
// const currentDayForecastEl = document.getElementById('current-day-forecast');
// const fiveDayForecastResultsEls = document.getElementsByClassName('five-day-forecast-results');
// const fiveDayForecastEls = document.getElementsByClassName('five-day-forecast');

const APIKEY = '14396699e98c2a6c2a2fd6780d2fbba0';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';
const citySearchHistory = [];

function dateString(daysAdded) {
    return moment().add(daysAdded,'days').format('M/DD/YYYY');
}

// https://stackoverflow.com/a/40981298/6195136
// chain: https://openweathermap.org/api/one-call-api
function getCurrentDayForcastAPIData(city) {
    return fetch(`${BASE_URL}/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        const { coord, name, main, wind } = data;
        const today = dateString(0);
        // console.log(today);
        // console.log('currentDayForecast', data);
        const CDFPrimaryHeaderEl = document.querySelector('#current-day-forecast .city-name-data');
        const CDFTempDataEl = document.querySelector('#current-day-forecast .temp-data');
        const CDFWindDataEl = document.querySelector('#current-day-forecast .wind-data');
        const CDFhumidityDataEl = document.querySelector('#current-day-forecast .humidity-data');
        // const UvhumidityDataEl = document.querySelector('#current-day-forecast .uv-data');


        // console.log(CDFPrimaryHeaderEl);
        CDFPrimaryHeaderEl.textContent=`${name} ${today}`;
        CDFTempDataEl.textContent = `${main.temp}\u2109`;
        CDFWindDataEl.textContent = `${wind.speed} MPH`;
        CDFhumidityDataEl.textContent = `${main.humidity}\u0025`;
        // currentDayForecastEl.style.display = 'flex';
        
        return fetch(`${BASE_URL}/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,daily,alerts&appid=${APIKEY}`);
    })
    .then(response => response.json())
    .then(data => {
        const { current } = data;
    
        const currentDayForecastEl = document.querySelector('#current-day-forecast');
        const UvhumidityDataEl = document.querySelector('#current-day-forecast .uv-data');

        UvhumidityDataEl.textContent = `${current.uvi}`;
        currentDayForecastEl.style.display = 'flex';
    })
    .catch(function (error) {
        alert("Unable to connect to GitHub");
    });
  };

  function getFiveDayForcastAPIData(city) {
    return fetch(`${BASE_URL}/forecast?q=${city}&appid=${APIKEY}&units=imperial`)
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
        getCurrentDayForcastAPIData(city);
        getFiveDayForcastAPIData(city);
    }
}

submitBtnEl.addEventListener("click", searchCity);


