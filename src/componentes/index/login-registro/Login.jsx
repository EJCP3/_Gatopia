import {  useEffect, useState } from 'react';
import './Login.scss'
import { supabase } from '../../../supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast,Toaster } from 'sonner';


const Login = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try{
    const {error, user} = await supabase.auth.signInWithPassword({
        email: email, 
        password: contraseña,
    });

    if(error) throw error;

    toast.success('Inicio de sesión exitoso');  // Disparar notificación de éxito
    console.log('Usuario autenticado:', user);
      navigate('/Home');  // Navegar a Home tr
  } catch (error){
    console.error('Error en el inicio de sesión:', error.message);
    toast.error('Error en el inicio de sesión: ' + error.message);  
    }

  }

  


  return (
   <section className="index-login">
   
    <h3>Inicia sesion</h3>
    <form onSubmit={handleSubmit} className='index-login-contenedor-form'>
        <input
        className='index-login-contenedor-form-input'
          type="email"
          id="email"
          name='email'
          placeholder="Correo Eletronico"
          onChange={(e) =>{ setEmail(e.target.value)}}
        />
        <input
        className='index-login-contenedor-form-input'
          type="password"
          id="password"
          name='password'
          placeholder="Contraseña"
          onChange={(e) =>{ setContraseña(e.target.value)}}
        />
      <button className='index-login-contenedor-form-btn' type="submit">Inicia sesion</button>
    </form>
   </section>
  )
}

export default Login