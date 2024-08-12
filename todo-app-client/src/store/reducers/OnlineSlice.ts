import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnlineState {
  isOnline: boolean;
}

const initialState: OnlineState = {
  isOnline: false,
};

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnline(state, { payload }: PayloadAction<boolean>) {
      state.isOnline = payload;
    },
  },
  extraReducers: {},
});

export const { setOnline } = onlineSlice.actions;
export default onlineSlice.reducer;
