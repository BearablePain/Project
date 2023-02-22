import { render } from 'react-dom';
import React from 'React';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider';
import App from './app/App';
import 'shared/config/i18n/i18n';

render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>

  </BrowserRouter>,
  document.getElementById('root'),
);
