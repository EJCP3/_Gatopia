import { Modal } from "rsuite";
import Navegacion from "../inicio/Navegacion";
import CrearHistoria from "./CrearHistorial";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del usuario actual
    const fetchUserData = async () => {
      try{
				const user = await supabase.auth.getUser();
				const { error, data} = await supabase.from("usuario")
        .select("role")
        .eq("userID", user.data.user.id);

				setUserRole(data[0].role)
        

				if(error) {
					throw error;
				}

			}catch(error) {
				alert(error.error_description || error.message);
		}
    }

    fetchUserData();
  }, []);

  return (
   
    <section className="historias-header">
      <h3 className="historias-header-titulo">
        Historias de los mas valientes
      </h3>
      {userRole === "admin" && (
        <button className="adopcion-header-btn" onClick={handleOpen}>
          Crear Historias
        </button>
      )}
      <CrearHistoria open={open} onClose={handleClose} />
    </section>
    
  );
};

export default Header;
