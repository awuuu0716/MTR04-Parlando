import { createSlice } from '@reduxjs/toolkit';
import {
  getProduct as getProductAPI,
  getModel as getModelAPI,
  deleteModel as deleteModelAPI,
  updateModelStatus as updateModelStatusAPI,
  updateModel as updateModelAPI,
  addModel as addModelAPI
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
  getProductAPI(id).then((res) => {
    if (!res.success) {
      dispatch(setModels([]));
      return res;
    }
    dispatch(setModels(res.data.product.Product_models));
    return res.data.product.Product_models;
  });

export const getModel = (id) => (dispatch) =>
  getModelAPI(id).then((res) => {
    if (!res.success) {
      dispatch(setModel({}));
      return res;
    }
    dispatch(setModel(res.data.model));
    return res.data.model;
  });

export const deleteModel = (id) => (dispatch) =>
  deleteModelAPI(id).then((res) => {
    if (!res.success) {
      dispatch(setErrorMessage(res.message));
      return res;
    }
    return res;
  });

export const updateModelStatus = (data) => (dispatch) =>
  updateModelStatusAPI(data).then((newData) => {
    if (!newData.success) {
      dispatch(setErrorMessage(newData.message));
      return newData;
    }
    dispatch(setModel(newData.data.model));
    return newData;
  });

export const updateModel = (data) => (dispatch) =>
  updateModelAPI(data).then((newData) => {
    if (!newData.success) {
      dispatch(setErrorMessage(newData.message));
      return newData;
    }
    return newData;
  });

export const addModel = (data) => (dispatch) =>
  addModelAPI(data).then((newData) => {
    if (!newData.success) {
      dispatch(setErrorMessage(newData.message));
      return newData;
    }
    return newData.data;
  });


export const { setModels, setModel, setErrorMessage } = modelsSlice.actions;

export const selectModels = (state) => state.models.models;
export const selectModel = (state) => state.models.model;
export const selectErrorMessage = (state) => state.models.errorMessage;

export default modelsSlice.reducer;
