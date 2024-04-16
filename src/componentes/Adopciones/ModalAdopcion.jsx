import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Form, Button, ButtonToolbar, Schema, Panel, Checkbox, SelectPicker, CheckPicker, List } from 'rsuite';
import { supabase } from "../../supabase/client";
import emailjs from '@emailjs/browser';

const { StringType, NumberType, BooleanType, ArrayType } = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired("Este campo es obligatorio."),
  email: StringType()
    .isEmail("Por favor, introduce una dirección de correo válida.")
    .isRequired("Este campo es obligatorio."),
  cedula: StringType().isRequired("Este campo es obligatorio."),
  edad: NumberType()
    .min(18, "Debe tener al menos 18 años de edad")
    .isRequired("Este campo es obligatorio."),
  direccion: StringType().isRequired("Este campo es obligatorio."),
  telefono: StringType().isRequired("Este campo es obligatorio."),
  numeroMiembrosHogar: NumberType().isRequired("Este campo es obligatorio."),
  edadesMiembrosHogar: StringType().isRequired("Este campo es obligatorio."),
  experienciaAnimales: StringType().isRequired("Este campo es obligatorio."),
  motivoAdopcion: StringType().isRequired("Este campo es obligatorio."),
  tieneOtrosAnimales: BooleanType(),
  animalesVacunados: BooleanType(),
  animalesDesparasitados: BooleanType(),
  animalesEsterilizados: BooleanType(true),
  permisoAnimales: BooleanType().isRequired("Este campo es obligatorio."),
  provincia: StringType().isRequired("Este campo es obligatorio."),
  confirmacionAdopcion: BooleanType().isRequired(
    "Debes confirmar esta opción."
  ),
  animales: ArrayType().of(StringType()),
});

