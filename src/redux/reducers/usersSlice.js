import { createSlice } from '@reduxjs/toolkit';
import {
  signUp as signUpAPI,
  login as loginAPI,
  adminLogin as adminLoginAPI,
  getMemberInfo as getMemberInfoAPI,
  updateUserData as updateUserDataAPI,
} from '../../WebAPI';
import { setAuthToken } from '../../utils';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userLevel: 'guest',
    userInfo: {},
    errorMessage: '',
  },
  reducers: {
    setUserLevel: (state, action) => {
      state.userLevel = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
});

export const {
  setUserLevel,
  setErrorMessage,
  setUserInfo,
} = usersSlice.actions;

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
      dispatch(setUserLevel('member'));
      setAuthToken(data.token);
      return data.token;
    }
  );
};

export const updateUserData = (userData) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updateUserDataAPI(userData).then((data) => {
    if (data.message) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    return data;
  });
};

export const adminLogin = ({ username, password }) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return adminLoginAPI({ username, password }).then((data) => {
    if (!data.token) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    dispatch(setUserLevel('admin'));
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
    dispatch(setUserLevel('member'));
    return data.token;
  });
};

export const getMemberInfo = () => (dispatch) => {
  return getMemberInfoAPI().then((data) => {
    if (data.message) {
      setAuthToken('');
      return;
    }
    if (data.admin) return dispatch(setUserLevel('admin'));
    dispatch(setUserInfo(data.user));
    dispatch(setUserLevel('member'));
  });
};

// selector
export const selectErrorMessage = (state) => state.users.errorMessage;
export const selectUserLevel = (state) => state.users.userLevel;
export const selectUserInfo = (state) => state.users.userInfo;

export default usersSlice.reducer;
