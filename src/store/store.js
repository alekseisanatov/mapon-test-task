import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './reducers/item.reducer';
import userReducer from './reducers/user.reducer';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    user: userReducer
  }
}) ;