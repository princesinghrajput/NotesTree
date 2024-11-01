import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Link to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}; 