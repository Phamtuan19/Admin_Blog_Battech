import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../redux/slice/auth.slice';

function PublicRouter(props: { children?: React.ReactNode }) {
   const { auth } = useAuth();
   if (auth.isAuhthentication && auth.isInitialized) {
      return <Navigate to="/" />;
   }
   return props.children || <Outlet />;
}
export default PublicRouter;
