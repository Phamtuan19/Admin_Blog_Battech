import React, { useEffect } from 'react';
import { useAuth } from '../redux/slice/auth.slice';

function InitApp(props: { children: React.ReactNode }) {
   const { getUser } = useAuth();

   useEffect(() => {
      getUser();
   }, []);

   return props.children;
}

export default InitApp;
