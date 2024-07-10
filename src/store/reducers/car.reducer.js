import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const M_API_KEY = process.env.REACT_APP_M_API;

export const fetchData = createAsyncThunk(
  'cars/fetchAllData',
  async () => {
    const response = await fetch(`https://mapon.com/api/v1/unit.json?key=${M_API_KEY}`);
    return await response.json();
  },
)

export const fetchRouteData = createAsyncThunk(
  'cars/fetchRouteData',
  async (arg, {getState}) => {
    const state = getState();
    const response = await fetch(`https://mapon.com/api/v1/route/list.json?key=${M_API_KEY}&from=${state.cars.startDate}&till=${state.cars.endDate}&unit_id=${state.cars.activeCarId}`);
    return await response.json();
  },
)

const carSlice = createSlice({
  name: 'user',
  initialState: {
    cars: [],
    status: '',
    activeCarId: '',
    startDate: '07-10-2024',
    endDate: '',
    route: [],
    isStartCalendarOpen: false,
    isEndCalendarOpen: false,
    isGoogleMapOpen: false,
    totalDistance: 0,
    startCoords: []
  },
  reducers: {
    setActiveCar: (state, action) => {
      state.activeCarId = action.payload;
    },
    toggleStartCalendar: (state) => {
      state.isStartCalendarOpen = !state.isStartCalendarOpen;
    },
    toggleEndCalendar: (state) => {
      state.isEndCalendarOpen = !state.isEndCalendarOpen;
    },
    toggleGoogleMap: (state) => {
      state.isGoogleMapOpen = true;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    countDistance: (state, action) => {
      state.totalDistance += action.payload;
    },
    restartDistanceCount: (state) => {
      state.totalDistance = 0;
    },
    setCoord: (state, action) => {
      state.startCoords.push(action.payload);
    },
    clearCoords: (state) => {
      state.startCoords = [];
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.cars = (action.payload);
      state.status = 'done';
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'error';
    })
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = 'pending';
    })
    builder.addCase(fetchRouteData.fulfilled, (state, action) => {
      state.route = (action.payload);
      state.status = 'done';
    })
  },
});

export default carSlice.reducer;

export const {
  setActiveCar,
  toggleStartCalendar,
  toggleEndCalendar,
  setStartDate,
  setEndDate,
  toggleGoogleMap,
  countDistance,
  restartDistanceCount,
  setCoord,
  clearCoords
} = carSlice.actions;