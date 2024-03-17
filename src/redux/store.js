import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;