import Navegacion from "./Navegacion"



const Header = () => {
  return (
    <section>
        <Navegacion/>
        <h2 className="header-titulo">Gato del dias</h2>
        <picture className="header-img">
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias2.svg"/>
            <img src="/src/assets/mobile/gatodias3.svg"/>
        </picture>
        <input className="publi-input" placeholder="¿En qué estás pensando?"/>
    </section>
  )
}

export default Header