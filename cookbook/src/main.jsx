import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import PageRoutes from './routes';
import store from './store/store';
import './sass/main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  </StrictMode>,
);