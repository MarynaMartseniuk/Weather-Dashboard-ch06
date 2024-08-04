//input data
const userCityInput = document.querySelector('#search');
const searchBtn = document.querySelector('#searchButton');

//out data
const todayWeatherOutput = document.querySelector('#weather-one');
const fiveWeatherOutput = document.querySelector('#weather-five-display');
const cityHistoryOutput = document.querySelector('#city-history');

//other data
const APIKey = "f90bd61111a2ccd2c7a31a9e922d2b77";
var citiesList = JSON.parse(localStorage.getItem("city")) || [];
var addNewCity = {};

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    localStorage.removeItem('city');

    if (userCityInput.value) {

        //get weather for today

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
            weatherTodayCity.style.fontWeight = '700';

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

        //get weather for next 5 days

        let coordinatesURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCityInput.value}&limit=1&appid=${APIKey}`;

        fetch(coordinatesURL )
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            console.log(data);

            let cityLat = data[0].lat;
            let cityLon = data[0].lon; 
            
            console.log(cityLat);
            console.log(cityLon);

            let queryURLFive = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}`;

            fetch(queryURLFive)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                //source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_removechild_while
                while (fiveWeatherOutput.hasChildNodes()) {
                    fiveWeatherOutput.removeChild(fiveWeatherOutput.firstChild);
                };
                
                for (let i = 2; i < 35; i = i+8) {
                    weatherFiveCard = document.createElement('div');
                    weatherFiveCard.style.display = 'inline';
                    weatherFiveCard.style.border = 'solid 1px black';
                    weatherFiveCard.style.backgroundColor = 'var(--lBlack)';
                    weatherFiveCard.style.color = 'white';
                    weatherFiveCard.style.padding = '5px';
                    weatherFiveCard.style.margin = '5px';

                    weatherFiveDate = document.createElement('p');
                    weatherFiveDate.style.fontWeight = '700';

                    weatherFiveTemp = document.createElement('p');

                    weatherFiveWind = document.createElement('p');

                    weatherFiveHumdt = document.createElement('p');



                    weatherFiveDate.textContent = `${data.list[i].dt_txt}`;
                    weatherFiveTemp.textContent = `Temp: ${data.list[i].main.temp} F`;
                    weatherFiveWind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
                    weatherFiveHumdt.textContent = `Humidity: ${data.list[i].main.humidity} %`;

                    weatherFiveCard.append(weatherFiveDate, weatherFiveTemp, weatherFiveWind, weatherFiveHumdt);
                    fiveWeatherOutput.appendChild(weatherFiveCard);
                    
                };

                
            
            });
    
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