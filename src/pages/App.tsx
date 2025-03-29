import { useRoutes } from 'react-router-dom';
import Routes from '@/routes';
import { Web3Provider } from '@components/common/Web3Provider';

const App = () => {
  const routing = useRoutes(Routes);
  return <Web3Provider>{routing}</Web3Provider>;
};
export default App;
