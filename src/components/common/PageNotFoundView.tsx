import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { translationValue } from '@locales/i18n';

const PageNotFoundView = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-dark-card py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl w-full space-y-8 text-center feature-card p-6 rounded-xl'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center justify-center w-12 h-12 mb-4 float-animation'>
            <AlertTriangle size={64} className='text-cyber-blue' />
          </div>
          <h1 className='text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple'>
            404
          </h1>
          <h2 className='mt-4 text-3xl font-bold text-cyber-blue'>
            {translationValue('pageNotFound')}
          </h2>
          <p className='mt-2 text-base'>{translationValue('pageNotFoundMessage')}</p>
        </div>

        <div className='mt-8 space-y-4'>
          <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center'>
            <Link
              to='/'
              className='inline-flex items-center justify-center px-5 py-3 border-2 border-cyber-blue text-cyber-blue rounded-lg text-base font-medium hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple transition-all duration-300'
            >
              <Home size={18} className='mr-2' />
              {translationValue('backToHome')}
            </Link>
            <button
              onClick={() => window.history.back()}
              className='inline-flex items-center justify-center px-5 py-3 border-2 border-cyber-blue text-cyber-blue rounded-lg text-base font-medium hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple transition-all duration-300'
            >
              <ArrowLeft size={18} className='mr-2' />
              {translationValue('backToPrevious')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundView;
