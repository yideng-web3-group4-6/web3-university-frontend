import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Course from '@/pages/Course';
import Loading from '@/components/common/Loading';
import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CourseDetail from '@/pages/CourseDetail';

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/course', element: <Course /> },
    { path: '/course/:id', element: <CourseDetail /> },
    { path: '*', element: <PageNotFoundView /> },
    { path: '/404', element: <PageNotFoundView /> },
  ],
};

Routes.push(mainRoutes);

export default Routes;
