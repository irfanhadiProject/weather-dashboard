import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getForecast, getWeather } from '../store/slices/weatherSlice';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

function WeatherDetails() {
  const { city } = useParams();
  const dispatch = useDispatch();
  const { data, forecast, dataStatus, forecastStatus, error } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    if (city) {
      dispatch(getWeather(city));
      dispatch(getForecast(city));
    }
  }, [city, dispatch]);

  if (dataStatus === 'loading' || forecastStatus === 'loading')
    return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );

  return (
    <div>
      {data && (
        <div className="bg-[var(--surface)] text-[var(--text)] rounded-2xl p-6 shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-1">{data.name}</h2>
          <p className="text-[var(--text)] mb-4 capitalize">
            {data.weather[0].description} | {Math.round(data.main.temp)}°C
          </p>

          <h3 className="mb-3 font-semibold">5-Day Temperature Forecast</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart
                data={forecast}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => d.slice(5)}
                  stroke="var(--subtext)"
                />
                <YAxis
                  unit="°C"
                  stroke="var(--subtext)"
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface-contrast)',
                    border: 'none',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: 'var(--subtext)' }}
                />
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorTemp)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDetails;
