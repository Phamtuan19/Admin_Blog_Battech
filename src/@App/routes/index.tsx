import { Outlet, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRouter from './component/PrivateRouter';
import PublicRouter from './component/PublicRoute';
import MainLayout from '../component/Layout';

const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const CreatePost = lazy(() => import('../pages/Post/CreatePost'));
const Topic = lazy(() => import('../pages/Topic'));
const CreateTopic = lazy(() => import('../pages/Topic/CreateTopic'));
const CreateAuthor = lazy(() => import('../pages/Author/CreateAuthor'));
const UpdateAuthor = lazy(() => import('../pages/Author/UpdateAuthor'));
const Author = lazy(() => import('../pages/Author'));
const Tag = lazy(() => import('../pages/Tag'));
const Post = lazy(() => import('../pages/Post'));
const CreateTag = lazy(() => import('../pages/Tag/CreateTag'));
const EditPost = lazy(() => import('../pages/Post/UpdatePost'));
const UpdateTopic = lazy(() => import('../pages/Topic/UpdateTopic'));

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
                  path: ':postId',
                  element: <EditPost />,
               },
            ],
         },
         {
            path: 'topic',
            element: <Outlet />,
            children: [
               {
                  index: true,
                  element: <Topic />,
               },
               {
                  path: 'create',
                  element: <CreateTopic />,
               },
               {
                  path: ':topicId',
                  element: <UpdateTopic />,
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
                  element: <CreateAuthor />,
               },
               {
                  path: ':authorId',
                  element: <UpdateAuthor />,
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
                  element: <CreateTag />,
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
