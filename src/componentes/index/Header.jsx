import Navegacion from "./Navegacion";


const Header = () => {
  return (
    <>
      <Navegacion />
      <section className="header">
      <h6 className="header-titulo"> {"Una nueva vida para nuestro amigo bigotudo"}</h6>
      <h3 className="header-subtitulo">
        {"Gatopia dedicada organización dedicado al rescate y cuidado de gato sin hogar"}
        <span className="header-subtitulo-img" ></span>
      </h3>
       {/* <img className="header-imagenPortada" src="/src/assets/mobile/gatoheader.svg"/> */}
      <a className="header-home-btn" href="/Adopciones">Conoce a nuestros bigotudo</a>
      <div className="header-img">
        <img  src="/src/assets/mobile/feedPet.svg"/> <img src="/src/assets/mobile//animals_cat.svg"/>
      </div>
      </section>
    </>
  );
};

export default Header;
