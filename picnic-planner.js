const fetch = require("node-fetch");
const moment = require("moment");

const city = process.argv[2];

if (city === undefined) {
    console.log(`You didn't select a city\nYou have to run the program like this for e.g., "node.js picnic-planner.js London"`);
    return;
}

const currentWeekend = [moment().endOf('week').format("YYYY/MM/DD"), moment().endOf('week').add(1, "d").format("YYYY/MM/DD")];

function init() {
    fetchWeatherData()
        .then(([saturday, sunday]) => checkWeather(saturday, sunday))
        .catch(err => console.error(`There was an issue while fetching weather data; ${err}`));
}

async function fetchWeatherData() {
    const baseUrl = 'https://www.metaweather.com/api/location/'
    const location = await (await fetch(`${baseUrl}search/?query=${city}`)).json();

    const [saturdayResponse, sundayResponse] = await Promise.all([
        fetch(`${baseUrl}${location[0].woeid}/${currentWeekend[0]}`),
        fetch(`${baseUrl}${location[0].woeid}/${currentWeekend[1]}`)
    ]);
    const saturday = await saturdayResponse.json();
    const sunday = await sundayResponse.json();
    return [saturday, sunday]
}

function checkWeather(saturdayWeather, sundayWeather) {
    const saturday = saturdayWeather[0];
    const sunday = sundayWeather[0];
    const weatherState = ['Clear', 'Light Cloud', 'Heavy Cloud'];
    const temperatureThreshold = 10;
    const isSaturdayWeatherStatus = weatherState.indexOf(saturday.weather_state_name);
    const isSundayWeatherStatus = weatherState.indexOf(sunday.weather_state_name);

    if ((saturday.the_temp > temperatureThreshold && sunday.the_temp > temperatureThreshold) && (isSaturdayWeatherStatus >= 0 && isSundayWeatherStatus >= 0)) {
        const day = saturday.the_temp > sunday.the_temp ? 'Saturday' : 'Sunday';
        const dayTemperature = saturday.the_temp > sunday.the_temp ? Math.round(saturday.the_temp) : Math.round(sunday.the_temp);
        console.log(`This weekend looks nice for a picnic, ${day} is best because it’s warmer, it's going to be ${dayTemperature} degrees`);
    } else if ((saturday.the_temp > temperatureThreshold && isSaturdayWeatherStatus >= 0) || (sunday.the_temp > temperatureThreshold && isSundayWeatherStatus >= 0)) {
        const validDay = (saturday.the_temp > temperatureThreshold && isSaturdayWeatherStatus >= 0) ? 'Saturday' : 'Sunday';
        console.log(`You should have your picnic on ${validDay}`);
    } else {
        console.log('The weather isn’t looking very good this weekend, maybe stay indoors.');
    }
}

init();
