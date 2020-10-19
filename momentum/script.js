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


// Options
const showAmPm = true;

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

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


// Set Background and Greeting
function setBgGreet() {
    const bgImgUrl_morning = 'assets/images/morning/',
        bgImgUrl_day = 'assets/images/day/',
        bgImgUrl_evening = 'assets/images/evening/',
        bgImgUrl_night = 'assets/images/night/';
    let morning_img = [],
        day_img = [],
        evening_img = [],
        night_img = [];
    for (let i = 1; i <= 20; i++) {
        morning_img[i] = `${bgImgUrl_morning}${i}.jpg`;
        day_img[i] = `${bgImgUrl_day}${i}.jpg`;
        evening_img[i] = `${bgImgUrl_evening}${i}.jpg`;
        night_img[i] = `${bgImgUrl_night}${i}.jpg`;
    }

    let today = new Date(),
        hour = today.getHours();
    let los = Math.floor(Math.random() * 20 + 1);

    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            `url('${morning_img[los]}'`;
        greeting.textContent = 'Good morning, ';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
            `url('${day_img[los]}'`;
        greeting.textContent = 'Good afternoon, ';
    } else if (hour >= 0 && hour < 6) {
        // Night
        document.body.style.backgroundImage =
            `url('${night_img[los]}'`;
        greeting.textContent = 'Good night, ';
    } else {
        // Evening
        document.body.style.backgroundImage =
            `url('${evening_img[los]}'`;
        greeting.textContent = 'Good evening, ';
    }
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
            localStorage.setItem('name', e.target.value);
            name.blur();
        }
        // Space click
        if ((e.which == 32 || e.keyCode == 32) && name.value.length <= 1)
            name.value = '';
    } else {
        if (localStorage.getItem('name') !== null && name.value === '' || name.value === ' ')
            name.value = localStorage.getItem('name');
        else
            localStorage.setItem('name', e.target.value);

    }
}

// Focused inputs
function focusInput(e) {
    if (e.target.classList.contains('name')) {
        e.target.value = '';
    } else if (e.target.classList.contains('focus')) {
        e.target.value = '';
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
            localStorage.setItem('focus', e.target.value);
            focusInp.blur();
        }
        if ((e.which == 32 || e.keyCode == 32) && focusInp.value.length <= 1)
            focusInp.value = '';
    } else {
        if (localStorage.getItem('focus') !== null && focusInp.value === '' || focusInp.value === ' ') {
            focusInp.value = localStorage.getItem('focus');
        } else {
            localStorage.setItem('focus', e.target.value);
        }
    }
}

async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `${data.wind.speed} m/s`;
        humidity.textContent = `${data.main.humidity}%`
    } else {
        city.textContent = 'Incorrect city!';
        city.style.color = 'red';
        localStorage.setItem('city', '')
    }
}

function setCity(e) {
    city.style.color = 'white';
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', city.textContent);
            getWeather();
            city.blur();
        }
        if ((e.which == 32 || e.keyCode == 32) && city.textContent.length <= 1)
            city.textContent = '';

    } else {
        if ((localStorage.getItem('city') !== null && city.textContent === '') || city.textContent === ' ') {
            city.textContent = localStorage.getItem('city');
        } else {
            localStorage.setItem('city', city.textContent);
        }
        getWeather();
    }

}

function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') == '') {
        localStorage.setItem('city', 'Minsk')
        city.textContent = 'Minsk';
    } else {
        city.textContent = localStorage.getItem('city');
    }
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
btn_bg.addEventListener('click', setBgGreet);
btn_quote.addEventListener('click', getQuote);
// Run
showDateTime();
setBgGreet();
getName();
getFocusInp();
getCity();
setInterval(setBgGreet, 60 * 60 * 1000);