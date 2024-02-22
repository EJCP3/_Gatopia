import Navegacion from "../inicio/Navegacion"

 const Header = () => {
  return (
    <section>
    <Navegacion/>
    <h3 className="header-titulo">Dale una nueva oportunidad de vida a estos pequeños Michis</h3>
    <button className="header-btn" >Dar en adopción </button>
    </section>
  )
}

export default Header