import { Link, useLocation } from 'react-router-dom';
import { ConnectKitButton } from 'connectkit';
import { Home, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  // 判断当前路由是否激活
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className='bg-white shadow-sm sticky top-0 z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* 左侧 Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link to='/' className='text-xl font-bold text-indigo-600'>
              DeFi协议
            </Link>
          </div>

          {/* 中间导航 */}
          <nav className='hidden md:flex space-x-8'>
            <Link
              to='/'
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/')
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <Home size={18} className='mr-1' />
              首页
            </Link>
            <Link
              to='/dapp'
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/dapp')
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <LayoutDashboard size={18} className='mr-1' />
              应用
            </Link>
          </nav>

          {/* 右侧连接钱包按钮 */}
          <div className='flex items-center'>
            <ConnectKitButton />
          </div>

          {/* 移动端菜单按钮 */}
          <div className='md:hidden flex items-center'>
            <button
              type='button'
              className='bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-expanded='false'
            >
              <span className='sr-only'>打开菜单</span>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 - 可以根据状态显示或隐藏 */}
      {/* 这里可以添加一个状态控制的移动端下拉菜单 */}
    </header>
  );
};

export default Header;
