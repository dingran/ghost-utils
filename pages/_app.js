import '../styles/globals.css';

import { AuthProvider } from '../lib/auth';
const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default App;
