import { useDispatch } from 'react-redux';
import { getWeather } from '../store/slices/weatherSlice';
import { useState } from 'react';
import Button from './Button';

function SearchBar() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() != '') {
      dispatch(getWeather(city));
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-md bg-[var(--surface)] p-2 rounded-lg"
      >
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="flex-1 px-3 py-2 text-sm bg-[var(--bg)] text-[var(--text)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <Button type="submit" variant="primary" size="md">
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
