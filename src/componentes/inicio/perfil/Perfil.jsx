import { supabase } from "../../../supabase/client"
import { useEffect, useState } from 'react'
import './modalPerfil.scss'

const Perfil = () => {

    const [perfil, setPerfil] = useState({nombreUsuario: '', fotoPerfil: '', portada: '', provincia: '', descripcion: '', fecha_creacion: '' })


    useEffect(() => {
		const fetchPerfil = async () => {
			try{
				const user = await supabase.auth.getUser();
				const { error, data} = await supabase.from("usuario")
        .select("nombre_usuario, foto_perfil, portada, provincia, descripción, fecha_creacion")
        .eq("userID", user.data.user.id);

				console.log(data)
        
        setPerfil({
          nombreUsuario: data[0].nombre_usuario,
          fotoPerfil: data[0].foto_perfil,
          portada: data[0].portada,
          provincia: data[0].provincia,
          descripcion: data[0].descripción,
          fecha_creacion: data[0].fecha_creacion
        })

				if(error) {
					throw error;
				}

			}catch(error) {
				alert(error.error_description || error.message);
		}
		};
		fetchPerfil();
	}, []); 





  return (
  
        <section className="modalP-perfil">
            <article className="modalP-perfil-contenedor">
                <img className='modalP-perfil-contenedor-portada' src={perfil.portada}/>
                <div className='modalP-perfil-contenedor-info-perfil'>
                    <img className='modalP-perfil-contenedor-info-perfil_logo' src={perfil.fotoPerfil}/>
                    <h3 className='modalP-perfil-contenedor-info-perfil_nombre'>{perfil.nombreUsuario}</h3>
                </div>
                <div className="modalP-perfil-contenedor-info">
                <p className='modalP-perfil-info-fecha'>
                      {perfil.provincia}
                    </p>
                    <p className='modalP-perfil-contenedor-info-fecha'>
                     <strong>fecha de creación:</strong>  {perfil.fecha_creacion}
                    </p>
                    <p className='modalP-perfil-contenedor-info-des'>
                    {perfil.descripcion}
                    </p>
                    
                </div>
            </article>
        </section>
  )
}


export default Perfil