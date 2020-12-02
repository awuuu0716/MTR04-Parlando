import { configureStore } from '@reduxjs/toolkit';
import customerSlice from '../reducers/customerSlice';

export default configureStore({
  reducer: {
    counter: customerSlice,
  },
});
