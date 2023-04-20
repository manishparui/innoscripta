import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface IPreferences {
  sources?: string[]
}

const initialState: IPreferences = {
  sources: []
}

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IPreferences>) => {
      state.sources = action.payload.sources;
    },
    
  },
});

export const { update } = preferencesSlice.actions;

export default preferencesSlice.reducer;