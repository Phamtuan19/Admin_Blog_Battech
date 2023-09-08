import { Outlet, useRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import PublicRouter from './component/PublicRoute';
import PrivateRouter from './component/PrivateRouter';
import MainLayout from '../component/Layout';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';

const routes = [
   {
      path: '/',
      element: (
         <PrivateRouter>
            <MainLayout />
         </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: 'posts',
            element: <Outlet />,
            children: [
               {
                  index: true,
                  element: <h1>Danh sách bài viết</h1>,
               },
               {
                  path: 'create',
                  element: <CreatePost />,
               },
            ],
         },
      ],
   },
   {
      path: '/login',
      element: <PublicRouter />,
      children: [
         {
            index: true,
            element: <Login />,
         },
      ],
   },
   {
      path: '/*',
      element: <h1>404</h1>,
   },
];

export default function Routers() {
   return useRoutes(routes);
}
