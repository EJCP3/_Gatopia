import Navegacion from "../inicio/Navegacion"
import '/src/componentes/inicio/estilos/layout/_navegacion.scss'

const Header = () => {
  return (
   <section>
    <Navegacion/>
     <h2 className="header-titulo">Donaciones</h2>
   </section>
  )
}

export default Header