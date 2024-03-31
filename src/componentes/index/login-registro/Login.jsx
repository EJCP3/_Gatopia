import {  useEffect, useState } from 'react';
import './Login.scss'
import { supabase } from '../../../supabase/client';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try{
      await supabase.auth.signInWithPassword({
        email: email, 
        password: contraseña,
    });
  } catch (error){
      console.log(error)
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