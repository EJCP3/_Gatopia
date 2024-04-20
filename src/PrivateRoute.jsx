import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from './supabase/client';

const PrivateRoute = () => {
  const session = supabase.auth.getSession();
  console.log("Session:", session); 

  return session ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute