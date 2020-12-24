import { createSlice } from '@reduxjs/toolkit';
import { getProducts as getProductsAPI } from '../../WebAPI';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const getProducts = () => (dispatch) =>
  getProductsAPI().then((data) => {
    if (data.ok === 0) {
      return;
    }
    dispatch(setProducts(data));
  });

export const { setProducts } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;
