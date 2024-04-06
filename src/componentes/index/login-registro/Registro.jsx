import './Login.scss'

import { useForm } from "react-hook-form";

// import { useState, useCallback, useEffect } from 'react';
// import {useDropzone} from 'react-dropzone'
import { supabase } from '../../../supabase/client';
// import { useNavigate } from 'react-router-dom';



const Registro = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {

    
     
  //     console.log("holaaa")
      try {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
  
        if (error) {
          throw error; 
        }
  
        alert("¡Usuario registrado con éxito!");
      } catch (error) {
        console.error("Error:", error.message);
        alert("Error al registrarse: " + error.message);
      }
      
    };
    
  return (
    <section className="index-login">
    <h3>Crear cuenta</h3>
    <form  onSubmit={handleSubmit(onSubmit)} className='index-login-contenedor-form'>
        {/* <input
        className='index-login-contenedor-form-input'
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        {...register("usuario")}
        required
          // onChange={(e) =>{ setUsuario(e.target.value)}}
        /> */}
        <input
        className='index-login-contenedor-form-input'
        name="email"
        type="email"
        
        {...register("email")}
        required
          placeholder="Correo Eletronico"
          // onChange={(e) =>{ setEmail(e.target.value)}}
        />
        
          <input
        className='index-login-contenedor-form-input'
        name="password"
        type="password"
        placeholder="Contraseña"
       
        {...register("password")}
        required
          // onChange={(e) =>{ setContraseña(e.target.value)}}
        />
       

           {/* <div className='index-login-contenedor-form-contImg' {...getRootProps()}>
      <input {...getInputProps()}    />
      {
        isDragActive ?
          <p>Sólo  imágenes .jpeg y .png</p> :
          <p>Arrastre y suelte foto de perfil o haga clic para seleccionar imagen</p>
      }
     
       
      </div> 
      {acceptedFiles[0] && (<img className='index-login-contenedor-form-img' src={URL.createObjectURL(acceptedFiles[0])} />)}  */}

      <button className='index-login-contenedor-form-btn'>Registrate</button>
    </form>
   </section>
  )
}

export default Registro