import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

const initialState = {
   user: null,
   isAuhthentication: false,
   isInitialized: false,
};

const actionLoginAccount = createAsyncThunk('auth/loginAccount', async () => {
   const user = await authService.postLogin()
});

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
});

export default authSlice.reducer;
