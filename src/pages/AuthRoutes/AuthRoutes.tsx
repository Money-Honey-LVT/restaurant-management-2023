import React, { ReactChildren, ReactComponentElement, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { decodeToke } from '../../utils/helpers';

interface Props {
  children: ReactNode;
}
const AuthRoutes = ({ children }: Props) => {
  const decodedToken = decodeToke();
  return !decodedToken ? <Navigate to={ROUTER.AUTH.LOGIN} /> : <>{children}</>;
};

export default AuthRoutes;
