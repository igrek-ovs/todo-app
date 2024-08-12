import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Task } from '../../models/Task';
import { instance } from '../api/middleware/axiosInterceptor';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (userId: string, thunkAPI) => {
    try {
      const response = await instance.get('/tasks', {
        params: { userId, filter: { name: '' } },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchTasksByName = createAsyncThunk(
  'tasks/fetchByName',
  async (
    { userId, searchTerm }: { userId: string; searchTerm: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.get('/tasks', {
        params: { userId, filter: { name: searchTerm } },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const createTask = createAsyncThunk(
  'tasks/create',
  async (task: any, thunkAPI) => {
    try {
      const response = await instance.post('/tasks', task);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (task: Task, thunkAPI) => {
    try {
      const response = await instance.put('/tasks', task, {
        params: { taskId: task.id },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const completeTask = createAsyncThunk(
  'tasks/complete',
  async (taskId: string, thunkAPI) => {
    try {
      const response = await instance({
        method: 'PUT',
        url: '/tasks/complete_task',
        params: {
          taskId: taskId,
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId: string, thunkAPI) => {
    try {
      await instance.delete('/tasks', {
        params: { taskId: taskId },
      });

      return taskId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
