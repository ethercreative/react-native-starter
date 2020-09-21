import * as React from 'react';
import * as Sentry from 'sentry-expo';
import App from './app/App';

Sentry.init({
  dsn: '',
  enableInExpoDevelopment: false,
  debug: true,
});

export default () => <App />;
