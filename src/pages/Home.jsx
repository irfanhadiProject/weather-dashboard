import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="flex flex-col items-center gap-3">
      <SearchBar />
      <WeatherCard />
    </div>
  );
}

export default Home;
