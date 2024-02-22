import { Contacto } from "./Contacto"
import { FooterPagina } from "./FooterPagina"
import Header from "./Header"
import { InfoPagina } from "./InfoPagina"
import RedSocial from "./RedSocial"
import './estilos/styles.scss'



const Inicio = () => {
  return (
    < >
    <Header/>
    <InfoPagina/>
    <RedSocial/>
    <Contacto/>
    <FooterPagina/>
    </>
  )
}

export default Inicio