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

// ===================================================
// ===================================================
// weather forcast for search button
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    //localStorage.removeItem('city');

    if (userCityInput.value) {

        // ====================
        //get weather for today

        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput.value}&appid=${APIKey}`;

        fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const today = dayjs();
            let dateInput = today.format('MM/DD/YYYY');

            console.log(dateInput);

             //source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_removechild_while
            while (todayWeatherOutput.hasChildNodes()) {
                todayWeatherOutput.removeChild(todayWeatherOutput.firstChild);
            };

            weatherTodayCard = document.createElement('div');

            weatherTodayCity = document.createElement('p');
            weatherTodayCity.style.fontWeight = '700';

            weatherTodayWeather = document.createElement('p');
     

            weatherTodayTemp = document.createElement('p');

            weatherTodayWind = document.createElement('p');

            weatherTodayHumdt = document.createElement('p');
            
                // let's find icon for weather condition "weatherTodayWeatherIcon" to display it then after the city name and today-date

                weatherTodayWeather.textContent = `${data.weather[0].main}`;
                console.log(weatherTodayWeather.textContent);

                // source for icon display was chatGPT:  const unicodeCharacter = String.fromCodePoint(decimalCode);
                // source for weather condition variants is the website I am using for this WebApp https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
                // source for weather icons https://www.w3schools.com/charsets/ref_emoji_weather.asp 
                if (weatherTodayWeather.textContent === 'Clouds') {weatherTodayWeatherIcon = String.fromCodePoint(9925);};
                if (weatherTodayWeather.textContent === 'Thunderstorm') {weatherTodayWeatherIcon = String.fromCodePoint(127785)};
                if (weatherTodayWeather.textContent === 'Drizzle') {weatherTodayWeatherIcon = String.fromCodePoint(127782)};
                if (weatherTodayWeather.textContent === 'Rain') {weatherTodayWeatherIcon = String.fromCodePoint(9748)};
                if (weatherTodayWeather.textContent === 'Snow') {weatherTodayWeatherIcon = String.fromCodePoint(10052)};
                if (weatherTodayWeather.textContent === 'Atmosphere') {weatherTodayWeatherIcon = String.fromCodePoint(9925)};
                if (weatherTodayWeather.textContent === 'Clear') {weatherTodayWeatherIcon = String.fromCodePoint(9728)};

                // weatherTodayWeather.textContent = `${data.weather[0].main} ${weatherTodayWeatherIcon}`;

            weatherTodayCity.textContent = `${data.name} (${dateInput}) ${weatherTodayWeatherIcon}`;
            // console.log(${data.main.temp});
            weatherTodayTemp.textContent = `Temp: ${data.main.temp}`;
            weatherTodayWind.textContent = `Wind: ${data.wind.speed} MPH`;
            weatherTodayHumdt.textContent = `Humidity: ${data.main.humidity} %`;


            weatherTodayCard.append(weatherTodayCity, weatherTodayTemp, weatherTodayWind, weatherTodayHumdt);
            todayWeatherOutput.appendChild(weatherTodayCard);
                 
        }); 

        // ==========================
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


                // weatherFiveWeather.textContent = `${data.list[1].weather[0].main}`;
                // console.log(weatherFiveWeather.textContent);


                
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

                    const day = dayjs(new Date(data.list[i].dt_txt));
                    let dayInput = day.format('MM/DD/YYYY');

                    // // let's find icon for weather condition "weatherFiveWeatherIcon" to display it then 

                    // weatherFiveWeather.textContent = `${data.list[i].weather[0].main}`;
                    // console.log(weatherFiveWeather.textContent);

                    // // // source for icon display was chatGPT:  const unicodeCharacter = String.fromCodePoint(decimalCode);
                    // // // source for weather condition variants is the website I am using for this WebApp https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
                    // // // source for weather icons https://www.w3schools.com/charsets/ref_emoji_weather.asp 
                    // // if (weatherFiveWeather.textContent === 'Clouds') {weatherFiveWeatherIcon = String.fromCodePoint(9925);};
                    // // if (weatherFiveWeather.textContent === 'Thunderstorm') {weatherFiveWeatherIcon = String.fromCodePoint(127785)};
                    // // if (weatherFiveWeather.textContent === 'Drizzle') {weatherFiveWeatherIcon = String.fromCodePoint(127782)};
                    // // if (weatherFiveWeather.textContent === 'Rain') {weatherFiveWeatherIcon = String.fromCodePoint(9748)};
                    // // if (weatherFiveWeather.textContent === 'Snow') {weatherFiveWeatherIcon = String.fromCodePoint(10052)};
                    // // if (weatherFiveWeather.textContent === 'Atmosphere') {weatherFiveWeatherIcon = String.fromCodePoint(9925)};
                    // // if (weatherFiveWeather.textContent === 'Clear') {weatherFiveWeatherIcon = String.fromCodePoint(9728)};

                    // //  weatherFiveWeather.textContent = `${data.list[i].weather[0].main} ${weatherFiveWeatherIcon}`;


                    weatherFiveDate.textContent = `${dayInput}`;
                    weatherFiveTemp.textContent = `Temp: ${data.list[i].main.temp} F`;
                    weatherFiveWind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
                    weatherFiveHumdt.textContent = `Humidity: ${data.list[i].main.humidity} %`;

                    weatherFiveCard.append(weatherFiveDate, weatherFiveTemp, weatherFiveWind, weatherFiveHumdt);
                    fiveWeatherOutput.appendChild(weatherFiveCard);
                    
                };
            
            });
    
        });

        // ==========================
        // save data to Local Storage
        addNewCity =  {
            cityName: userCityInput.value,
        };
        console.log(addNewCity.cityName );
        console.log(citiesList[0].cityName);
        console.log(citiesList.length);

        // if it is the first city simply add it to Local Storage. Else do all verification before add to LocalStorage
        if (citiesList.length === 0) {
            citiesList.push(addNewCity);
            console.log(citiesList);
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
                cityTitle.style.fontSize = '20px';
                
                // source chatGPT 
                // 1. const textContent = paragraph.textContent;
                // 2. paragraph.setAttribute('data-text', textContent);
                cityTitle.textContent = getCitiesList[i].cityName;
                cityTitle.setAttribute('data-text', cityTitle.textContent);
                console.log(cityTitle.getAttribute('data-text'));

                cityCard.appendChild(cityTitle);
                cityHistoryOutput.appendChild(cityCard);

            };
            
        } else {
            // lets store only unique cities
            // if a=0 then city is unique
            let a = 0;
            for (let i = 0; i < citiesList.length; i++) {
                if (addNewCity.cityName === citiesList[i].cityName) {
                    a++;
                };
            }; 
            console.log(a); 

            // if city is unique then add to LocalStorage
            if (a === 0) {

                citiesList.push(addNewCity);
                console.log(citiesList);

                // lets keep the number of cities in storage equal to 8 as to mock-up
                if (citiesList.length > 8) {
                    citiesList.shift();
                };
            
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
                    
                    // source chatGPT 
                    // 1. const textContent = paragraph.textContent;
                    // 2. paragraph.setAttribute('data-text', textContent);
                    cityTitle.textContent = getCitiesList[i].cityName;
                    cityTitle.setAttribute('data-text', cityTitle.textContent);
                    console.log(cityTitle.getAttribute('data-text'));

                    cityCard.appendChild(cityTitle);
                    cityHistoryOutput.appendChild(cityCard);

                };
                
            };
            
        }

    } else {
        alert("Please, fill in a city name!");
    };

});


// ===================================================
// ===================================================
// weather forcast for city-click from search-history

//lets make cities from serch-history be clicable
//sourse bootcamp UofU module#04 activity#19
const cityTarget = document.querySelector('#city-history');
cityTarget.addEventListener('click', function (event) {
  const element = event.target;

  // Check if the clicked element was an paragraf
  if (element.matches('p')) {
    // Get the current value of the paragraf's data-text attribute. It is a city name. So now we can do a new fetch requestby this city-name to display weather forcast
    const getCity = element.getAttribute('data-text');
    console.log(getCity);

    //get weather for today

    let newQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${APIKey}`;

    fetch(newQueryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const today = dayjs();
        let dateInput = today.format('MM/DD/YYYY');

        console.log(dateInput);

         //source: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_removechild_while
        while (todayWeatherOutput.hasChildNodes()) {
            todayWeatherOutput.removeChild(todayWeatherOutput.firstChild);
        };

        weatherTodayCard = document.createElement('div');

        weatherTodayCity = document.createElement('p');
        weatherTodayCity.style.fontWeight = '700';

        weatherTodayWeather = document.createElement('p');
        weatherTodayCity.style.

        weatherTodayTemp = document.createElement('p');

        weatherTodayWind = document.createElement('p');

        weatherTodayHumdt = document.createElement('p');
        
            // let's find icon for weather condition "weatherTodayWeatherIcon" to display it then after the city name and today-date

            weatherTodayWeather.textContent = `${data.weather[0].main}`;
            console.log(weatherTodayWeather.textContent);

            // source for icon display was chatGPT:  const unicodeCharacter = String.fromCodePoint(decimalCode);
            // source for weather condition variants is the website I am using for this WebApp https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
            // source for weather icons https://www.w3schools.com/charsets/ref_emoji_weather.asp 
            if (weatherTodayWeather.textContent === 'Clouds') {weatherTodayWeatherIcon = String.fromCodePoint(9925);};
            if (weatherTodayWeather.textContent === 'Thunderstorm') {weatherTodayWeatherIcon = String.fromCodePoint(127785)};
            if (weatherTodayWeather.textContent === 'Drizzle') {weatherTodayWeatherIcon = String.fromCodePoint(127782)};
            if (weatherTodayWeather.textContent === 'Rain') {weatherTodayWeatherIcon = String.fromCodePoint(9748)};
            if (weatherTodayWeather.textContent === 'Snow') {weatherTodayWeatherIcon = String.fromCodePoint(10052)};
            if (weatherTodayWeather.textContent === 'Atmosphere') {weatherTodayWeatherIcon = String.fromCodePoint(9925)};
            if (weatherTodayWeather.textContent === 'Clear') {weatherTodayWeatherIcon = String.fromCodePoint(9728)};

            // weatherTodayWeather.textContent = `${data.weather[0].main} ${weatherTodayWeatherIcon}`;

        weatherTodayCity.textContent = `${data.name} (${dateInput}) ${weatherTodayWeatherIcon}`;
        // weatherTodayTemp.textContent = `Temp: ${data.main.temp} F`;
        weatherTodayWind.textContent = `Wind: ${data.wind.speed} MPH`;
        weatherTodayHumdt.textContent = `Humidity: ${data.main.humidity} %`;


        weatherTodayCard.append(weatherTodayCity, weatherTodayWind, weatherTodayHumdt);
        todayWeatherOutput.appendChild(weatherTodayCard);
             
    }); 

    // ==========================
    //get weather for next 5 days

    let coordinatesURL = `http://api.openweathermap.org/geo/1.0/direct?q=${getCity}&limit=1&appid=${APIKey}`;

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


            // weatherFiveWeather.textContent = `${data.list[1].weather[0].main}`;
            // console.log(weatherFiveWeather.textContent);


            
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

                const day = dayjs(new Date(data.list[i].dt_txt));
                let dayInput = day.format('MM/DD/YYYY');

                // // let's find icon for weather condition "weatherFiveWeatherIcon" to display it then 

                // weatherFiveWeather.textContent = `${data.list[i].weather[0].main}`;
                // console.log(weatherFiveWeather.textContent);

                // // // source for icon display was chatGPT:  const unicodeCharacter = String.fromCodePoint(decimalCode);
                // // // source for weather condition variants is the website I am using for this WebApp https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
                // // // source for weather icons https://www.w3schools.com/charsets/ref_emoji_weather.asp 
                // // if (weatherFiveWeather.textContent === 'Clouds') {weatherFiveWeatherIcon = String.fromCodePoint(9925);};
                // // if (weatherFiveWeather.textContent === 'Thunderstorm') {weatherFiveWeatherIcon = String.fromCodePoint(127785)};
                // // if (weatherFiveWeather.textContent === 'Drizzle') {weatherFiveWeatherIcon = String.fromCodePoint(127782)};
                // // if (weatherFiveWeather.textContent === 'Rain') {weatherFiveWeatherIcon = String.fromCodePoint(9748)};
                // // if (weatherFiveWeather.textContent === 'Snow') {weatherFiveWeatherIcon = String.fromCodePoint(10052)};
                // // if (weatherFiveWeather.textContent === 'Atmosphere') {weatherFiveWeatherIcon = String.fromCodePoint(9925)};
                // // if (weatherFiveWeather.textContent === 'Clear') {weatherFiveWeatherIcon = String.fromCodePoint(9728)};

                // //  weatherFiveWeather.textContent = `${data.list[i].weather[0].main} ${weatherFiveWeatherIcon}`;


                weatherFiveDate.textContent = `${dayInput}`;
                weatherFiveTemp.textContent = `Temp: ${data.list[i].main.temp} F`;
                weatherFiveWind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
                weatherFiveHumdt.textContent = `Humidity: ${data.list[i].main.humidity} %`;

                weatherFiveCard.append(weatherFiveDate, weatherFiveTemp, weatherFiveWind, weatherFiveHumdt);
                fiveWeatherOutput.appendChild(weatherFiveCard);
                
            };
        
        });

    });




    
  }
});