import { createSlice } from '@reduxjs/toolkit';
import {
  getProduct as getProductAPI,
  getModel as getModelAPI,
  deleteModel as deleteModelAPI,
  updateModelStatus as updateModelStatusAPI,
} from '../../WebAPI';

export const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    models: [],
    model: {},
    errorMessage: '',
  },
  reducers: {
    setModels: (state, action) => {
      state.models = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const getModels = (id) => (dispatch) =>
  getProductAPI(id).then((data) => {
    if (data.message) {
      return data;
    }
    dispatch(setModels(data.product.Product_models));
    return data.product.Product_models;
  });

export const getModel = (id) => (dispatch) =>
  getModelAPI(id).then((data) => {
    if (data.message) {
      dispatch(setModel({}));
      return data;
    }
    dispatch(setModel(data.model));
    return data.model;
  });

export const deleteModel = (id) => (dispatch) =>
  deleteModelAPI(id).then((data) => {
    if (!data.success) {
      dispatch(setErrorMessage(data.message));
      return data;
    }
    return data;
  });

export const updateModelStatus = (data) => (dispatch) =>
  updateModelStatusAPI(data).then((newData) => {
    if (newData.message) {
      dispatch(setErrorMessage(newData.message));
      return newData;
    }
    return newData;
  });

export const updateModel = (data) => (dispatch) =>
  updateProductAPI(data).then((newData) => {
    if (newData.message) {
      dispatch(setErrorMessage(data.message));
      return newData;
    }
    return newData;
  });

export const { setModels, setModel, setErrorMessage } = modelsSlice.actions;

export const selectModels = (state) => state.models.models;
export const selectModel = (state) => state.models.model;
export const selectErrorMessage = (state) => state.models.errorMessage;

export default modelsSlice.reducer;
