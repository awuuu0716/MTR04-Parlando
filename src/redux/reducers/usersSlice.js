import { createSlice } from '@reduxjs/toolkit';
import {
  signUp as signUpAPI,
  login as loginAPI,
  adminLogin as adminLoginAPI,
  getMe as getMeAPI,
} from '../../WebAPI';
import { setAuthToken } from '../../utils';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLogin: false,
    isAdmin: false,
    errorMessage: '',
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsLogin, setErrorMessage, setIsAdmin } = usersSlice.actions;

export const signUp = ({ username, password, realName, email, phone }) => (
  dispatch
) => {
  dispatch(setErrorMessage(''));
  return signUpAPI({ username, password, realName, email, phone }).then(
    (data) => {
      if (data.ok === 0) {
        dispatch(setErrorMessage(data.message));
        return;
      }
      dispatch(setIsLogin(true));
      setAuthToken(data.token);
      return data.token;
    }
  );
};

export const adminLogin = ({ username, password }) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return adminLoginAPI({ username, password }).then((data) => {
    if (!data.token) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    dispatch(setIsLogin(true));
    dispatch(setIsAdmin(true));
    return data.token;
  });
};

export const login = ({ username, password }) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return loginAPI({ username, password }).then((data) => {
    if (!data.token) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    dispatch(setIsLogin(true));
    return data.token;
  });
};

export const getMe = () => (dispatch) => {
  return getMeAPI().then((data) => {
    console.log(data)
    if (data.message) {
      setAuthToken('');
      return;
    } else if (data.user.username === 'Oliver') {
      dispatch(setIsLogin(true));
      dispatch(setIsAdmin(true));
    }
    dispatch(setIsLogin(true));
  });
};

// selector
export const selectErrorMessage = (state) => state.users.errorMessage;
export const selectIsLogin = (state) => state.users.isLogin;
export const selectIsAdmin = (state) => state.users.isAdmin;

export default usersSlice.reducer;
