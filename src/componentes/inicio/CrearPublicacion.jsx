import  { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { supabase } from "../../supabase/client";
import { Toaster, toast } from 'sonner';
import { Modal, Button } from 'rsuite';

const CrearPublicacion = ({ publicacionID, onClose , openUpdate, open, onCloseHeader }) => {
  const [imageUrl, setImageUrl] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);

  console.log("numero",publicacionID)

  useEffect(() => {
    if (publicacionID) {
      setImageUrl(publicacionID.foto);
    }
  }, [publicacionID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImageUrl(value); // Asumiendo que quieres actualizar la imagen directamente
  };

  const fetchData = async () => {
    try{
      const { data: publicacionesData, error: publicacionesError } =
      await supabase
        .from("publicaciones")
        .select("*")
        .order("fecha", { ascending: false });

    if (publicacionesError) {
      throw publicacionesError;
    }

    setPublicaciones(publicacionesData);

    // setPublicaciones(
    //   publicaciones.filter((Publicacion) =>  {console.log("dsd")})

    // );
      console.log("siii", publicaciones.map((publicacion) => {console.log(publicacion)}))
    }
   

    catch(error){
      console.error("Error al obtener los datos:", error.message);

    }
      
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

  console.log(acceptedFiles[0])

  const onSubmit = async (data) => {
    const fechaHoraFormateada = new Date().toISOString();
    const file = acceptedFiles[0];
  
    if (!file) {
      toast.error('No se ha seleccionado una imagen para cargar');
      return;
    }
  
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('publicaciones')
      .upload(`${new Date().getTime()}_${file.name}`, file);
  
    if (uploadError) {
      console.error('Error al subir la imagen:', uploadError.message);
      toast.error('Error al subir la imagen');
      return;
    }
  
    const imageUrl = supabase.storage.from('publicaciones').getPublicUrl(`${uploadData.path}`).data.publicUrl;
  
    if (!imageUrl) {
      toast.error('Error al obtener la URL de la imagen');
      return;
    }
  
    const publicationData = {
      foto: imageUrl,
      descripción: data.textarea,
      fecha: fechaHoraFormateada
    };

    console.log("publicacion", publicacionID, publicacionID)
  
    let dbResponse;
    if (publicacionID ) {
      dbResponse = await supabase.from('publicaciones').update(publicationData).eq('id', publicacionID);
    } else {
      dbResponse = await supabase.from('publicaciones').insert(publicationData);
    }
  
    if (dbResponse.error) {
      console.error('Error al guardar la publicación:', dbResponse.error.message);
      toast.error('Error al procesar la publicación');
    } else {
      toast.success(`Publicación ${publicacionID ? 'actualizada' : 'agregada'} con éxito!`);
      onCloseHeader();
      onClose();
      fetchData(); 
      window.location.reload()
     
     // Actualiza la lista de publicaciones
    }
};

  

  return (
    <section>
      <Toaster />
      <Modal size={"sm"} open={open || openUpdate} onClose={onCloseHeader || onClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className='modalpublic-contenedor-form'>
            <textarea
              id="des"
              className='modalpublic-contenedor-form-input'
              name="descripcion"
              placeholder="Escribe una publicacion..."
              onChange={handleChange}
              {...register("textarea", { required: true })}
            />
            {imageUrl && <img className='modalpublic-contenedor-form-img' src={imageUrl} alt="Preview" />}
            <div {...getRootProps()} className='modalpublic-contenedor-form-conImg'>
              <input {...getInputProps()} />
              {isDragActive ? <span>Foto</span> : <span>Cargar Foto</span>}
            </div>
            <Button type='submit' className='modalpublic-contenedor-form-btn'>Publicar</Button>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default CrearPublicacion;
