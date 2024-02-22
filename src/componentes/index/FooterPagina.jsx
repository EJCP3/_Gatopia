

export const FooterPagina = () => {
  return (
    <section className="footer">
    <div className="footer-logo">
        <img className="footer-logo-img" src="/src/assets/mobile/logo.svg"/>
        <h3 className="footer-logo-titulo">gatopia</h3>
        </div>
     <ul className="footer-menu">
       <li className="footer-menu-item">
       <a className="footer-menu-link">
        Home
       </a>
       </li> 
       <li className="footer-menu-item">
       <a className="footer-menu-link">
       Nosotros
       </a>
       </li> 
       <li className="footer-menu-item">
       <a className="footer-menu-link">
       Contactanos
       </a>
       </li> 
     </ul>
     <picture className="footer-redes">
        <img src="/src/assets/mobile/twitter.svg"/>
        <img src="/src/assets/mobile/instagram.svg"/>
     </picture>
     <a className="footer-login">Únete a la familia</a>
</section>
  )
}
