import { createSlice } from '@reduxjs/toolkit';
import {
  confirmCode,
  getUserInfo,
  login,
  register,
  resendCode,
} from '../actions/AuthActions';
import {
  handleAuthFulfilled,
  handleGetUserInfo,
  handlePending,
  handleRejected,
  handleVerificationCodeFulfilled,
} from './AuthReducers';

interface AuthState {
  userId: string;
  email: string;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  userId: '',
  email: '',
  isLoading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled.type, handleAuthFulfilled)
      .addCase(login.pending.type, handlePending)
      .addCase(login.rejected.type, handleRejected)
      .addCase(register.fulfilled.type, handleAuthFulfilled)
      .addCase(register.pending.type, handlePending)
      .addCase(register.rejected.type, handleRejected)
      .addCase(resendCode.fulfilled.type, handleVerificationCodeFulfilled)
      .addCase(resendCode.pending.type, handlePending)
      .addCase(resendCode.rejected.type, handleRejected)
      .addCase(confirmCode.fulfilled.type, handleVerificationCodeFulfilled)
      .addCase(confirmCode.pending.type, handlePending)
      .addCase(confirmCode.rejected.type, handleRejected)
      .addCase(getUserInfo.fulfilled.type, handleGetUserInfo)
      .addCase(getUserInfo.rejected.type, handleRejected)
      .addCase(getUserInfo.pending.type, handlePending);
  },
});

export default authSlice.reducer;
