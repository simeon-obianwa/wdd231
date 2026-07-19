document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const hamburgerBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamburgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerBtn.textContent = hamburgerBtn.classList.contains('open') ? '✖' : '☰';
});

const lat = 6.4383;
const lon = 3.4736;
const apiKey = 'e139102edacf854ad0412b5ba69ae94a';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const currentRes = await fetch(currentWeatherUrl);
        if (currentRes.ok) {
            const currentData = await currentRes.json();
            displayCurrentWeather(currentData);
        }

        const forecastRes = await fetch(forecastUrl);
        if (forecastRes.ok) {
            const forecastData = await forecastRes.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('current-weather').innerHTML = `<p>Unable to load weather data.</p>`;
    }
}

function displayCurrentWeather(data) {
    const currentContainer = document.getElementById('current-weather');
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    currentContainer.innerHTML = `
        <div class="weather-now">
            <img src="${icon}" alt="${desc}" width="50" height="50">
            <p class="temp">${temp}&deg;C</p>
        </div>
        <p class="desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = "";

    const threeDayData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    threeDayData.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = daysOfWeek[date.getDay()];
        const temp = Math.round(day.main.temp);
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <p><strong>${dayName}</strong></p>
                <img src="${icon}" alt="${day.weather[0].description}" width="40" height="40">
                <p>${temp}&deg;C</p>
            </div>
        `;
    });
}

fetchWeather();


const membersUrl = 'data/members.json';

const getMembershipName = (level) => {
    return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
};

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');

    const qualifiedMembers = members.filter(member => member.membershipLevel >= 2);

    const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());

    const selectedSpotlights = shuffledMembers.slice(0, 3);

    selectedSpotlights.forEach(member => {
        let card = document.createElement('div');
        card.classList.add('spotlight-card');

        let levelClass = getMembershipName(member.membershipLevel).toLowerCase();

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="100">
            <p class="membership-badge ${levelClass}">${getMembershipName(member.membershipLevel)} Partner</p>
            <hr>
            <p>📍 ${member.address}</p>
            <p>📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();