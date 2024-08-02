//input data
const userCityInput = document.querySelector('#search');
const searchBtn = document.querySelector('#searchButton');

//out data
const cityHistoryOutput = document.querySelector('#city-history');

//other data
var citiesList = JSON.parse(localStorage.getItem("city")) || [];
var addNewCity = {};

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // localStorage.removeItem('city');

    //work with a Local Storage
    if (userCityInput.value) {

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

        for (let i = 0; i < getCitiesList.length; i++) {
            cityCard = document.createElement('div');
            cityCard.style.border = 'none';
            cityCard.style.borderRadius = '4px';
            cityCard.style.margin = '10px';
            cityCard.style.backgroundColor = 'var(--grey)';

            cityTitle = document.createElement('p');
            cityTitle.style.fontStyle = 'italic';
            cityTitle.style.marginTop = '5px';

            cityTitle.textContent = getCitiesList[i].cityName;

            cityCard.appendChild(cityTitle);
            cityHistoryOutput.appendChild(cityCard);

        }

    } else {
        alert("Please, fill in a city name!");
    };

});