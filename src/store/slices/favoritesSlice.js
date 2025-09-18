import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const cityData = action.payload;

      const exists = state.list.find((c) => c.id === cityData.id);
      if (!exists) {
        state.list.push(cityData);
      }
    },
    removeFavorite: (state, action) => {
      const cityId = action.payload;

      state.list = state.list.filter((c) => c.id !== cityId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
