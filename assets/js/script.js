const cityTextInputEl = document.getElementById("city-text-input");
const submitBtnEl = document.getElementById("submit-button");
// const displaySearchResultsEl = document.getElementById("display-search-results");
// const currentDayForecastEl = document.getElementById('current-day-forecast');
// const fiveDayForecastResultsEls = document.getElementsByClassName('five-day-forecast-results');
// const fiveDayForecastEls = document.getElementsByClassName('five-day-forecast');

const APIKEY = '14396699e98c2a6c2a2fd6780d2fbba0';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';
const citySearchHistory = [];

// https://stackoverflow.com/a/40981298/6195136
// chain: https://openweathermap.org/api/one-call-api
function getCurrentDayForcastAPIData(city) {
    return fetch(`${BASE_URL}/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        const { coord, name, main, wind } = data;
        console.log('data 1', data);
        const today = moment().format('M/DD/YYYY');;
        const CDFPrimaryHeaderEl = document.querySelector('#current-day-forecast .city-name-data');
        const CDFTempDataEl = document.querySelector('#current-day-forecast .temp-data');
        const CDFWindDataEl = document.querySelector('#current-day-forecast .wind-data');
        const CDFhumidityDataEl = document.querySelector('#current-day-forecast .humidity-data');

        CDFPrimaryHeaderEl.textContent=`${name} ${today}`;
        CDFTempDataEl.textContent = `${main.temp}\u2109`;
        CDFWindDataEl.textContent = `${wind.speed} MPH`;
        CDFhumidityDataEl.textContent = `${main.humidity}\u0025`;
        
        return fetch(`${BASE_URL}/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&appid=${APIKEY}`);
    })
    .then(response => response.json())
    .then(data => {

        const { current, daily } = data;

        const fiveDayForecastResultsEls = document.getElementsByClassName('five-day-forecast-results');
        const fiveDayForecastContainer = document.getElementById('five-day-forecast-container');
        const currentDayForecastEl = document.querySelector('#current-day-forecast');
        const UvhumidityDataEl = document.querySelector('#current-day-forecast .uv-data');

        UvhumidityDataEl.textContent = `${current.uvi}`;
        currentDayForecastEl.style.display = 'flex';


        // get Five Day Forcast
        console.log('daily 2', daily[0]);
        const fiveDayForcast = daily.splice(1,6);
        
        console.log('fiveDayForcast', fiveDayForcast);
        fiveDayForcast.forEach(element => {
            console.log('DTTT',moment.unix(element.dt).format("MM/DD/YYYY"));

            // append HTML block to this element fiveDayForecastResultsEls
            const sectionEl = document.createElement('section');
            sectionEl.setAttribute('class', 'col-lg-2 mb-3 mb-lg-0 five-day-forecast');
            sectionEl.innerHTML = `<h2 class="my-3 mb-4 secondary-header city-name-data"></h2>
            <p class="mb-4">Temp: <span class="temp-data"></span></p>
            <p class="mb-4">Wind: <span class="wind-data"></span></p>
            <p class="mb-4">Humidity: <span class="humidity-data"></span></p>`;
            fiveDayForecastContainer.appendChild(sectionEl);
        });

        for (const fiveDayForecastResultsEl of fiveDayForecastResultsEls) {
            // map through fiveDayForecastResultsEls and display flex
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
        // getFiveDayForcastAPIData(city);
    }
}

submitBtnEl.addEventListener("click", searchCity);


