import { configureStore } from '@reduxjs/toolkit';
import carReducer from './reducers/car.reducer';

export const store = configureStore({
  reducer: {
    cars: carReducer,
  }
}) ;