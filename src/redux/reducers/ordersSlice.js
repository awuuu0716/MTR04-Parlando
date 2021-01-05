import { createSlice } from '@reduxjs/toolkit';
import {
  getOrders as getOrdersAPI,
  getOrder as getOrderAPI,
} from '../../WebAPI';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: {},
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const getOrders = () => (dispatch) =>
  getOrdersAPI().then((res) => {
    if (!res.success) {
      return res.message;
    }
    dispatch(setOrders(res.data.orders));
    return res;
  });

export const getOrder = (uuid) => (dispatch) =>
  getOrderAPI(uuid).then((res) => {
    if (!res.success) {
      return res.message;
    }
    dispatch(setOrder(res.data.order));
    return res;
  });

export const { setOrders, setOrder } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrder = (state) => state.orders.order;

export default ordersSlice.reducer;
