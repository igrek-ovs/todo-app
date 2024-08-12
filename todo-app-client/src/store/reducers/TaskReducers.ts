import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../models/Task';

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

export const handleFetchTasksFulfilled = (
  state: any,
  { payload }: PayloadAction<Task[]>,
) => {
  state.isLoading = false;
  state.error = '';
  state.tasks = payload;
};

export const handleCreateTaskFulfilled = (
  state: any,
  { payload }: PayloadAction<Task>,
) => {
  state.isLoading = false;
  state.error = '';
  state.tasks.push(payload);
};

export const handleUpdateTaskFulfilled = (
  state: any,
  { payload }: PayloadAction<Task>,
) => {
  state.isLoading = false;
  state.error = '';
  state.tasks = state.tasks.map((task: Task) =>
    task.id === payload.id ? payload : task,
  );
};

export const handleDeleteTaskFulfilled = (
  state: any,
  { payload }: PayloadAction<string>,
) => {
  state.isLoading = false;
  state.error = '';
  state.tasks = state.tasks.filter((task: Task) => task.id !== payload);
};
