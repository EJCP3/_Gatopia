import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase/client";
import { Toaster, toast } from "sonner";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { Modal, Uploader, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { IconButton } from "rsuite";

const CrearHistoria = ({
  onHistoriaChange,
  historia,
  handleClose,
  openUpdate,
  open,
  onClose,
}) => {
  const [nuevosDatos, setNuevosDatos] = useState({
    titulo: "",
    descripcion: "",
    fotos: [],
  });
  const [imageUrl, setImageUrl] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue 
  } = useForm();


  function extractUrls(urlString) {
    const trimmedString = urlString.slice(1, -1);
    const urls = trimmedString.split('], [');
    return urls.map(url => url.trim());
  }
  const isNewHistoria = !historia;
  useEffect(() => {
    if (historia) {
      // Cargando datos de historia existente
      setValue('titulo', historia.titulo);
      setValue('descripcion', historia.descripcion);
      setImageUrl(historia.carusel ? extractUrls(historia.carusel) : []);
    } else {
      // Reiniciar para nueva historia
      reset();
      setImageUrl([]);
    }
  }, [historia, reset, setValue]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevosDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadChange = async (fileEvent) => {
    const currentFiles = fileEvent.filter(file => file.status !== "removed");
    const uploadPromises = currentFiles.map(async file => {
        if (file.blobFile && file.status === "inited") {
            const filePath = `historias/${Date.now()}_${file.name}`;
            try {
                let { error, data } = await supabase.storage
                    .from("historias")
                    .upload(filePath, file.blobFile);

                if (error) throw error;

                return  supabase.storage.from("historias").getPublicUrl(filePath).data.publicUrl;
            } catch (error) {
                console.error("Error uploading image to Supabase:", error.message);
                toast.error("Error uploading image: " + error.message);
                return null;
            }
        } else {
            return file.url;
        }
    });

    console.log(uploadPromises)

    const newUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);
    setImageUrl(newUrls);
};
  const onSubmit = async (data, event) => {
    try {
      const formattedUrls = `[${imageUrl.join("], [")}]`;
      const historiaData = {
        titulo: data.titulo,
        descripción: data.descripcion,
        carusel: formattedUrls,
        fecha: new Date().toISOString(),
      };

      let error;
      if (isNewHistoria) {
        const { error: insertError } = await supabase.from('historias').insert([historiaData]);
        error = insertError;
      } else {
        const { error: updateError } = await supabase.from('historias').update(historiaData).eq('id', historia.id);
        error = updateError;
      }

      if (error) throw error;
      // Cierra el modal y limpia el formulario
      toast.success({
        title: 'Éxito',
        description: `Historia ${isNewHistoria ? 'creada' : 'actualizada'} con éxito`,
      
      });
      onClose();
      onHistoriaChange()
      window.location.reload()
    } catch (error) {
      toast.error({
        title: 'Error al guardar la historia',
        description: error.message,
      });
    }
  };

  return (
    <section>
      <Toaster />
      <Modal size={"sm"} open={open || openUpdate} onClose={onClose}>
        <Modal.Header>
        <Modal.Title>{isNewHistoria ? 'Crear Historia' : 'Editar Historia'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="modalpublic-contenedor">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="modalpublic-contenedor-form"
            >
              <input
                className="modalpublic-contenedor-form-input"
                name="titulo"
                placeholder="Título de la historia"
                onChange={handleChange}
                required
                {...register("titulo", { required: true })}
              />
              <textarea
                className="modalpublic-contenedor-form-input"
                name="descripcion"
                placeholder="Descripción de la historia"
                onChange={handleChange}
                required
                {...register("descripcion", { required: true })}
              />
              <Uploader
                autoUpload={false}
                listType="picture-text"
                onChange={handleUploadChange}
                action=""
              >
                <IconButton icon={<AttachmentIcon />}>Añadir fotos</IconButton>
              </Uploader>

              <button type="submit" className="modalpublic-contenedor-form-btn">
                Publicar
              </button>
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default CrearHistoria;
