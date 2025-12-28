import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import Overview from './pages/dashboard/Overview';
import Products from './pages/dashboard/Products';
import Orders from './pages/dashboard/Orders';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Overview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<div className="text-white p-10">Customers Page</div>} />
            <Route path="settings" element={<div className="text-white p-10">Settings Page</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
