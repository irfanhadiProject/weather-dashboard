import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import favoritesReducer from './slices/favoritesSlice';
import tempUnitReducer from './slices/tempUnitSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    tempUnit: tempUnitReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(
    'favorites',
    JSON.stringify(store.getState().favorites.list)
  );
});
