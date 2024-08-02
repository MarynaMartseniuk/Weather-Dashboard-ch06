//input data
const userCityInput = document.querySelector('#search');
const searchBtn = document.querySelector('#searchButton');

//out data
const todayWeatherOutput = document.querySelector('#weather-one');
const cityHistoryOutput = document.querySelector('#city-history');

//other data
const APIKey = "f90bd61111a2ccd2c7a31a9e922d2b77";
var citiesList = JSON.parse(localStorage.getItem("city")) || [];
var addNewCity = {};

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    localStorage.removeItem('city');

    //work with a Local Storage
    if (userCityInput.value) {

        //get weather fot today

        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput.value}&appid=${APIKey}`;

        fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

             //source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_removechild_while
            while (todayWeatherOutput.hasChildNodes()) {
                todayWeatherOutput.removeChild(todayWeatherOutput.firstChild);
            };

            weatherTodayCard = document.createElement('div');

            weatherTodayCity = document.createElement('p');

            weatherTodayTemp = document.createElement('p');

            weatherTodayWind = document.createElement('p');

            weatherTodayHumdt = document.createElement('p');


            weatherTodayCity.textContent = `${data.name}, ${data.sys.country}`;
            weatherTodayTemp.textContent = `Temp: ${data.main.temp} F`;
            weatherTodayWind.textContent = `Wind: ${data.wind.speed} MPH`;
            weatherTodayHumdt.textContent = `Humidity: ${data.main.humidity} %`;
        
            weatherTodayCard.append(weatherTodayCity, weatherTodayTemp, weatherTodayWind, weatherTodayHumdt);
            todayWeatherOutput.appendChild(weatherTodayCard);

        }); 

        // save data to Local Storage
        addNewCity =  {
            cityName: userCityInput.value,
        };
    
        citiesList.push(addNewCity);
    
        localStorage.setItem("city", JSON.stringify(citiesList));
    
        userCityInput.value = "";

        // display data from Local Storage
        // to sure of what cities are stored in LocalStorage, get list of cities from Local Storage and then display it
        let getCitiesList = JSON.parse(localStorage.getItem("city"));
        console.log(getCitiesList);

        //source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_removechild_while
        while (cityHistoryOutput.hasChildNodes()) {
            cityHistoryOutput.removeChild(cityHistoryOutput.firstChild);
          };

        for (let i = 0; i < getCitiesList.length; i++) {
            cityCard = document.createElement('div');
            cityCard.style.border = 'none';
            cityCard.style.borderRadius = '4px';
            cityCard.style.margin = '0px';
            cityCard.style.backgroundColor = 'var(--grey)';


            cityTitle = document.createElement('p');
            cityTitle.style.fontStyle = 'italic';
            cityTitle.style.marginTop = '5px';
            cityTitle.style.padding = '5px';
            cityTitle.style.width = '100%';

            cityTitle.textContent = getCitiesList[i].cityName;

            cityCard.appendChild(cityTitle);
            cityHistoryOutput.appendChild(cityCard);

        }

    } else {
        alert("Please, fill in a city name!");
    };

});