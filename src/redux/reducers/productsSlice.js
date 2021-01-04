import { createSlice } from '@reduxjs/toolkit';
import {
  getProducts as getProductsAPI,
  getProduct as getProductAPI,
  deleteProduct as deleteProductAPI,
  updateProductStatus as updateProductStatusAPI,
  updateProduct as updateProductAPI,
  addProduct as addProductAPI,

} from '../../WebAPI';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    errorMessage: '',
    article:{},
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setArticle: (state, action) => {
      state.article = action.payload;
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
    // dispatch(setArticle(JSON.parse(data.product.article)));
    return data.product;
  });

export const deleteProduct = (id) => (dispatch) =>
  deleteProductAPI(id).then((data) => {
    if (!data.success) {
      dispatch(setErrorMessage(data.message));
      return data;
    }
    return data;
  });

export const updateProductStatus = (data) => (dispatch) =>
  updateProductStatusAPI(data).then((newData) => {
    if (newData.message) {
      dispatch(setErrorMessage(newData.message));
      return newData;
    }
    return newData;
  });

export const updateProduct = (data) => (dispatch) =>
  updateProductAPI(data).then((newData) => {
    if (newData.message) {
      dispatch(setErrorMessage(data.message));
      return newData;
    }
    return newData;
  });

export const addProduct = (data) => (dispatch) =>
  addProductAPI(data).then((newData) => {
    if (newData.message) {
      dispatch(setErrorMessage(data.message));
      return newData;
    }
    dispatch(setProduct(data.product))
    return newData;
  });


export const { setProducts, setProduct, setErrorMessage,setArticle} = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;
export const selectErrorMessage = (state) => state.products.errorMessage;
export const selectArticle= (state) => state.products.article;


export default productsSlice.reducer;
