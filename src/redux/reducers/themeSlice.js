import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isBackstageMode: false,
  },
  reducers: {
    setIsBackstageMode: (state, action) => {
      state.isBackstageMode = action.payload;
    },
  },
});

export const { setIsBackstageMode } = themeSlice.actions;

export const selectIsBackstageMode = (state) => state.theme.isBackstageMode;

export default themeSlice.reducer;
