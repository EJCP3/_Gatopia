
import './estilos/styles.scss'
import Header from './Header'
import Publicaciones from './Publicaciones'
import Navegacion from './Navegacion'
import { supabase } from "../../supabase/client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home =  () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/");
    }
  }, [navigate]);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await supabase.auth.getUser();
       
        console.log(user.data.user.id)

      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, []);
  

  console.log("si")


  return (
    <section className='home'>
        <Navegacion/>
        <Header/>
        <section className='home-publicacion'>
        <Publicaciones/>
        <Publicaciones/>
        </section>
        

    </section>
  )
}

export default Home