import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../store/slices/favoritesSlice';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);

  function handleDeleteFavorite(id) {
    dispatch(removeFavorite(id));
  }
  return (
    <div className="flex flex-col w-full items-center gap-4">
      {favorites.length === 0 ? (
        <ErrorMessage message="There is no favorite city yet." type="info" />
      ) : (
        favorites
          .slice()
          .reverse()
          .map((f) => (
            <div
              key={f.id}
              className="bg-[var(--surface)] text-[var(--text)] rounded-2xl p-4 shadow-md flex flex-col gap-3 w-full max-w-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold md:text-2xl">
                  <Link to={`/details/${f.name}`} className="hover:underline">
                    {f.name}
                  </Link>
                </h2>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => handleDeleteFavorite(f.id)}
                >
                  Delete Favorite
                </Button>
              </div>

              <div className="flex items-center justify-around">
                <img
                  src={`http://openweathermap.org/img/wn/${f.icon}@2x.png`}
                  alt={f.description}
                  className="w-16 h-16"
                />
                <p className="font-bold text-xl md:text-3xl ">
                  {Math.round(f.temp)}ºC
                </p>
                <p className="capitalize text-sm md:text-lg ">
                  {f.description}
                </p>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default Favorites;
