
import './estilos/styles.scss'
import Header from './Header'
import Publicaciones from './Publicaciones'
import Navegacion from './Navegacion'
import { supabase } from "../../supabase/client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatoPerfil from './DatoPerfil';
import { FALSE } from 'sass';


const Home =  () => {
  const navigate = useNavigate();
  const [perfilCompleto, setPerfilCompleto] = useState(false); 
  const [openPerfil, setOpenPerfil] = useState(FALSE);



  useEffect(() => {
    const checkProfileCompletion = async () => {
      const { data: user, error } = await supabase.auth.getUser();

   
      const { data, error: profileError } = await supabase
        .from('usuario')
        .select('*')
        .eq('userID', user.user.id)
        .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile data:', profileError.message);
          setPerfilCompleto(false);
        } else if (!data) {
          console.log('No profile data found, showing profile form');
          setPerfilCompleto(false);
          setOpenPerfil(true)
        } else {
          setPerfilCompleto(hasRequiredFields(data));
        }
      };

    checkProfileCompletion();
  }, [navigate]);
 // Empty dependency array to fetch data only once on mount

  const hasRequiredFields = (data) => {
    // Replace with actual conditions for a complete profile
    return data && data.nombre_usuario && data.provincia && data.descripción;  };

 

  return (
    <section className='home'>
    {perfilCompleto ? ( // Reemplaza con tu condición de DatoPerfil
      <>
        <Navegacion />
        <Header />
        <section className='home-publicacion'>
          <Publicaciones />
         
        </section>
      </>
    ) : (
      <DatoPerfil open={openPerfil} onProfileCompletion={setPerfilCompleto}  /> 
    )}
  </section>
  )
}

export default Home