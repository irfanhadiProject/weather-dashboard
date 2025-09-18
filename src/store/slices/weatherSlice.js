import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../../utils/fetchWeather';
import { fetchForecast } from '../../utils/fetchForecast';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city) => {
    const data = await fetchWeather(city);
    return data;
  },
  {
    condition: (city, { getState }) => {
      const { weather } = getState();

      if (weather.dataStatus === 'loading') return false;

      if (
        weather.data &&
        weather.data.name.toLowerCase() === city.toLowerCase()
      ) {
        return false;
      }
      return true;
    },
  }
);

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async (city) => {
    const data = await fetchForecast(city);
    return data;
  },
  {
    condition: (city, { getState }) => {
      const { weather } = getState();

      if (weather.forecastStatus === 'loading') return false;

      if (
        weather.forecast.length > 0 &&
        weather.data &&
        weather.data.name.toLowerCase() === city.toLowerCase()
      ) {
        return false;
      }
      return true;
    },
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    dataStatus: 'idle',
    forecast: [],
    forecastStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.dataStatus = 'loading';
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.dataStatus = 'success';
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.dataStatus = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(getForecast.pending, (state) => {
        state.forecastStatus = 'loading';
        state.error = null;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.forecastStatus = 'success';
        state.forecast = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.forecastStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
