import { createSlice } from '@reduxjs/toolkit';
import { checkoutPayment } from '../actions/PaymentActions';
import {
  handlePaymentFulfilled,
  handlePending,
  handleRejected,
} from './PaymentReducers';

interface PaymentState {
  taskId: string;
  amount: number;
  isLoading: boolean;
  error: string;
}

const initialState: PaymentState = {
  taskId: '',
  amount: 0,
  isLoading: false,
  error: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutPayment.fulfilled.type, handlePaymentFulfilled)
      .addCase(checkoutPayment.pending.type, handlePending)
      .addCase(checkoutPayment.rejected.type, handleRejected);
  },
});

export default paymentSlice.reducer;
