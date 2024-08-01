//input data
const userCityInput = document.querySelector('#search');
const searchBtn = document.querySelector('#searchButton');

//other data
var citiesList = JSON.parse(localStorage.getItem("cityKey")) || [];
var addNewCity = {};

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    //work with a Local Storage
    if (userCityInput) {
        addNewCity =  {
            cityKey: userCityInput.value,
        };
    
        citiesList.push(addNewCity);
    
        localStorage.setItem("cityKey", JSON.stringify(citiesList));
    
        userCityInput.value = "";
    } else {
        alert("Please, fill in a city name!");
    };

});