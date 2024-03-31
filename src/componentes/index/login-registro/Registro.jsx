import './Login.scss'

import { useForm } from "react-hook-form";

// import { useState, useCallback, useEffect } from 'react';
// import {useDropzone} from 'react-dropzone'
import { supabase } from '../../../supabase/client';
// import { useNavigate } from 'react-router-dom';



const Registro = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();


  // const [file, setFile] = useState([]);
    // const [usuario, setUsuario] = useState("");
    // const [email, setEmail] = useState("");
    // const [contraseña, setContraseña] = useState("");
   


  
  // const onDrop = useCallback(acceptedFiles => {
  //   console.log({acceptedFiles})
  // }, [])
  // const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
  //   accept: {
  //     'image/jpeg': [],
  //     'image/png': []
  //   },
  //   onDrop})

 

    // const data = {
    //   usuario: usuario,
    //   correo: email,
    //   contraseña: contraseña,
    //   fotoPerfil: acceptedFiles[0],
    // };
    // const handleSubmit =  async (e) => {
    //   e.preventDefault();

    //   try{
    //     await supabase.auth.signUp({
    //       email: email, 
    //       password: contraseña,
    //   });

    //   await supabase.auth.from('usuario').insert({
    //     nombre_usuario: usuario,
    //     foto_perfil: acceptedFiles[0],
    //   })

      
    // } catch (error){
    //     console.log(error)
    //   }

    // }
   
    

    const onSubmit = async (data) => {

  //     const {error } = await supabase.storage
  //     .from('foto_perfil')
  //     .upload(`${acceptedFiles[0].name}`, acceptedFiles[0]);

  //   if (error) {
  //     console.error('Error al subir la imagen:', error.message);
  //     return;
  //   }
     
  //  const fotoURL  = supabase.storage.from('foto_perfil').getPublicUrl(`${acceptedFiles[0].name}`)

  //  if (fotoURL.error) {
  //   console.error('Error al obtener el enlace público de la imagen:', fotoURL.error.message);
  //   return;
  // }
  
  // console.log('Enlace público de la imagen:', fotoURL.data.publicUrl);
     
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