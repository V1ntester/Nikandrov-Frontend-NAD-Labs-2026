import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = { id: number; username: string };

type AuthState =
  | { status: 'guest'; user: null }
  | { status: 'authenticated'; user: User };

const initialState: AuthState = { status: 'guest', user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    signedIn: (_state, action: PayloadAction<User>): AuthState => ({
      status: 'authenticated',
      user: action.payload,
    }),
    signedOut: (): AuthState => initialState,
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;
