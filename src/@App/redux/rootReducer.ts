import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/auth.slice';
import toastMessageSlice from './slice/toastMessage.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [toastMessageSlice.name]: toastMessageSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
