import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../api/middleware/axiosInterceptor';

export const checkoutPayment = createAsyncThunk(
  'payment/create-checkout-session',
  async ({ taskId, amount }: { taskId: string; amount: number }, thunkAPI) => {
    try {
      const response = await instance({
        url: '/payment/create-checkout-session',
        method: 'POST',
        params: {
          taskId: taskId,
          amount: amount,
        },
      });

      const { url } = response.data;

      window.location.href = url;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
