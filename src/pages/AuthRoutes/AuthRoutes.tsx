import React, {
  ReactChildren,
  ReactComponentElement,
  ReactElement,
  ReactNode,
} from 'react';
import { Navigate } from 'react-router-dom';
import ROUTER from '../../config/router';

interface Props {
  children: ReactNode;
}
const AuthRoutes = ({ children }: Props) => {
  const isAuth = localStorage.getItem('authUser');

  return !isAuth ? <Navigate to={ROUTER.AUTH.LOGIN} /> : <>{children}</>;
};

export default AuthRoutes;
