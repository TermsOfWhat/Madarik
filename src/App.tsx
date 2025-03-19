import { Provider } from 'react-redux';
import { store } from './modules/shared/store';
import AuthProvider from './modules/auth/context/AuthProvider';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* Your app content */}
      </AuthProvider>
    </Provider>
  );
}

export default App; 