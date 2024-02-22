
import Navegacion from "../inicio/Navegacion"
import '/src/componentes/inicio/estilos/layout/_navegacion.scss'


const Header = () => {
  return (
    <section>
        <Navegacion/>
        <h3 className="header-titulo">
         Historias de los mas valientes
        </h3>
    </section>
  )
}

export default Header