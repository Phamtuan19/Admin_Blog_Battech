import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';

interface TypeAuthService<T = any> {
   user: Record<string, T> | null;
   isAuhthentication: boolean;
   isInitialized: boolean;
}

const initialState: TypeAuthService = {
   user: null,
   isAuhthentication: false,
   isInitialized: false,
};

const actionLoginAccount = createAsyncThunk(
   'auth/loginAccount',
   async (data: { email: string; password: string }, thunkAPI) => {
      try {
         const user = await authService.postLogin(data);
         return user;
      } catch (error) {
         throw new Error();
      }
   },
);

const actionGetUser = createAsyncThunk('auth/getUserInfo', async () => {
   try {
      const res = await authService.getUser();
      console.log(res);
      return res;
   } catch (error) {
      throw new Error();
   }
});

const actionLogout = createAsyncThunk('auth/postlogout', async () => {
   try {
      const res = await authService.postLogout();
      console.log(res);
   } catch (error) {
      throw new Error();
   }
});

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(actionLoginAccount.fulfilled, (state, action) => {
         state.isAuhthentication = true;
      });
      builder.addCase(actionGetUser.fulfilled, (state, action) => {
         // state.user = action.payload?.user;
         state.isAuhthentication = true;
         state.isInitialized = true;
      });
      builder.addCase(actionGetUser.rejected, (state, action) => {
         state.isInitialized = true;
      });
      builder.addCase(actionLogout.fulfilled, (state, action) => {
         state.user = null;
         state.isAuhthentication = false;
      });
   },
});

export const useAuth = () => {
   const dispatch: any = useDispatch();
   const auth = useSelector((state: any) => state.auth);

   const postLogin = (data: { email: string; password: string }) => {
      dispatch(actionLoginAccount(data));
   };

   const getUser = () => {
      dispatch(actionGetUser());
   };

   const postLogout = () => {
      dispatch(actionLogout());
   };

   return { auth, postLogin, getUser, postLogout };
};

export default authSlice;
