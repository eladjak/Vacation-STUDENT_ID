import React from 'react';
import { ErrorBoundary } from './components';
import AppRoutes from './routes/index';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
