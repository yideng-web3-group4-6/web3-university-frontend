import './wdyr';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import App from '@pages/App';

const container = document.getElementById('app');

const root = createRoot(container!); // 强制断言 container 不为空

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
