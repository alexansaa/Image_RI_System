
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './image/imageSlice.jsx';

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export default store;