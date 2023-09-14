import { Outlet, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRouter from './component/PrivateRouter';
import PublicRouter from './component/PublicRoute';

const Login = lazy(() => import('../pages/Login'));
const MainLayout = lazy(() => import('../component/Layout'));
const Home = lazy(() => import('../pages/Home'));
const CreatePost = lazy(() => import('../pages/CreatePost'));
const TopicPost = lazy(() => import('../pages/TopicPost'));
const TopicPostCreate = lazy(() => import('../pages/TopicPostCreate'));
const AuthorCreate = lazy(() => import('../pages/AuthorCreate'));
const Author = lazy(() => import('../pages/Author'));
const Tag = lazy(() => import('../pages/Tag'));
const TagCreate = lazy(() => import('../pages/TagCreate'));
const Post = lazy(() => import('../pages/Post'));

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
