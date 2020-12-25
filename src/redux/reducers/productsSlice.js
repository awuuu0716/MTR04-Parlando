import { createSlice } from '@reduxjs/toolkit';
import {
  getProducts as getProductsAPI,
  getProduct as getProductAPI,
} from '../../WebAPI';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const getProducts = (filter) => (dispatch) =>
  getProductsAPI(filter).then((data) => {
    if (data.message) {
      return data;
    }
    dispatch(setProducts(data.products));
    return data;
  });

export const getProduct = (id) => (dispatch) =>
  getProductAPI(id).then((data) => {
    if (data.message) {
      dispatch(setProduct({}));
      return data;
    }
    dispatch(setProduct(data.product));
    return data.product;
  });

export const { setProducts, setProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;

export default productsSlice.reducer;
