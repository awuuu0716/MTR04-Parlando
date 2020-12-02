import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    carousel: null,
  },
  reducers: {
    setCarousel: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setCarousel } = customerSlice.actions;

export const selectCarousel = (state) => state.blog.carousel;

export default customerSlice.reducer;
