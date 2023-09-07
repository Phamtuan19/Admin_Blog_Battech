import { useRoutes } from 'react-router-dom';
import Login from '../pages/Login';

const routes = [
   {
      path: '/',
      element: <h1>Trang home</h1>,
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/*',
      element: <h1>404</h1>,
   },
];

export default function Routers() {
   return useRoutes(routes);
}
