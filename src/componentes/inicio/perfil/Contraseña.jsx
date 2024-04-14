import { useEffect, useRef, useState } from "react";
import { Modal } from "rsuite";
import { supabase } from "../../../supabase/client";
import { useForm } from "react-hook-form";
import { Input, Button, Form } from "rsuite";
import { Toaster, toast } from 'sonner';

// const Field = ({ as: Component = Input, field, error, ...rest }) => {
//   return (
//     <Form.Group>
//       <Component
//         id={field.name}
//         value={field.value}
//         onChange={value => field.onChange(value)}
//         {...rest}
//       />
//       <Form.ErrorMessage show={!!error} placement="bottomStart">
//         {error}
//       </Form.ErrorMessage>
//     </Form.Group>
//   );
// };

const Contraseña = ({ size, open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmarPassword: "",
    },
  });

  const password = useRef(null);
  password.current = watch("password", "");

  const onSubmit  = async (data) => {

    const user = await supabase.auth.getUser();

  

    console.log(data);
           
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });
  
      if (error) {
        throw error; 
      }
      toast.success("Publicación agregada");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al registrarse: " + error.message);
    }
    
    reset();
  };

  // const onSubmit = handleSubmit((data) => onSubmitLogic(data));


  return (
    <section>
      <Toaster/>
      <Modal size={size} open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>Cambia la contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="index-login-contenedor-form"
          >
            <input
              className="index-login-contenedor-form-input"
              name="password"
              type="password"
              placeholder="Contraseña nueva"
              {...register("password", {
            required: {
              value: true,
              message: "Contraseña es requerida",
            },
            minLength: {
              value: 6,
              message: "Contraseña debe ser mayor a 6 caracteres",
            },
          })}
              required
              // onChange={(e) =>{ setContraseña(e.target.value)}}
            />
 {errors.password && <span>{errors.password.message}</span>}
            <input
              className="index-login-contenedor-form-input"
              name="confirmarPassword"
              type="password"
              placeholder="Confirmar Password"
              {...register("confirmarPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerida",
                },
                minLength: {
                  value: 6,
                  message: "Confirmar contraseña debe ser mayor a 6 caracteres",
                },
                validate: (value) =>
                  value === password.current || "Las contraseñas no coinciden",
              })}
            />
 {errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>}
            <button className="index-login-contenedor-form-btn">
              Registrate
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Contraseña;
