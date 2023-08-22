const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  // ... (other cities)
];

function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async function fetchTemperature(city) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.current_weather.temperature);
    return data;
  } catch (error) {
    console.error('Error fetching temperature:', error);
    return null;
  }
}

async function displayRandomCityTemperature() {
  const randomCity = selectRandomCity(cities);
  const data = await fetchTemperature(randomCity);

  if (data.current_weather.temperature !== null) {
    console.log(`City: ${randomCity.name}`);
    console.log(`Temperature: ${data.current_weather.temperature}°C`);
  } else {
    console.log('Unable to fetch temperature data.');
  }
}

displayRandomCityTemperature();
