import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPayment: null,
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
    discardCurrentPayment: (state) => {
      state.currentPayment = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentPayment, discardCurrentPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
