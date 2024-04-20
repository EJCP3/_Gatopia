import { Panel, Grid } from 'rsuite';
import AttachmentIcon from "@rsuite/icons/Attachment";


import { Modal, Carousel, Button, Input, SelectPicker, Uploader, IconButton, Notification,Placeholder,  Row, Col } from 'rsuite';
import { supabase } from '../../supabase/client'; 
import { useEffect, useState } from 'react';
import { Toaster, toast } from "sonner";
import ModalAdopcion from './ModalAdopcion';



const Main = () => {


  const handleDeleteGato = async (gatoId) => {
    if (!gatoId) return;
  
    const { data, error } = await supabase
      .from('adopcion')
      .delete()
      .eq( "id", gatoId );
  
    if (error) {
      console.error('Error al eliminar la publicación:', error.message);
      toast.error('Error al eliminar la publicación');
    } else {
      toast.success('Publicación eliminada correctamente');
      setOpenInfoGato(false)
      // Actualizar el estado para reflejar la eliminación
      setGatos(gatos.filter(gato => gato.id !== gatoId));
    }
  };

  const [openModalAdopcion, setOpenModalAdopcion] = useState(false);
 
  const [gatos, setGatos] = useState([]); // Estado para almacenar el rol del usuario
  const [selectedGato, setSelectedGato] = useState(null);
    const [selectedGatoAdopcion, SetSelectedGatoAdopcion] = useState(null);


  const [imageUrls, setImageUrls] = useState([]);

  const [openAdopcion, setOpenAdopcion] = useState(false);
const [openInfoGato, setOpenInfoGato] = useState(false);
// ...

const handleOpenAdopcion = () => {
  
  setOpenAdopcion(true);}


  const handleOpenInfoGato = (gato) => {
    setSelectedGato(gato); // Configura el gato seleccionado para la información
    setOpenInfoGato(true);
    // if (gato.foto) {
    //   const urls = extractUrls(gato.foto);
    //   setImageUrls(urls);
    //   console.log(urls)
    // }
  };
  const [userId, setUserId] = useState(null);
const handleCloseAdopcion = () => setOpenAdopcion(false);

 const handleOpenModal = (selectedGatoAdopcion) => {
     console.log("su nombre es", selectedGatoAdopcion)
     console.log("su id es", selectedGatoAdopcion.userID)
    SetSelectedGatoAdopcion(selectedGatoAdopcion.userID)
    console.log("si", )
    setOpenModalAdopcion(true);
    setOpenInfoGato(false);
   
  }
  const handleCloseModal = () =>  {
    setOpenModalAdopcion(false) 
  }

const handleCloseInfoGato = () => {
  setOpenInfoGato(false);
  setImageUrls([]);
};
const [form, setForm] = useState({
  nombre: '',
  sexo: null,
  edad: null,
  tamaño: null,
  raza: null,
  peso: '',
  pelo: null,
  energia: null,
  condiciones: '',
  nota: '',
  foto: [],
  provincia: null
});
const [provincias, setProvincias] = useState([]);
const [razas, setRazas] = useState([]); // Simula un estado con las razas de gatos

useEffect(() => {

  fetch("https://api.digital.gob.do/v1/territories/provinces")
    .then(response => response.json())
    .then(data => setProvincias(data.data.map(province => ({ label: province.name, value: province.name }))))
    .catch(error => console.error("Error fetching provinces:", error));


    
    setRazas([
      { label: 'Abisinio', value: 'Abisinio' },
      { label: 'Americano de pelo duro', value: 'Americano de pelo duro' },
      { label: 'Asiático', value: 'Asiático' },
      { label: 'Balines', value: 'Balines' },
      { label: 'Birmano', value: 'Birmano' },
      { label: 'Bobtail japonés de pelo corto', value: 'Bobtail japonés de pelo corto' },
      { label: 'Bobtail japonés de pelo largo', value: 'Bobtail japonés de pelo largo' },
      { label: 'Bombay', value: 'Bombay' },
      { label: 'Bosque de Siberia', value: 'Bosque de Siberia' },
      { label: 'Británico de pelo corto', value: 'Británico de pelo corto' },
      { label: 'Burmés', value: 'Burmés' },
      { label: 'Burmilla', value: 'Burmilla' },
      { label: 'Chinchilla', value: 'Chinchilla' },
      { label: 'Cornish rex', value: 'Cornish rex' },
      { label: 'Cymric', value: 'Cymric' },
      { label: 'Devon Rex', value: 'Devon Rex' },
      { label: 'Exótico de pelo corto', value: 'Exótico de pelo corto' },
      { label: 'Fold escocés', value: 'Fold escocés' },
      { label: 'Gato azul ruso', value: 'Gato azul ruso' },
      { label: 'Gato bengalí', value: 'Gato bengalí' },
      { label: 'Korat', value: 'Korat' },
      { label: 'LaPerm', value: 'LaPerm' },
      { label: 'Maine Coon', value: 'Maine Coon' },
      { label: 'Manx', value: 'Manx' },
      { label: 'Mau Egipcio', value: 'Mau Egipcio' },
      { label: 'Mist Australiano', value: 'Mist Australiano' },
      { label: 'Munchkin', value: 'Munchkin' },
      { label: 'Ocicato', value: 'Ocicato' },
      { label: 'Oriental de pelo corto', value: 'Oriental de pelo corto' },
      { label: 'Oriental de pelo largo', value: 'Oriental de pelo largo' },
      { label: 'Pixie Bob', value: 'Pixie Bob' },
      { label: 'Ragdoll', value: 'Ragdoll' },
      { label: 'Savannah', value: 'Savannah' },
      { label: 'Selkirk Rex', value: 'Selkirk Rex' },
      { label: 'Singapura', value: 'Singapura' },
      { label: 'Snowshoe', value: 'Snowshoe' },
      { label: 'Somalí', value: 'Somalí' },
      { label: 'Sphynx', value: 'Sphynx' },
      { label: 'Tiffanie', value: 'Tiffanie' },
      { label: 'Tonquinés', value: 'Tonquinés' },
      { label: 'Van Turco', value: 'Van Turco' }
    ]);
    fetchUser();

    fetchGatos();

    
}, []);

const fetchGatos = async () => {
  const { data, error } = await supabase
    .from('adopcion')
    .select('*')
  .order("fecha", { ascending: false });
  if (error) {
    console.error('Error fetching data:', error);
  } else {
    setGatos(data);
  }
};

const fetchUser = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (user) {
    setUserId(user.user.id);
  }
};



