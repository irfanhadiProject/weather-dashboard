export async function fetchForecast(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

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

  const data = await res.json();
  const dailyTemps = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyTemps[date]) dailyTemps[date] = [];
    dailyTemps[date].push(item.main.temp);
  });

  return Object.entries(dailyTemps).map(([date, temps]) => {
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    return { date, temp: parseFloat(avg.toFixed(1)) };
  });
}
