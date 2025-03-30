import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const PageNotFoundView = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 text-center'>
        <div className='flex flex-col items-center'>
          <AlertTriangle size={64} className='text-amber-500 mb-4' />
          <h1 className='text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600'>
            404
          </h1>
          <h2 className='mt-4 text-3xl font-bold'>页面未找到</h2>
          <p className='mt-2 text-base'>很抱歉，我们无法找到您要访问的页面。</p>
        </div>

        <div className='mt-8 space-y-4'>
          <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center'>
            <Link
              to='/'
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200'
            >
              <Home size={18} className='mr-2' />
              返回首页
            </Link>
            <button
              onClick={() => window.history.back()}
              className='inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200'
            >
              <ArrowLeft size={18} className='mr-2' />
              返回上一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundView;
