import { useNavigate } from "react-router-dom"
import { Contacto } from "./Contacto"
import { FooterPagina } from "./FooterPagina"
import Header from "./Header"
import  InfoPagina  from "./InfoPagina"
import RedSocial from "./RedSocial"
import './estilos/styles.scss'
import { useEffect } from "react"
import { supabase } from "../../supabase/client"





const Index = () => {
  const navigate = useNavigate();


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

export default Index