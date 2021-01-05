import { createSlice } from '@reduxjs/toolkit';
import { getOrders as getOrdersAPI, getOrder as getOrderAPI, updateOrderStatue as updateOrderStatueAPI } from '../../WebAPI';

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
  getOrdersAPI().then((data) => {
    if (data.message) {
      return data;
    }
    dispatch(setOrders(data.orders));
    return data;
  });

export const getOrder = (uuid) => (dispatch) =>
  getOrderAPI(uuid).then((data) => {
    if (data.message) {
      return data;
    }
    dispatch(setOrder(data.order));
    return data;
  });

export const updateOrderStatue = (uuid) => (dispatch) =>
updateOrderStatueAPI(uuid).then((data) => {
    if (!data.success) {
      dispatch(setOrder({}));
      return data;
    }
    return data;
  });

export const { setOrders, setOrder } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrder = (state) => state.orders.order;

export default ordersSlice.reducer;
