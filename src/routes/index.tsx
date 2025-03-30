import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Dapp from '@/pages/Dapp';
import Course from '@/pages/Course';
import Loading from '@/components/common/Loading';
import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);
const Test = lazy(() => import('@components/common/Test'));

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/course', element: <Course /> },
    { path: '/dapp', element: <Dapp /> },
    { path: '*', element: <PageNotFoundView /> },
    { path: '/404', element: <PageNotFoundView /> },
  ],
};
const DemoRoutes = {
  path: 'ldh',
  element: <Layout />,
  children: [{ path: 'test', element: <Test /> }],
};

Routes.push(mainRoutes, DemoRoutes);

export default Routes;
