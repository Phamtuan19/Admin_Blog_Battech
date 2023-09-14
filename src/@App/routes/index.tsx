import { Outlet, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRouter from './component/PrivateRouter';
import PublicRouter from './component/PublicRoute';
import MainLayout from '../component/Layout';
import EditAuthor from '../pages/EditAuthor';

const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const CreatePost = lazy(() => import('../pages/CreatePost'));
const TopicPost = lazy(() => import('../pages/TopicPost'));
const TopicPostCreate = lazy(() => import('../pages/TopicPostCreate'));
const AuthorCreate = lazy(() => import('../pages/AuthorCreate'));
const Author = lazy(() => import('../pages/Author'));
const Tag = lazy(() => import('../pages/Tag'));
const TagCreate = lazy(() => import('../pages/TagCreate'));
const Post = lazy(() => import('../pages/Post'));
const EditPost = lazy(() => import('../pages/EditPost'));
const EditTopic = lazy(() => import('../pages/EditTopic'));

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
                  element: <TopicPost />,
               },
               {
                  path: 'create',
                  element: <TopicPostCreate />,
               },
               {
                  path: ':topicId',
                  element: <EditTopic />,
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
               {
                  path: ':authorId',
                  element: <EditAuthor />,
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
