import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: localStorage.getItem('temp-unit') || 'C',
};

const tempUnitSlice = createSlice({
  name: 'tempUnit',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C';
      localStorage.setItem('temp-unit', state.unit);
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('temp-unit', state.unit);
    },
  },
});

export const { toggleUnit, setUnit } = tempUnitSlice.actions;
export default tempUnitSlice.reducer;
