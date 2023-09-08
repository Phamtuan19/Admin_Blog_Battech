import React from 'react';
import { useAuth } from '../../redux/slice/auth.slice';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter(props: { children: React.ReactNode }) {
   const { auth } = useAuth();
   if (auth.isAuhthentication && auth.isInitialized) {
      return props.children || <Outlet />;
   }

   return <Navigate to="/login" replace />;
}
export default PrivateRouter;
