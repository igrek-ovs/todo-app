import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToDoRoutes } from '../../routes/toDoRoutes';

export interface GuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: GuardProps) => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigate(ToDoRoutes.LOGIN);
    }
  }, [accessToken, refreshToken, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
