import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/themeSlice';
import usersSlice from '../reducers/usersSlice';
import productsSlice from '../reducers/productsSlice';
import ordersSlice from '../reducers/ordersSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    users: usersSlice,
    products: productsSlice,
    orders: ordersSlice,
  },
});
