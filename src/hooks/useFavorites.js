import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';

export default function useFavorites(data) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);

  const isFavorite = data && favorites.some((f) => f.id === data.id);

  function toggleFavorite() {
    if (!data) return;
    if (isFavorite) {
      dispatch(removeFavorite(data.id));
    } else {
      dispatch(
        addFavorite({
          id: data.id,
          name: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        })
      );
    }
  }

  return { isFavorite, toggleFavorite };
}
