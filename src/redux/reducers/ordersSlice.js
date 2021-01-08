import { createSlice } from '@reduxjs/toolkit';
import { getOrders as getOrdersAPI, getOrder as getOrderAPI, updateOrderStatue as updateOrderStatueAPI, addOrder as addOrderAPI } from '../../WebAPI';
import { getCartToken, setCartToken } from '../../utils';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: [],
    cart: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
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

export const addOrder = (data) => (dispatch) =>
  addOrderAPI(data).then((newData) => {
    if (!newData.success) {
      dispatch(setOrder({}));
      return newData;
    }
    return newData;
  });

export const updateOrderStatue = (uuid) => (dispatch) =>
  updateOrderStatueAPI(uuid).then((res) => {
    if (!res.success) {
      dispatch(setOrder({}));
      return res;
    }
    return res;
  });

export const updateCart = (uuid) => (dispatch) => {
  const target = getCartToken();
  dispatch(setCart(target.length))
};

export const { setOrders, setOrder, setCart } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrder = (state) => state.orders.order;
export const selectCart = (state) => state.orders.cart;

export default ordersSlice.reducer;
