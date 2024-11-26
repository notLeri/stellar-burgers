import { useSelector } from '../../services/store';
// import { isAuthCheckedSelector, userDataSelector } from '../services/store/selectors';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  return children;
};
