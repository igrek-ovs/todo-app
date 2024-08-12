import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../models/Task';
import {
  completeTask,
  createTask,
  deleteTask,
  fetchTasks,
  fetchTasksByName,
  updateTask,
} from '../actions/TaskActions';
import {
  handleCreateTaskFulfilled,
  handleDeleteTaskFulfilled,
  handleFetchTasksFulfilled,
  handlePending,
  handleRejected,
  handleUpdateTaskFulfilled,
} from './TaskReducers';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled.type, handleFetchTasksFulfilled)
      .addCase(fetchTasks.pending.type, handlePending)
      .addCase(fetchTasks.rejected.type, handleRejected)
      .addCase(fetchTasksByName.fulfilled.type, handleFetchTasksFulfilled)
      .addCase(fetchTasksByName.pending.type, handlePending)
      .addCase(fetchTasksByName.rejected.type, handleRejected)
      .addCase(createTask.fulfilled.type, handleCreateTaskFulfilled)
      .addCase(createTask.pending.type, handlePending)
      .addCase(createTask.rejected.type, handleRejected)
      .addCase(updateTask.fulfilled.type, handleUpdateTaskFulfilled)
      .addCase(updateTask.pending.type, handlePending)
      .addCase(updateTask.rejected.type, handleRejected)
      .addCase(deleteTask.fulfilled.type, handleDeleteTaskFulfilled)
      .addCase(deleteTask.pending.type, handlePending)
      .addCase(deleteTask.rejected.type, handleRejected)
      .addCase(completeTask.fulfilled.type, handleUpdateTaskFulfilled)
      .addCase(completeTask.pending.type, handlePending)
      .addCase(completeTask.rejected.type, handleRejected);
  },
});

export default taskSlice.reducer;
