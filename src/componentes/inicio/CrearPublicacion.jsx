import { useForm } from "react-hook-form";
// import { supabase } from '../../../supabase/client';
import { FaTimes } from "react-icons/fa";


const CrearPublicacion = ({onClose}) => {

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
    <section className='modalpublic'>
     <section className="modalpublic-contenedor">
     <button className='modalP-btnCerrar' onClick={onClose}>
        <FaTimes />
      </button>
     <h3>Crear una publicacion</h3>
     <form  onSubmit={handleSubmit(onSubmit)} className='index-login-contenedor-form'>
        
          <textarea
        className='index-login-contenedor-form-input'
        name="text"
        type="textarea"
        placeholder="si"
       
        {...register("textarea")}
        required
         
        />
       

           <div className='index-login-contenedor-form-contImg' {...getRootProps()}>
      <input {...getInputProps()}    />
      {
        isDragActive ?
          <p>Sólo  imágenes .jpeg y .png</p> :
          <p>Arrastre y suelte foto de perfil o haga clic para seleccionar imagen</p>
      }
     
       
      </div> 
      {acceptedFiles[0] && (<img className='index-login-contenedor-form-img' src={URL.createObjectURL(acceptedFiles[0])} />)} 

      <button className='index-login-contenedor-form-btn'>Registrate</button>
    </form>
     </section>
    </section>
  )
}

export default CrearPublicacion