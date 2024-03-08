import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/context';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
