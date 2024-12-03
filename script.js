const apiKey = 'cfbefad926131ec98ff6680748f80681';

// Function to get weather
function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Construct API URLs
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather
    fetch(currentWeatherURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current weather');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            alert('Error fetching current weather. Please try again.');
        });

    // Fetch forecast
    fetch(forecastURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            return response.json();
        })
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast. Please try again.');
        });
}

// Function to display current weather
function displayCurrentWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');

    // Extract and display weather data
    const cityName = data.name;
    const description = data.weather[0].description;
    const temperature = (data.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius
    const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.src = iconURL;
    weatherIcon.style.display = 'block';
    tempDiv.textContent = `${temperature}°C`;
    weatherInfo.textContent = `${cityName}: ${description}`;
}

// Function to display hourly forecast
function displayHourlyForecast(forecastList) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    // Display up to 5 forecast entries
    forecastList.slice(0, 5).forEach(entry => {
        const time = entry.dt_txt.split(' ')[1].slice(0, 5); // Extract time (HH:MM)
        const description = entry.weather[0].description;
        const temperature = (entry.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius
        const iconURL = `http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;

        // Create a forecast box
        const forecastBox = document.createElement('div');
        forecastBox.className = 'forecast-box';

        forecastBox.innerHTML = `
            <h4>${time}</h4>
            <img src="${iconURL}" alt="${description}">
            <p>${description}</p>
            <p>${temperature}°C</p>
        `;

        // Append forecast box to the container
        forecastContainer.appendChild(forecastBox);
    });
}
