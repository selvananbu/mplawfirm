import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nContext.jsx';
import { FontScaleProvider } from './accessibility/FontScaleProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <FontScaleProvider>
        <App />
      </FontScaleProvider>
    </I18nProvider>
  </StrictMode>,
);
