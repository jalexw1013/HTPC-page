/* 
 * Document created by Alex Watkins
 * http://alexwatkins.co
 *
 *The MIT License (MIT)
 *
 *Copyright (c) 2016 James Watkins
 *
 *Permission is hereby granted, free of charge, to any person obtaining a copy
 *of this software and associated documentation files (the "Software"), to deal
 *in the Software without restriction, including without limitation the rights
 *to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *copies of the Software, and to permit persons to whom the Software is
 *furnished to do so, subject to the following conditions:
 *
 *The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.
 *
 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
 */

const USER_NAME = 'Alex';
/*
 * A weather api key must be obtained to use access the weather.
 * Obtain this at wunderground.com
 */
const WEATHER_API_KEY = '000';


/////
//
// Clock functions
//
/////

/*
 * adds a zero to the front of the number if it is less than 10
 * @param {int} number
 * @returns {String}
 */
function extendTimeDigit(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}

/*
 * updates the onscreen clock to a new time
 * @param Date today a date opject to update the clock with
 * ex. updateClock(new Date());
 */
function updateClock(today) {
    var hour = today.getHours() % 12;
    var minute = today.getMinutes();
    minute = extendTimeDigit(minute);
    
    document.getElementById('clock').innerHTML = hour + ":" + minute;
}

/*
 * this function starts the on screen clock 
 * and causes it to update automatically
 */
function startClock() {
    setTimeout(updateClock, 500, new Date());
}

/////
//
// Greeting functions
//
/////

/*
 * sets the greeting text
 * @param {string} text the text to set the greeting
 */
function setGreeting(text) {
    document.getElementById('greeting').innerHTML = text;
}

/*
 * updates the greeting with the approrpiate greeting.
 */
function updateGreeting() {
    var text;
    var hour = (new Date()).getHours();
    if (hour >= 4 && hour < 12) {
        text = "Good morning";
    } else if (hour >= 12 && hour < 17) {
        text = "Good afternoon";
    } else if (hour >= 17 && hour < 20) {
        text = "Good evening";
    } else {
        text = "Good night";
    }
    
    text += ", " + USER_NAME + ".";
    setGreeting(text);
}

/////
//
// Weather functions
//
/////

/*
 * sets the weather text
 * @param {string} text the text to set the weather
 */
function setWeather(text) {
    document.getElementById('weather').innerHTML = text;
}

/*
 * interprets the json weather string and sets the weather
 * @param {json string} data
 */
function parseWeatherData(data) {
    var parsedData = JSON.parse(data);
    var high = parsedData['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
    var rainString = "It will not rain today.";
    var rain = parsedData['forecast']['simpleforecast']['forecastday'][0]['conditions'].indexOf('Rain');
    if (rain > -1) {
        rainString = "It will rain today.";
    }
    var setString = "The high is " + high + ".<br />" + rainString;
    setWeather(setString);
}

/*
 * retireves the weatehr data from the server
 */
function getWeatherData() {
    var url = "http://api.wunderground.com/api/" + WEATHER_API_KEY + "/forecast/q/GA/Atlanta.json";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            parseWeatherData(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/////
//
// Background Image
//
/////

/*
 * loads a new background image to the screen
 */
function updateImage() {
    var imageSource = 'https://source.unsplash.com/random';
    document.body.style.backgroundImage = "url(" + imageSource + ")";
}

/////
//
// Program functions
//
/////

/*
 * loads the greeting, weather, and background picture
 * each call will generate new data (ie new picture, and update weather)
 */
function load() {
    updateGreeting();
    getWeatherData();
    updateImage();
}

/*
 * starts execution of the other code. 
 * This should be called once the page is loaded.
 */
function main() {
    startClock();
    load();
}

/*
 * runs the program once done loading this file
 */
main();