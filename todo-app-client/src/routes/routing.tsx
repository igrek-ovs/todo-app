import CheckoutError from '../components/payment/CheckoutError';
import CheckoutSuccess from '../components/payment/CheckoutSuccess';
import ConfirmForm from '../components/auth/ConfirmForm';
import React from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from '../components/guard/authguard';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Task from '../pages/tasks/task';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/confirm" Component={ConfirmForm} />
        <Route
          path="/tasks"
          element={
            <AuthGuard>
              <Task />
            </AuthGuard>
          }
        />
        <Route path="/checkout-success" Component={CheckoutSuccess} />
        <Route path="/checkout-error" Component={CheckoutError} />
      </Routes>
    </Router>
  );
};

export default Routing;
