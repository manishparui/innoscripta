import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: {type: string} = {
  type: "generic"
}

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    
  },
});

export const { changeType } = feedSlice.actions;

export default feedSlice.reducer;
