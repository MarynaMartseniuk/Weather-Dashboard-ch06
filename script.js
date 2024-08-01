//input data
const userCityInput = document.querySelector('#search');
const searchBtn = document.querySelector('#searchButton');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    console.log(userCityInput.value);

    addNewCity =  {
        city: userCityInput.value,
    };

    
});