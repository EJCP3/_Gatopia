

export const FooterPagina = () => {
  return (
    <section className="index-footer">
      <img src="/src/assets/mobile/logo-read.svg"/>
     <ul className="index-footer-menu">
       <li className="index-footer-menu-item">
       <a className="index-footer-menu-link">
        index
       </a>
       </li> 
       <li className="index-footer-menu-item">
       <a className="index-footer-menu-link">
       Nosotros
       </a>
       </li> 
       <li className="index-footer-menu-item">
       <a className="index-footer-menu-link">
       Contactanos
       </a>
       </li> 
     </ul>
     <picture className="index-footer-redes">
        <a className="index-footer-redes-twitter">
        <img src="/src/assets/mobile/twitter.svg"/>
        </a>
        
        <a className="index-footer-redes-twitter">
        <img src="/src/assets/mobile/instagram.svg"/>
        </a>
     </picture>
     <a className="index-footer-login">Únete a la familia</a>
</section>
  )
}
