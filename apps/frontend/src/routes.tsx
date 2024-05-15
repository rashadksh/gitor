import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';



import Signup from './pages/auth/signup-page';
import Login from './pages/auth/login-page';
import Dashboard from './pages/home-page';


export interface RoutesProps
{
  x?: boolean;
}

export const Routes: React.FC<RoutesProps> = () =>
{
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route index element={<h1>Hello main</h1>} />
        <Route path='auth'>
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />;

      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
