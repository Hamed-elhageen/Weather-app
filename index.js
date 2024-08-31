// today's cards declaration
let dayName=document.querySelector(".day-name");
let date=document.querySelector(".header .date");
let city=document.querySelector(".city");
let degree=document.querySelector(".temp .number");
let todayImage=document.querySelector(".one .image");
let discription=document.querySelector(".status");
let humidty = document.querySelector(".humidty");
let wind = document.querySelector(".wind");
let compass = document.querySelector(".compass");
let searchInput=document.querySelector(".search-input");
// next day variables
let nextDay=document.querySelectorAll(".nextday");
let nextdayImage=document.querySelectorAll(".image-container .image");
let maxDegree=document.querySelectorAll(".max-degree p");
let minDegree=document.querySelectorAll(".min-degree p");
let nextdayDiscription=document.querySelectorAll(".nextdaystatus");
    let apiResponse,
    responseData,
    monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'],
    days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    ];
  // functiont to get data from the api 
    async function getData(currentCity="cairo"){
        apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
        responseData=await apiResponse.json();
        console.log(responseData);
        displaytodayWeather();
        displaynextdayWeather();
    }
    getData();
    function displaytodayWeather(){
        let today_date=new Date();
        dayName.innerHTML=days[today_date.getDay()];
        date.innerHTML=`${today_date.getDate()} ${monthName[today_date.getMonth()]}`;
        city.innerHTML=responseData.location.name;
        degree.innerHTML= responseData.current.temp_c;
        todayImage.setAttribute("src", `https:${responseData.current.condition.icon}`);
        discription.innerHTML=responseData.current.condition.text;
        humidty.innerHTML=responseData.current.humidity;
        wind.innerHTML=responseData.current.wind_kph;
        compass.innerHTML=responseData.current.wind_dir;
    }
    function displaynextdayWeather(){
        for(let i=0;  i<nextDay.length ;i++){
            nextDay[i].innerHTML=days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
            nextdayImage[i].setAttribute('src',  `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
            maxDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c;
            minDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c;
            nextdayDiscription[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text;
        }
    }
    searchInput.addEventListener("keyup", function () {
        currentCity = searchInput.value;
        getData(currentCity);
    });