const ModalAdopcion = ({ open, onClose, selectedGatoAdopcion }) => {
    // console.log(selectedGatoAdopcion    )
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => {
    setOpenForm(true);
    onClose();
  };
  const handleCloseForm = () => setOpenForm(false);
  const [provincias, setProvincias] = useState([]);
  const formRef = useRef();
  const [showAnimalDetails, setShowAnimalDetails] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    cedula: '',
    edad: '',
    direccion: '',
    telefono: '',
    numeroMiembrosHogar: '',
    edadesMiembrosHogar: '',
    experienciaAnimales: '',
    motivoAdopcion: '',
    tieneOtrosAnimales: "",
    animalesVacunados: false,
    animalesDesparasitados: false,
    animalesEsterilizados: false,
    permisoAnimales: false,
    provincia: ['si'],
    confirmacionAdopcion: false,
    animales: ['']
  });

  const handleReset = () => {
    setFormValue({
        name: '',
      email: '',
      cedula: '',
      edad: '',
      direccion: '',
      telefono: '',
      numeroMiembrosHogar: '',
      edadesMiembrosHogar: '',
      experienciaAnimales: '',
      motivoAdopcion: '',
      tieneOtrosAnimales: false,
      animalesVacunados: false,
      animalesDesparasitados: false,
      animalesEsterilizados: false,
      permisoAnimales: false,
      provincia: '',
      confirmacionAdopcion: false,
      animales: []
    });
    formRef.current.cleanErrors();
  };
  const animales = [
    { label: "Perro", value: "perro" },
    { label: "Gato", value: "gato" },
    { label: "Peces de acuario", value: "Peces de acuario" },
    { label: "Hamsters", value: "Hamsters" },
    { label: "Tortugas", value: "Tortugas" },
    { label: "Iguanas", value: "Iguanas" },
    { label: "Guacamayos", value: "Guacamayos" },
    { label: "Serpientes", value: "Serpientes" },

  ];
  const handleFormChange = (value) => {
    setFormValue(value);
  };

  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Obtener datos del usuario autenticado
  //       const { data: userData, error: userError } = await supabase.auth.getUser();
  //       if (userError) throw new Error(userError.message);

  //       if (userData) {
  //           setUser( userData.user.email)
  //         console.log('Correo del usuario:', user); // Opcional: imprimir para verificar

  //         // Obtener datos específicos de la base de datos
  //         const { data, error } = await supabase
  //           .from('usuario') // Suponiendo que es la tabla correcta, ajusta si es necesario
  //           .select('correo')
  //           .eq('userID', selectedGatoAdopcion.userID)
  //           .single();

  //         if (error) throw new Error(error.message);

  //         setProfile(data.correo);
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener datos:', error.message);
  //     } finally {
  //       // Opcional: cualquier limpieza o acciones finales van aquí
  //       console.log('Consulta completada'); // Opcional: mensaje para indicar fin del proceso
  //     }
  //   };

  //   fetchUserData();
  // }, [selectedGatoAdopcion.userID]);


  const handleSubmit = async (e) => {

    // console.log(profile)
    // const templateParams = {
    //     name: formValue.name,
    //     email: profile,
      
    //     telefono: formValue.telefono
        
    // };
    



      // e.preventDefault();

      // console.log(templateParams)

      // emailjs
      //   .sendForm('service_h7f16tp', 'template_yt04w7b', templateParams, {
      //     publicKey: '7A-xyLXHrHQM0zJ39',
      //   })
      //   .then(
      //     (response) => {
      //       console.log('SUCCESS!', response.status, response.text);
      //     },
      //     (error) => {
      //       console.log('FAILED...', error.text);
      //     },
      //   );
      
    
  };

  useEffect(() => {
    fetch("https://api.digital.gob.do/v1/territories/provinces")
      .then((response) => response.json())
      .then((data) =>
        setProvincias(
          data.data.map((province) => ({
            label: province.name,
            value: province.name,
          }))
        )
      )
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  function TextField(props) {
    const { name, label, accepter, ...rest } = props;
    return (
      <Form.Group controlId={`${name}-3`}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
      </Form.Group>
    );
  }
  

  return (
    <section>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>Desea adoptar a {} ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Panel
            header="Para adoptarlo debes cumplir los siguientes requisitos"
            shaded
          >
            <List bordered>
              <List.Item>
                Asegurarse de que está listo para un compromiso que puede durar
                más de 15 años.
              </List.Item>
              <List.Item>
                Tener los medios económicos para cubrir los costos veterinarios,
                alimentación y cuidados generales.
              </List.Item>
              <List.Item>
                {" "}
                Vivir en un ambiente donde el gato estará seguro y no corra
                riesgos, como ventanas y balcones asegurados.
              </List.Item>
              <List.Item>
                {" "}
                Todos en el hogar deben estar de acuerdo con la adopción y
                dispuestos a aceptar la responsabilidad que conlleva.
              </List.Item>
              <List.Item>
                {" "}
                Disponer del tiempo necesario para brindar atención, cuidado y
                estimulación adecuados al gato.
              </List.Item>
            </List>
          </Panel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOpenForm} appearance="primary">
            Continua
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size={"lg"} open={openForm} onClose={handleCloseForm}  >
        <Modal.Header>
          <Modal.Title>Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form formValue={formValue}  onChange={handleFormChange} onSubmit={handleSubmit} ref={formRef} model={model} fluid>
          <TextField name="name" label="Nombre" />
      <TextField name="cedula" label="Cédula" />
      <TextField name="edad" label="Edad" type="number" />
      <TextField name="email" label="Email" type="email" />
      <TextField name="direccion" label="Dirección" />
      <TextField name="telefono" label="Teléfono" />
      <TextField name="numeroMiembrosHogar" label="Número de Miembros en el Hogar" type="number" />
      <TextField name="edadesMiembrosHogar" label="Edades de los Miembros del Hogar" />
      <TextField name="experienciaAnimales" label="Experiencia con Animales" />
      <TextField name="motivoAdopcion" label="Motivo de Adopción" />
      <Form.Group controlId="familiaEnterada-3">
        <Checkbox name="familiaEnterada" inline>¿Están todos los miembros de la familia enterados de la adopción?</Checkbox>
      </Form.Group>
            <Form.Group controlId="provincia">
              <Form.ControlLabel>Provincia</Form.ControlLabel>
              <SelectPicker
                data={provincias}
                searchable={true}
                name="provincia"
                style={{ width: 224 }}
                value={formValue.provincia}
    onChange={(value) => {
      setFormValue(prev => ({ ...prev, provincia: value }));
    }}
              />
            </Form.Group>

          

            <Form.Group controlId="tieneOtrosAnimales">
              <Checkbox
                name="tieneOtrosAnimales"
                inline
                onChange={(_, checked) => setShowAnimalDetails(checked)}
              >
                ¿Tiene otros animales en casa?
              </Checkbox>
            </Form.Group>

            {showAnimalDetails && (
              <Panel header="Si tiene otros animales, especifique:" bordered>
              <Form.Group controlId="animales">
              <Form.ControlLabel>Selecciona los animales</Form.ControlLabel>
              <CheckPicker
                data={animales}
                name="animales"
                style={{ width: 224 }}
                multiple
                value={formValue.animales}
    onChange={(value) => {
      setFormValue(prev => ({ ...prev, animales: value }));
    }}
              />
            </Form.Group>
                <Checkbox       name="animalesVacunados" inline onChange={(value, checked) => {
              setFormValue({ ...formValue, animalesVacunados: checked });
            }}
          >                  ¿Están vacunados?
                </Checkbox>
                <Checkbox name="animalesDesparasitados" inline onChange={(value, checked) => {
              setFormValue({ ...formValue, animalesDesparasitados: checked });
            }}>
                  ¿Están desparasitados?
                </Checkbox>
                <Checkbox name="animalesEsterilizados" inline onChange={(value, checked) => {
              setFormValue({ ...formValue, animalesEsterilizados: checked });
            }}>
                  ¿Están esterilizados?
                </Checkbox>
               
              </Panel>
              
            )}
            <Form.Group controlId="permisoAnimales-3">
        <Checkbox name="permisoAnimales" inline onChange={(value, checked) => {
              setFormValue({ ...formValue, permisoAnimales: checked });
            }}>¿Está seguro que se permiten animales donde vive?</Checkbox>
      </Form.Group>
      <Form.Group controlId="confirmacionAdopcion-3">
        <Checkbox name="confirmacionAdopcion" inline onChange={(value, checked) => {
              setFormValue({ ...formValue, confirmacionAdopcion: checked });
            }}>Confirmo que estoy seguro de querer adoptar y asumo todas las responsabilidades.</Checkbox>
      </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="cyan" appearance="primary" onClick={handleReset}>
            Limpiar
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            Enviar
          </Button>

          <Button color="red" appearance="primary" onClick={handleCloseForm}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ModalAdopcion;