// Simular la carga de razas de gatos, puedes reemplazar esto con una llamada API real o datos estáticos






const handleChange = (value, name) => {
  setForm(prev => ({ ...prev, [name]: value }));
};

const handleUploadChange = async (fileEvent) => {
  const currentFiles = fileEvent.filter(file => file.status !== "removed");
  const uploadPromises = currentFiles.map(async file => {
    if (file.blobFile && file.status === "inited") {
      const filePath = `${Date.now()}_${file.name}`;
      try {
        let { error, data } = await supabase.storage
          .from("adopcion")
          .upload(filePath, file.blobFile);

        if (error) throw error;

        return supabase.storage.from("adopcion").getPublicUrl(filePath).data.publicUrl;
      } catch (error) {
        console.error("Error uploading image to Supabase:", error.message);
        return null;
      }
    } else {
      return file.url;
    }
  });

  const newUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);
  setForm(prev => ({ ...prev, foto: newUrls }));
};

const handleSubmit = async () => {
  const user = await supabase.auth.getUser();
  const fechaHoraFormateada = new Date().toISOString();

  const adopcionData = {
    ...form,
    userID: user.data.user.id, // Suponiendo que 'id' es el campo correcto.
    fecha: fechaHoraFormateada,
  };

  console.log("tabla",adopcionData)

  // Llama a la función de inserción con el objeto completo.
  const { data, error } = await supabase
    .from('adopcion')
    .insert([adopcionData]);

    console.log(data)

  if (error) {
    console.error("Error inserting data: ", error.message);
    toast.error(
     "Completa todos los formulario, para poder poner adopcion"
    );
  } else {
    toast.success(
      "Información de adopción guardada correctamente."
  );
    handleCloseAdopcion(); // Cierra el modal tras guardar los datos
  }
};

