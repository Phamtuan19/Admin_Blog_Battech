import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../rootReducer';

export interface ToastMessageStatus {
   message: string | null;
   status: 'success' | 'error' | 'info' | 'warning';
}

const initialState: ToastMessageStatus = {
   message: null,
   status: 'info',
};

const toastMessageSlice = createSlice({
   name: 'toastMessage',
   initialState,
   reducers: {
      actionSetToastMessage(state, action) {
         state.message = action.payload.message;
         if (action.payload.status) state.status = action.payload.status;
      },
   },
});

export const { actionSetToastMessage } = toastMessageSlice.actions;

export const useToastMessage = () => {
   const dispatch = useDispatch();

   const toastMessage = useSelector((state: RootReducer) => state.toastMessage);

   const setToastMessage = (message: string | null, status: 'success' | 'error' | 'info' | 'warning' = 'info') => {
      dispatch(actionSetToastMessage({ message, status }));
   };

   return { toastMessage, setToastMessage };
};

export default toastMessageSlice;
