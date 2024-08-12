import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { instance } from '../api/middleware/axiosInterceptor';

interface Tokens {
  accessToken: string;
  accessTokenTTL: string;
  refreshToken: string;
  refreshTokenTTL: string;
}

const saveTokens = (tokens: Tokens) => {
  const { accessToken, accessTokenTTL, refreshToken, refreshTokenTTL } = tokens;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('accessTokenTTL', accessTokenTTL);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('refreshTokenTTL', refreshTokenTTL);
};

const sendCode = async (userId: string, email: string) => {
  await instance({
    method: 'post',
    url: 'auth/verification',
    params: {
      userId: userId,
      email: email,
    },
  });
};

export const getUserInfo = createAsyncThunk(
  'users/me',
  async (userId: string, thunkAPI) => {
    try {
      const response = await instance.get(`/users/me`, {
        params: { userId: userId },
      });

      const { email } = response.data;

      return { email };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`/auth/login`, { email, password });

      saveTokens(response.data);

      const { userId } = jwtDecode<any>(localStorage.getItem('accessToken'));

      return { userId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await instance.post(`/auth/register`, {
        email: email,
        password: password,
      });

      saveTokens(response.data);

      const { userId } = jwtDecode<any>(localStorage.getItem('accessToken'));

      return { userId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const resendCode = createAsyncThunk(
  'auth/verification',
  async ({ userId, email }: { userId: string; email: string }, thunkAPI) => {
    try {
      await sendCode(userId, email);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const confirmCode = createAsyncThunk(
  'auth/confirm',
  async ({ userId, code }: { userId: string; code: string }, thunkAPI) => {
    try {
      await instance({
        method: 'post',
        url: '/auth/confirm',
        params: {
          userId: userId,
          code: code,
        },
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