// function extractUrls(urlString) {
//   console.log("bon dias", urlString)
//   const trimmedString = urlString.slice(1, -1);
//   const urls = trimmedString.split('], [');
//   return urls.map(url => url.trim());
// }





  return (
    <>
    <button onClick={handleOpenAdopcion} className="adopcion-header-btn" >Dar en adopción </button>
  {gatos.map((gato) => (
    <article key={gato.id} onClick={() => handleOpenInfoGato(gato)} 
    className="adopcion-article">
    
    <Panel shaded bordered bodyFill className="adopcion-panel">
        <img src={gato.foto[0]} alt={`Foto de ${gato.nombre}`} />
        <Panel header={gato.nombre}>
       
            <div className="adopcion-card-sub">
                <p className="adopcion-card-sub-nombre">{gato.provincia}</p>
                <p className="adopcion-card-sub-edad">{gato.edad}</p>
              
            </div>
        </Panel>
        
    </Panel>
</article>
  ))}
  {selectedGato && (
    <Modal className="modal-content" size="sm" open={openInfoGato} onClose={handleCloseInfoGato}>
          <Modal.Header>
            <Modal.Title>{selectedGato.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
      <section className="contenedor-cards">
      <Grid fluid>
    <Row >
      <Col xs={24} sm={24} md={8}>
        <Panel  className="panel-info" bordered header="Sexo">
          <p>{selectedGato.sexo || "Sin información"}</p>
        </Panel>
      </Col>
   
   
      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Edad">
          <p>{selectedGato.edad || "Sin información"}</p>
        </Panel>
      </Col>
   
   
    
      <Col xs={24} sm={24} md={8}>
        <Panel  className="panel-info" bordered header="Tamaño">
          <p>{selectedGato.tamaño || "Sin información"}</p>
        </Panel>
      </Col>
    
   
      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Pelo">
          <p>{selectedGato.pelo || "Sin información"}</p>
        </Panel>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Energía">
          <p>{selectedGato.energia || "Sin información"}</p>
        </Panel>
      </Col>

      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Provincia">
          <p>{selectedGato.provincia || "Sin información"}</p>
        </Panel>
      </Col>
  
     
      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Peso">
          <p>{selectedGato.peso || "Sin información"}</p>
        </Panel>
      </Col>

      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Condiciones">
          <p>{selectedGato.condiciones || "Sin información"}</p>
        </Panel>
      </Col>
  
      <Col xs={24} sm={24} md={8}>
        <Panel className="panel-info" bordered header="Nota">
          <p>{selectedGato.nota || "Sin información"}</p>
        </Panel>
      </Col>

     
    </Row>
    </Grid>
    
    </section>

            <Carousel autoplay className="custom-slider">
              {selectedGato.foto.map((foto, index) => (
                <img key={index} src={foto} height="100px" width="100%" alt={`Slide ${index + 1}`} />
              ))}
            </Carousel>
           
          </Modal.Body>
          <Modal.Footer>
          
          <Button onClick={() => handleOpenModal(selectedGato)}  appearance="primary">Adoptar</Button>
          
          {selectedGato.userID === userId && (
                  <Button color="red" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGato(selectedGato.id);
                  }}>Eliminar</Button>
                )}
        </Modal.Footer>
        </Modal>
)}
<ModalAdopcion selectedGatoAdopcion={selectedGatoAdopcion} open={openModalAdopcion} onClose={handleCloseModal} />

  <Modal className="modal-contentInput" open={openAdopcion} onClose={handleCloseInfoGato}>
        <Modal.Header>
          <Modal.Title>Dar en Adopción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Input placeholder="Nombre" value={form.nombre} onChange={value => handleChange(value, 'nombre')} />
            <SelectPicker placeholder="Sexo" data={[{ label: 'Macho', value: 'Macho' }, { label: 'Hembra', value: 'Hembra' }]} value={form.sexo} onChange={value => handleChange(value, 'sexo')} />
            <SelectPicker placeholder="Edad" data={[{ label: 'Bebé', value: 'Bebé' }, { label: 'Joven', value: 'Joven' }, { label: 'Adulto', value: 'Adulto' }, { label: 'Mayor', value: 'Mayor' }]} value={form.edad} onChange={value => handleChange(value, 'edad')} />
            <SelectPicker placeholder="Tamaño" data={[{ label: 'Pequeño', value: 'Pequeño' }, { label: 'Mediano', value: 'Mediano' }, { label: 'Grande', value: 'Grande' }, { label: 'Muy grande', value: 'Muy grande' }]} value={form.tamaño} onChange={value => handleChange(value, 'tamaño')} />
            <SelectPicker placeholder="Raza" data={razas} value={form.raza} onChange={value => handleChange(value, 'raza')} />
            <Input placeholder="Peso" value={form.peso} onChange={value => handleChange(value, 'peso')} />
            <SelectPicker placeholder="Pelo" data={[{ label: 'Largo', value: 'Largo' }, { label: 'Mediano', value: 'Mediano' }, { label: 'Corto', value: 'Corto' }, { label: 'Sin pelo', value: 'Sin pelo' }]} value={form.pelo} onChange={value => handleChange(value, 'pelo')} />
            <SelectPicker placeholder="Energía" data={[{ label: 'Alta', value: 'Alta' }, { label: 'Media', value: 'Media' }, { label: 'Regular', value: 'Regular' }, { label: 'Baja', value: 'Baja' }]} value={form.energia} onChange={value => handleChange(value, 'energia')} />
            <Input as="textarea" placeholder="Condiciones" value={form.condiciones} onChange={value => handleChange(value, 'condiciones')} />
            <Input as="textarea" placeholder="Nota" value={form.nota} onChange={value => handleChange(value, 'nota')} />
            <SelectPicker placeholder="Provincia" data={provincias} value={form.provincia} onChange={value => handleChange(value, 'provincia')} />
            <Uploader  action="" autoUpload={false} listType="picture-text" onChange={handleUploadChange}>
              <IconButton icon={<AttachmentIcon />}>Añadir fotos</IconButton>
            </Uploader>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">Guardar</Button>
          <Button onClick={handleCloseAdopcion} appearance="subtle">Cancelar</Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default Main;

{/* <article className="adopcion-card">
        <img
          className="adopcion-card-img"
          src="/src/assets/mobile/gatoAdopcion.svg"
        />
        <div className="adopcion-card-sub">
          <h3 className="adopcion-card-sub-nombre">Nombre</h3>

          <h3 className="adopcion-card-sub-edad">Edad</h3>
        </div>
      </article> */}