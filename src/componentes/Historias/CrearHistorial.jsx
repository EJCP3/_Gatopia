import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase/client";
import { Toaster, toast } from "sonner";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { Modal, Uploader, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { IconButton } from "rsuite";

const CrearHistoria = ({
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
  } = useForm();

  useEffect(() => {
    if (historia) {
      // Establecer los datos existentes de la historia en el formulario
      reset({
        titulo: historia.titulo,
        descripcion: historia.descripcion,
        fotos: historia.carusel ? extractUrls(historia.carusel) : [],
      });
      setImageUrl(historia.carusel ? extractUrls(historia.carusel) : []);
    }
  }, [historia, reset]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevosDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadChange = async (fileEvent) => {
    // Actualiza el estado basado en la lista actual de archivos en el Uploader
    // Esto incluye añadir nuevas imágenes y eliminar imágenes existentes
    const currentFiles = fileEvent.filter((file) => file.status !== "removed"); // Filtra archivos que no están marcados como eliminados

    // Mapea sobre los archivos que han sido cargados completamente para obtener sus URLs
    const uploadPromises = currentFiles.map(async (file) => {
      if (file.blobFile && file.status === "inited") {
        // Si el archivo es nuevo y está listo para subir
        const filePath = `historias/${Date.now()}_${Math.random()}_${
          file.name
        }`;
        try {
          let { error, data } = await supabase.storage
            .from("historias")
            .upload(filePath, file.blobFile);

          if (error) throw error;

          return supabase.storage.from("historias").getPublicUrl(filePath).data
            .publicUrl;
        } catch (error) {
          console.error("Error uploading image to Supabase:", error.message);
          toast.error("Error uploading image");
          return null;
        }
      } else {
        return file.url; // Retorna la URL existente si el archivo no necesita ser subido
      }
    });

    const newUrls = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null
    );
    setImageUrl(newUrls); // Establece las nuevas URLs filtrando cualquier nulo que podría surgir de errores
  };

  console.log(imageUrl);

  const onSubmit = async (data, event) => {
    event.preventDefault(); // Esto evita el comportamiento por defecto del formulario de enviar automáticamente
    try {
      const fechaFormateada = new Date().toISOString().split("T")[0];
      const formattedUrls = `[${imageUrl.join("], [")}]`;
      console.log(formattedUrls);

      const historiaData = {
        titulo: data.titulo || nuevosDatos.titulo,
        descripción: data.titulo || nuevosDatos.descripcion,
        carusel: formattedUrls,
        fecha: fechaFormateada,
      };

      const { error } = historia
        ? await supabase
            .from("historias")
            .update(historiaData)
            .eq("id", historia.id)
        : await supabase.from("historias").insert(historiaData);

      if (error) throw error;

      toast.success(
        `Historia ${historia ? "actualizada" : "agregada"} con éxito!`
      );
      onClose();
    } catch (error) {
      console.error("Error en la operación:", error.message);
      toast.error("Error al procesar la historia");
    }
  };

  return (
    <section>
      <Toaster />
      <Modal size={"sm"} open={open || openUpdate} onClose={onClose}>
        <Modal.Header></Modal.Header>
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
