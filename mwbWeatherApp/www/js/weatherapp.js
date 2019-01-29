var xmlhttp;
var weatherURL;

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init(); // comment out when running on device
};

function init() {  
    var location = "lethbridge,ca";
    weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weather();
}

function weather() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', weatherURL, true); //this changes the state of xmlhttp
    xmlhttp.send();
    xmlhttp.onreadystatechange = getWeather;
}

function getWeather() { // when readystate changes
        
    //check to see if the client -4 and server -200 is ready
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var json = JSON.parse(xmlhttp.responseText);
        for(i = 0;i <= 1;i++){
        function Forcast(Temp, Descrip, Wind, Max, Min, Humid) {          
            document.getElementById("temp").innerHTML = Math.round(Temp) + "&deg;" + "c";
            document.getElementById("description").innerHTML = Descrip;
            document.getElementById("mintemp").innerHTML = "min temp: " + Min  + "&deg;" + "c";
            document.getElementById("maxtemp").innerHTML = "max temp: " + Max  + "&deg;" + "c";
            document.getElementById("wind").innerHTML = "wind: " + Wind + "km/h";
            document.getElementById("humidity").innerHTML =  "humidity: " + Humid + "%";
            
            switch(Descrip) { 
                case "few clouds":
                    document.getElementById("icon").className = "wi wi-cloud"; 
                break;
                case "broken clouds":
                    document.getElementById("icon").className = "wi wi-cloudy";
                break;
                case "clear sky":
                    document.getElementById("icon").className = "wi wi-horizon";
                break;
                case "light rain":
                    document.getElementById("icon").className = "wi wi-showers";
                break;
                case "moderate rain":
                    document.getElementById("icon").className = "wi wi-rain";
                break;
                case "overcast clouds":
                    document.getElementById("icon").className = "wi wi-day-sunny-overcast";
                break;
                case "snow":
                    document.getElementById("icon").className = "wi wi-snow";
                break;
                default:
                    document.getElementById("icon").className = "wi wi-cloud";
                break;
            } 
            i = 0;
            }
        }

        var current = new Forcast(json.main.temp, json.weather[0].description, json.wind.speed, json.main.temp_max, json.main.temp_min, json.main.humidity );
        
        console.log(weather.description);
        console.log("all info received from server");

    } else {
        console.log("no dice");
    }
}
