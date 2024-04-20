import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { useEffect } from 'react';


const HomeLayout = () => {


  

  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = supabase.auth.user(); // Obtiene el usuario actualmente autenticado

    if (!user) {
      navigate("/"); // Redirecciona al inicio si no hay un usuario autenticado
    }
  };

  

  


  return (
    <div>
        <Outlet />
    </div>
  )
}

export default HomeLayout