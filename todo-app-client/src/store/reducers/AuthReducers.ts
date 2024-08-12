import { PayloadAction } from '@reduxjs/toolkit';

export const handlePending = (state: any) => {
  state.isLoading = true;
};

export const handleRejected = (
  state: any,
  { payload }: PayloadAction<string>,
) => {
  state.isLoading = false;
  if (!payload) return;
  state.error = payload;
};

export const handleAuthFulfilled = (
  state: any,
  { payload }: PayloadAction<{ userId: string }>,
) => {
  state.isLoading = false;
  state.error = '';
  state.userId = payload.userId;
};

export const handleGetUserInfo = (
  state: any,
  { payload }: PayloadAction<{ email: string }>,
) => {
  state.isLoading = false;
  state.error = '';
  state.email = payload.email;
};

export const handleVerificationCodeFulfilled = (state: any) => {
  state.isLoading = false;
};
