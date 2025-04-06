import './wdyr';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import App from '@pages/App';
import { I18nextProvider } from 'react-i18next';
import i18n from '@locales/i18n';

const container = document.getElementById('app');

const root = createRoot(container!); // 强制断言 container 不为空

root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
);
