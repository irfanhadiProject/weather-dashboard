export async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('City not found');
    }
    if (res.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error('Failed to fetch weather data');
  }

  return await res.json();
}
