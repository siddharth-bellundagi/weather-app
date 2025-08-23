const apiKey = 'f9767fdc9340e161ba61e9740570633d'; // Replace with your OpenWeatherMap API key
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const city = cityInput.value.trim();
	if (!city) return;
	resultDiv.textContent = 'Loading...';
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
		if (!response.ok) {
			throw new Error('City not found');
		}
		const data = await response.json();
		const weather = data.weather[0].description;
		const temp = data.main.temp;
		const feels = data.main.feels_like;
		const humidity = data.main.humidity;
		resultDiv.innerHTML = `
			<strong>${data.name}, ${data.sys.country}</strong><br>
			Weather: ${weather}<br>
			Temperature: ${temp}°C (feels like ${feels}°C)<br>
			Humidity: ${humidity}%
		`;
	} catch (err) {
		resultDiv.textContent = err.message;
	}
});
