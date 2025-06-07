import { FC } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from '../../services/store';
import { selectIsAuth } from '../../services/slices/UserSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
