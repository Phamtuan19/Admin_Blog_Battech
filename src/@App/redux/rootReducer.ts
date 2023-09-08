import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/auth.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
});



export default rootReducer;
