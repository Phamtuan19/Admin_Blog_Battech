import { Outlet, useRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import PublicRouter from './component/PublicRoute';
import PrivateRouter from './component/PrivateRouter';
import MainLayout from '../component/Layout';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import TopicPost from '../pages/TopicPost';
import TopicPostCreate from '../pages/TopicPostCreate';
import AuthorCreate from '../pages/AuthorCreate';
import Author from '../pages/Author';
import Tag from '../pages/Tag';
import TagCreate from '../pages/TagCreate';
import Post from '../pages/Post';

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
                  element: <Post />,
               },
               {
                  path: 'create',
                  element: <CreatePost />,
               },
               {
                  path: 'topic',
                  element: <Outlet />,
                  children: [
                     {
                        index: true,
                        element: <TopicPost />,
                     },
                     {
                        path: 'create',
                        element: <TopicPostCreate />,
                     },
                  ],
               },
               {
                  path: 'author',
                  element: <Outlet />,
                  children: [
                     {
                        index: true,
                        element: <Author />,
                     },
                     {
                        path: 'create',
                        element: <AuthorCreate />,
                     },
                  ],
               },
               {
                  path: 'tags',
                  element: <Outlet />,
                  children: [
                     {
                        index: true,
                        element: <Tag />,
                     },
                     {
                        path: 'create',
                        element: <TagCreate />,
                     },
                  ],
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
