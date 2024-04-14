import {  useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import "./estilos/layout/_datoPerfil.scss";
import { useForm } from "react-hook-form";
import ImageUpload from "./imagen";
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from 'rsuite';
import { Toaster, toast } from 'sonner';


const DatoPerfil = ({ onProfileCompletion, hasRequiredFields, size, open, onClose, editar }) => {
  const [profileData, setProfileData] = useState(null); // Store fetched profile data
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const [isEditing, setIsEditing] = useState(editar);

  console.log(isEditing)


  useEffect(() => {
    const fetchProfileData = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('usuario')
          .select('*')
          .eq('userID', user.data.user.id)
          .single();
  
        if (error) {
          console.log(data)
          console.error('Error fetching profile data:', error.message);
        } else {
          console.log(data)
          setProfileData(data);
          // setIsProfileComplete(!!data && hasRequiredFields(data)); // Actualizar estado de completitud
        }
      }
    };
  
    fetchProfileData();
  }, []);




  useEffect(() => {
    fetch("https://api.digital.gob.do/v1/territories/provinces")
      .then((response) => response.json())
      .then((data) => {
        // Extraer los nombres de las provincias de la respuesta
        const provinceNames = data.data.map((province) => province.name);
        // Guardar los nombres de las provincias en el estado
        setProvinces(provinceNames);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };


  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleProfileImageUpload = (file) => {
    // Aquí puedes manejar la carga de la imagen de perfil

    setProfileImage(file);
    
  };

  const handleCoverImageUpload = (file) => {
    // Aquí puedes manejar la carga de la imagen de portada
  
    setCoverImage(file);
  };

  const onSubmit = async (data) => {
    const fechaActual = new Date(Date.now()).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });


    const {error} = await supabase.storage
    .from('foto_perfil')
    .upload(`${profileImage.name}`, profileImage)

    error ? console.error('Error al subir la imagen:', error.message) : null;

    const fotoURL = supabase.storage.from('foto_perfil')
  .getPublicUrl(`${profileImage.name}`)

  fotoURL.error ? console.error('Error al obtener el enlace público de la imagen:', fotoURL.error.message) : null;

 

  const {errorPortada } = await supabase.storage
    .from('portada')
    .upload(`${coverImage.name}`, coverImage)

    errorPortada ? console.error('Error al subir la imagen:', errorPortada.message) : null;

    const PortadaURL = supabase.storage.from('portada')
  .getPublicUrl(`${coverImage.name}`)

  PortadaURL.error ? console.error('Error al obtener el enlace público de la imagen:', PortadaURL.error.message) : null;


  console.log("si", fotoURL.data.publicUrl)
  console.log("no", PortadaURL.data.publicUrl)
  const user = await supabase.auth.getUser();

  try {
    if (isEditing) {
      const { error } = await supabase.from('usuario')
        .update({
          nombre_usuario: data.usuario,
          provincia : data.provincia,
          descripción : data.descripción,
          fecha_creacion : fechaActual,
          foto_perfil: fotoURL.data.publicUrl, // URL de la imagen de perfil
          portada: PortadaURL.data.publicUrl, // URL de la imagen de portada
          userID: user.data.user.id,
        })
        .eq('userID', user.data.user.id);
        toast.success("Publicación actualizada");

        if(error){
          throw error
        }
    } else {
      await supabase.from('usuario').insert({
        nombre_usuario: data.usuario,
        provincia : data.provincia,
        descripción : data.descripción,
        fecha_creacion : fechaActual,
        foto_perfil: fotoURL.data.publicUrl, // URL de la imagen de perfil
        portada: PortadaURL.data.publicUrl, // URL de la imagen de portada
        userID: user.id,
      });
    }

    
    window.location.reload(); // Recargar la página después de guardar el perfil
  } catch (error) {
    console.error(error);
  }

  };


  return (
    <section >
     <Toaster/>
     <Modal overflow={true} size="lg" open={open} onClose={onClose}>
        <Modal.Header>
        <h3 className="formPerfil-contenedor-titulo">
        {isEditing ? 'Editar perfil' : 'Rellene datos para completar el perfil'}
        </h3>
        </Modal.Header>
        <Modal.Body>
        <section className="formPerfil-contenedor">
     
        <form
          className="index-login-contenedor-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="index-login-contenedor-form-input"
            type="text"
            placeholder="Nombre de usuario"
            {...register("usuario", { required: true, min: 10 })}
          />
         
          <select
            value={selectedProvince}
            className="index-login-contenedor-form-input"
            {...register("provincia", { required: true })}
            onChange={handleProvinceChange}
          >
            <option value="">Selecciona una provincia</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
          <textarea   placeholder="Descripción" className="index-login-contenedor-form-input textTarea" {...register("descripción",  {required: true, max: 100})} />

          <ImageUpload  onProfileImageUpload={handleProfileImageUpload}
            onCoverImageUpload={handleCoverImageUpload}/>   

   
          <input className="index-login-contenedor-form-btn" type="submit" />
        </form>
      </section>
        </Modal.Body>
        
      </Modal>
     





    </section>
  );
};

export default DatoPerfil;
