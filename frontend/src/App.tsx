import { HeroUIProvider } from '@heroui/react';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import Router from './router/router';

const authStore = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
});

function App() {
  return (
    <AuthProvider store={authStore}>
      <HeroUIProvider>
        <Router />
      </HeroUIProvider>
    </AuthProvider>
  );
}

export default App;
