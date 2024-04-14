import { useForm } from "react-hook-form";
// import { supabase } from '../../../supabase/client';
import { FaTimes,  FaRegFileImage  } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { IconBase } from "react-icons";
// import { fetchPublicaciones } from "./resetPubli";
import { Toaster, toast } from 'sonner';


const CrearPublicacion = ({publicacion, onClose}) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevosDatos, setNuevosDatos] = useState([]);
  const [imageUrl, setImageUrl] = useState(""); // Estado para almacenar la URL de la imagen seleccionada

  


  useEffect(() => {
  if (publicacion) {
      // Llenar los campos del formulario con los datos de la publicación seleccionada
      setNuevosDatos({
        descripción: publicacion.descripción,
        foto: publicacion.foto,
        // Agregar otros campos si es necesario
      });
      setImageUrl(publicacion.foto);
    }
    
    fetchData()
  }, [publicacion]);


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNuevosDatos(prevState => ({
  //     value: setNuevosDatos.descripcion
      
  //   }));
  // };


  const handleChange = (event) => {
    console.log(nuevosDatos);

    const { name, value } = event.target;
    setNuevosDatos(prevState => ({
      ...prevState,
      [name]: value,
      
    }));
  };




  const  fetchData = async () => {
    try {
      // Obtener las publicaciones
      const { data: publicacionesData, error: publicacionesError } = await supabase
        .from('publicaciones')
        .select('*')
        .order('fecha', { ascending: false });

      if (publicacionesError) {
        throw publicacionesError;
      }

        setPublicaciones(publicacionesData);
      // Obtener los datos de usuario para cada publicación
      
      const usuariosIDs = publicacionesData.map(publicacion => publicacion.userID);

      const { data: usuariosData, error: usuariosError } = await supabase
        .from('usuario')
        .select('userID,nombre_usuario, foto_perfil')
        .in('userID', usuariosIDs);

      
      if (usuariosError) {
        throw usuariosError;
      }
      setUsuarios(usuariosData);
    

    } catch (error) {
      console.error('Error al obtener los datos:', error.message);
    }
  }


    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      }
      }, []);
      const { getRootProps, getInputProps, isDragActive, acceptedFiles = "" } =
        useDropzone({ onDrop });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

      const fechaActual = new Date();
  const fechaHoraFormateada = fechaActual.toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });



      const {error} = await supabase.storage
      .from('publicaciones')
      .upload(`${acceptedFiles[0].name}`, acceptedFiles[0])
  
      error ? console.error('Error al subir la imagen:', error.message) : null;
  
      const fotoPubli = supabase.storage.from('publicaciones')
    .getPublicUrl(`${acceptedFiles[0].name}`)
  
    fotoPubli.error ? console.error('Error al obtener el enlace público de la imagen:', fotoURL.error.message) : null;
     
            console.log(fotoPubli)
        const user = supabase.auth.getUser();
        fetchData()
        try{
      
          await supabase.from('publicaciones').insert({
            foto: fotoPubli.data.publicUrl,
            descripción: data.textarea,
            fecha: fechaHoraFormateada,
            userID: user.id,

         
         })
       
         alert("dasdas")
        toast(await fetchData());
        onClose();

         
        } catch (error){
          console.log(error)
        }
        
      }
      fetchData()

      // const handleChangeImage = (e) => {
      //   const file = e.target.files[0];
      //   if (file) {
      //     const imageUrl = URL.createObjectURL(file);
      //     setImageUrl(imageUrl); // Actualizar el estado con la URL de la imagen seleccionada
      //   }
      // };

      const [nuevosde, setNuevosde] = useState("");

      

  return (
    <section className='modalpublic'>
     <Toaster/>
     <section className="modalpublic-contenedor">
     <div className="modalpublic-contenedor-icon">
     <button className='modalpublic-contenedor-icon-btnCerrar' onClick={onClose}>
        <FaTimes />
      </button>
     </div>
    
     <form  onSubmit={handleSubmit(onSubmit)} className='modalpublic-contenedor-form'>
        
          <textarea
          id="des"
        className='modalpublic-contenedor-form-input'
        name="descripcion"
        type="textarea"
        
            onChange={handleChange}
      
        placeholder="Escribe una publicacion..."
       
        {...register("textarea")}
        required
         
        />
                  {imageUrl && <img className='modalpublic-contenedor-form-img' src={imageUrl} />}

       {/* {acceptedFiles[0] && (<img className='modalpublic-contenedor-form-img' src={URL.createObjectURL(acceptedFiles[0])} />)}  */}
           <div className='modalpublic-contenedor-form-conImg' {...getRootProps()}>
           <input {...getInputProps()} />

      {
        isDragActive ?
           <span><img src="/src/assets/img-box-fill.svg"/> Foto </span> :
          <span className="modalpublic-contenedor-form-conImg-cnt"> <img src="/src/assets/img-box-fill.svg"/> Foto</span>
      }
      

       
      </div> 

      <button className='modalpublic-contenedor-form-btn' >Publicar</button>
    </form>
     </section>
    </section>
  )
}

export default CrearPublicacion