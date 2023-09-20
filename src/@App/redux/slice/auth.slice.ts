import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../rootReducer';
import { actionSetToastMessage } from './toastMessage.slice';

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
   async (data: { email: string; password: string }, action) => {
      try {
         const user = await authService.postLogin(data);
         action.dispatch(actionSetToastMessage({ message: 'Đăng nhập thành công!', status: 'success' }));
         return user as any;
      } catch (error: any) {
         action.dispatch(actionSetToastMessage({ message: error.response.data.message, status: 'error' }));
         throw new Error();
      }
   },
);

const actionGetUser = createAsyncThunk('auth/getUserInfo', async () => {
   try {
      const res = await authService.getUser();

      return res as any;
   } catch (error) {
      throw new Error();
   }
});

const actionLogout = createAsyncThunk('auth/postlogout', async (_, action) => {
   try {
      await authService.postLogout();
      action.dispatch(actionSetToastMessage({ message: 'Đăng xuất thành công!', status: 'success' }));
      return;
   } catch (error) {
      action.dispatch(actionSetToastMessage({ message: 'Đã có lỗi xảy ra!', status: 'error' }));
      throw new Error();
   }
});

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(actionLoginAccount.fulfilled, (state, action) => {
         if (action.payload.user) {
            state.user = action.payload.user;
            state.isAuhthentication = true;
         }
      });
      builder.addCase(actionGetUser.fulfilled, (state, action) => {
         state.user = action.payload.user;
         state.isAuhthentication = true;
         state.isInitialized = true;
      });
      builder.addCase(actionGetUser.rejected, (state, _action) => {
         state.isInitialized = true;
      });
      builder.addCase(actionLogout.fulfilled, (state, _action) => {
         state.user = null;
         state.isAuhthentication = false;
      });
   },
});

export const useAuth = () => {
   const dispatch: any = useDispatch();
   const auth = useSelector((state: RootReducer) => state.auth);

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
