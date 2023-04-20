import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface IUser {
  token: string,
  uuid: string,
  email: string,
  emailVerifiedAt: string|null,
  name: string,
  preferences?: {
      sources?: string[]
  },
  createdAt: string,
  updatedAt: string,
  isSignedIn?: boolean
}

const initialState: IUser = {
  token: "",
  uuid: "",
  email: "",
  emailVerifiedAt: "",
  name: "",
  preferences: {
      sources: []
  },
  createdAt: "",
  updatedAt: "",
  isSignedIn: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));

      state.token = action.payload.token;
      state.uuid = action.payload.uuid;
      state.email = action.payload.email;
      state.emailVerifiedAt = action.payload.emailVerifiedAt;
      state.name = action.payload.name;
      state.preferences = action.payload.preferences;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.isSignedIn = action.payload.token ? true : false;
    },

    signIn: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));

      state.token = action.payload.token;
      state.uuid = action.payload.uuid;
      state.email = action.payload.email;
      state.emailVerifiedAt = action.payload.emailVerifiedAt;
      state.name = action.payload.name;
      state.preferences = action.payload.preferences;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.isSignedIn = action.payload.token ? true : false;
    },

    signOut: (state) => {
      localStorage.removeItem("user");
      
      state.token = initialState.token;
      state.uuid = initialState.uuid;
      state.email = initialState.email;
      state.emailVerifiedAt = initialState.emailVerifiedAt;
      state.name = initialState.name;
      state.preferences = initialState.preferences;
      state.createdAt = initialState.createdAt;
      state.updatedAt = initialState.updatedAt;
      state.isSignedIn = false;
    },

    update: (state, action: PayloadAction<IUser>) => {
      const stringifiedUser = localStorage.getItem("user");
      let user: IUser = initialState;

      if (stringifiedUser) {
        user = JSON.parse(stringifiedUser);
      }

      localStorage.setItem("user", JSON.stringify({...user, ...action.payload}));

      state.emailVerifiedAt = action.payload.emailVerifiedAt;
      state.name = action.payload.name;
      state.preferences = action.payload.preferences;
      state.updatedAt = action.payload.updatedAt;
    },
    
  },
});

export const { signUp, signIn, signOut, update } = userSlice.actions;

export default userSlice.reducer;
