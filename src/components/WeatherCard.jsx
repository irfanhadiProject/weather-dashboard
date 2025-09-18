import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertTemp } from '../utils/convertTemp';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import useFavorites from '../hooks/useFavorites';
import Button from './Button';
import TempToggle from './TempToggle';

function WeatherCard() {
  const { data, dataStatus, error } = useSelector((state) => state.weather);
  const { isFavorite, toggleFavorite } = useFavorites(data);
  const unit = useSelector((state) => state.tempUnit.unit);

  function degToCompass(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  return (
    <div className="flex flex-col w-full items-center">
      {dataStatus === 'loading' && <Spinner />}
      {dataStatus === 'failed' && <ErrorMessage message={error} />}
      {dataStatus === 'success' && data && (
        <div className="flex flex-col gap-5 bg-[var(--surface)] text-[var(--text)] rounded-2xl p-4 shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold md:text-2xl">
              <Link to={`/details/${data.name}`} className="hover:underline">
                {data.name}
              </Link>
            </h3>
            <Button onClick={toggleFavorite} variant="secondary" size="md">
              {isFavorite ? '⭐ Delete Favorite' : '☆ Add to Favorite'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-4">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              className="w-20 h-20 mx-auto"
            />
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold md:text-3xl">
                  {Math.round(convertTemp(data.main.temp, unit))}º{unit}
                </p>

                <TempToggle />
              </div>
              <p className="capitalize text-sm md:text-lg">
                {data.weather[0].description}
              </p>
            </div>
          </div>

          <div className="text-xs grid text-[var(--subtext)] grid-cols-2 gap-2 md:text-sm">
            <p>Humidity: {data.main.humidity}%</p>
            <p>
              Wind: {data.wind.speed}m/s {degToCompass(data.wind.deg)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
