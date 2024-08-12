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

export const handlePaymentFulfilled = (
  state: any,
  { payload }: PayloadAction<{ taskId: string; amount: number }>,
) => {
  state.isLoading = false;
  state.error = '';
  state.userId = payload.taskId;
  state.email = payload.amount;
};
