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
  getOrdersAPI().then((res) => {
    if (!res.success) {
      dispatch(setOrders([]));
      return res;

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

export const updateOrderStatue = (uuid) => (dispatch) =>
  updateOrderStatueAPI(uuid).then((res) => {
    if (!res.success) {
      dispatch(setOrder({}));
      return res;
    }
    return res;
  });

export const { setOrders, setOrder } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrder = (state) => state.orders.order;

export default ordersSlice.reducer;
