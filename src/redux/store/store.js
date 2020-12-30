import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/themeSlice';
import usersSlice from '../reducers/usersSlice';
import productsSlice from '../reducers/productsSlice';
import modelsSlice from '../reducers/modelsSlice';
import ordersSlice from '../reducers/ordersSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    users: usersSlice,
    products: productsSlice,
    models:modelsSlice,
    orders: ordersSlice,
  },
});
