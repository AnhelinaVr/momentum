// DOM Elements
const date = document.querySelector(".date"),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focusInp = document.querySelector('.focus'),
    btn_bg = document.querySelector('.btn-bg'),
    btn_quote = document.querySelector('.btn-quote'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    windSpeed = document.querySelector('.wind-speed'),
    humidity = document.querySelector('.humidity'),
    city = document.querySelector('.city');
let images = [];

// Show Time
function showDateTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        day = today.getDate(),
        weekDay = today.getDay(),
        month = today.getMonth();

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;
    // Output Date
    date.innerHTML = `${getWeekDay(weekDay)}, ${day} ${getMonthName(month)}.`;
    if (min == 0 && sec == 0) {
        setBgGreet();
    }
    // Refresh every second
    setTimeout(showDateTime, 1000);
}

// Get week day
function getWeekDay(weekDay) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[weekDay];
}

// Get month name
function getMonthName(month) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

// Add Zeros to minutes and seconds
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Shuffle array
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Change background image after loading
function viewBgImage(data) {
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
    };
}

// Get image depending on the time
function getImage(btn) {
    let today = new Date(),
        hour = today.getHours();

    let imageSRC = images[hour];

    if (btn) {
        let index = (hour + (i % 24 + 1)) % 24;
        imageSRC = images[index];
        viewBgImage(imageSRC);
        i++;
    }

    viewBgImage(imageSRC);
}

function btnChangeBg() {
    getImage(true);
}

// Create array with images for the current day
function setImages() {
    const bgImgUrl_morning = 'assets/images/morning/',
        bgImgUrl_day = 'assets/images/day/',
        bgImgUrl_evening = 'assets/images/evening/',
        bgImgUrl_night = 'assets/images/night/';

    let morning_img = [],
        day_img = [],
        evening_img = [],
        night_img = [];

    for (let i = 1; i <= 20; i++) {
        morning_img[i - 1] = `${bgImgUrl_morning}${i}.jpg`;
        day_img[i - 1] = `${bgImgUrl_day}${i}.jpg`;
        evening_img[i - 1] = `${bgImgUrl_evening}${i}.jpg`;
        night_img[i - 1] = `${bgImgUrl_night}${i}.jpg`;
    }

    morning_img = shuffle(morning_img);
    day_img = shuffle(day_img);
    evening_img = shuffle(evening_img);
    night_img = shuffle(night_img);

    for (i = 0; i < 24; i++) {
        if (i < 6 && i >= 0) {
            images[i] = night_img[i % 20];
        }
        if (i < 12 && i >= 6) {
            images[i] = morning_img[i % 20];
        }
        if (i < 18 && i >= 12) {
            images[i] = day_img[i % 20];
        }
        if (i < 24 && i >= 18) {
            images[i] = evening_img[i % 20];
        }
    }
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();
    getImage();
    // Morning
    if (hour < 12)
        greeting.textContent = 'Good morning, ';
    // Afternoon
    else if (hour < 18)
        greeting.textContent = 'Good afternoon, ';
    // Night
    else if (hour >= 0 && hour < 6)
        greeting.textContent = 'Good night, ';
    // Evening
    else
        greeting.textContent = 'Good evening, ';

}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.value = '';
    } else {
        name.value = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.value.trim().length !== 0)
                localStorage.setItem('name', e.target.value);
            name.blur();
            name.classList.add('blur');
        }
    } else { // Blur
        if (localStorage.getItem('name') !== null && name.value.trim().length === 0)
            name.value = localStorage.getItem('name');
        else
            localStorage.setItem('name', e.target.value);
        name.classList.add('blur');
    }
}

// Clean focused inputs
function focusInput(e) {
    if (e.target.classList.contains('name')) {
        e.target.value = '';
        name.classList.remove('blur');
    } else if (e.target.classList.contains('focus')) {
        e.target.value = '';
        focusInp.classList.remove('blur');
    }

}

// Get FocusInp
function getFocusInp() {
    if (localStorage.getItem('focus') === null) {
        focusInp.value = '';
    } else {
        focusInp.value = localStorage.getItem('focus');
    }
}

// Set FocusInp
function setFocusInp(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.value.trim().length !== 0)
                localStorage.setItem('focus', e.target.value);
            focusInp.blur();
            focusInp.classList.add('blur');
        }
    } else { // Blur
        if (localStorage.getItem('focus') !== null && focusInp.value.trim().length === 0) {
            focusInp.value = localStorage.getItem('focus');
        } else {
            localStorage.setItem('focus', e.target.value);
        }
        focusInp.classList.add('blur');
    }
}

// Getting quote from API
async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

// Get info about weather from API
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=011de57da172ce619df27f6ba2d03b55&units=metric`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `${data.wind.speed} m/s`;
        humidity.textContent = `${data.main.humidity}%`
    } catch (error) {
        city.textContent = 'Incorrect city!';
        city.style.color = 'red';
        localStorage.setItem('city', '');
        console.log('error ' + error)
    }
}

// Setting city for getting weather
function setCity(e) {
    city.style.color = 'white';
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (city.textContent.trim().length !== 0)
                localStorage.setItem('city', city.textContent);
            getCity();
            city.blur();
        }
    } else {
        if (localStorage.getItem('city') !== null && city.textContent.trim().length !== 0)
            city.textContent = localStorage.getItem('city');
        else
            localStorage.setItem('city', city.textContent);
        getWeather();
    }
}

function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') == '') {
        localStorage.setItem('city', 'Minsk')
        city.textContent = 'Minsk';
    } else
        city.textContent = localStorage.getItem('city');
    getWeather();
}


city.addEventListener('keypress', setCity);
city.addEventListener('focus', () => {
    city.textContent = '';
});
city.addEventListener('blur', setCity);
document.addEventListener('DOMContentLoaded', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('focus', focusInput);
name.addEventListener('blur', setName);
focusInp.addEventListener('keypress', setFocusInp);
focusInp.addEventListener('focus', focusInput);
focusInp.addEventListener('blur', setFocusInp);
btn_bg.addEventListener('click', btnChangeBg);
btn_quote.addEventListener('click', getQuote);

// Run
setImages();
showDateTime();
setBgGreet();
getName();
getFocusInp();
getCity();