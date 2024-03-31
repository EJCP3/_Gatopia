import './estilos/layout/_home.scss'


const Header = () => {

  
  return (
    <section className="home-header" >
       
        <h2 className="home-header-titulo">Gato del dias</h2>
        <picture className="home-header-img">
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias2.svg"/>
            <img src="/src/assets/mobile/gatodias3.svg"/>
        </picture>
        <input className="home-header-input" placeholder="¿En qué estás pensando?"/>
    </section>
  )
}

export default Header