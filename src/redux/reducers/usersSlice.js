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
    (res) => {
      if (!res.success) {
        return res;
      }
      dispatch(setUserLevel('member'));
      setAuthToken(res.data.token);
      return res.data.token;
    }
  );
};

export const updateUserData = (userData) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updateUserDataAPI(userData).then((res) => {
    if (!res.success) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    return res;
  });
};

export const adminLogin = ({ username, password }) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return adminLoginAPI({ username, password }).then((res) => {
    if (!res.success) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    setAuthToken(res.data.token);
    dispatch(setUserLevel('admin'));
    return res.data.token;
  });
};

export const login = ({ username, password }) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return loginAPI({ username, password }).then((res) => {
    if (!res.success) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    setAuthToken(res.data.token);
    dispatch(setUserLevel('member'));
    return res.data.token;
  });
};

export const getMemberInfo = () => (dispatch) => {
  return getMemberInfoAPI().then((res) => {
    console.log(res)
    if (!res.success) {
      setAuthToken('');
      return res;
    }
    if (res.data.admin) {
      dispatch(setUserLevel('admin'));
      return res
    }
    dispatch(setUserInfo(res.data.user));
    dispatch(setUserLevel('member'));
    return res;
  }).catch(err=>console.log(err));
};

// selector
export const selectErrorMessage = (state) => state.users.errorMessage;
export const selectUserLevel = (state) => state.users.userLevel;
export const selectUserInfo = (state) => state.users.userInfo;

export default usersSlice.reducer;
