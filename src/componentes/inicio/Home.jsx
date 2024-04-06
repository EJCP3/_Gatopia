
import './estilos/styles.scss'
import Header from './Header'
import Publicaciones from './Publicaciones'
import Navegacion from './Navegacion'
import { supabase } from "../../supabase/client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatoPerfil from './DatoPerfil';


const Home =  () => {
  const navigate = useNavigate();
  const [perfilCompleto, setPerfilCompleto] = useState(false); // Estado para almacenar si el perfil está completo

  useEffect(() => { // Efecto secundario para verificar el usuario y obtener datos del perfil
    // Obtiene el usuario actual

    if (!supabase.auth.getUser()) {
      navigate("/");
    }

    const checkProfileCompletion = async () => {
      const user = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('userID', user.data.user.id)
        .single();

      if (error) {
        console.log(data)
        console.error('Error fetching profile data:', error.message);
      } else {
        setPerfilCompleto(!!data && hasRequiredFields(data));
      }
    };

    checkProfileCompletion();
  }, []); // Empty dependency array to fetch data only once on mount

  const hasRequiredFields = (data) => {
    // Replace with actual conditions for a complete profile
    return data.nombre_usuario && data.provincia && data.descripción;
  };


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
      <DatoPerfil  onProfileCompletion={setPerfilCompleto}  /> // Renderizar DatoPerfil si el perfil está incompleto
    )}
  </section>
  )
}

export default Home