import Navegacion from "./Navegacion";


const Header = () => {
  return (
    <>
      <Navegacion />
      <section className="index-header">
      <h6 className="index-header-titulo"> {"Una nueva vida para nuestro amigo bigotudo"}</h6>
      <h3 className="index-header-subtitulo">
        {"Gatopia dedicada organización dedicado al rescate y cuidado de gato sin hogar"}
        <span className="index-header-subtitulo-img" ></span>
      </h3>
      <a className="index-header-btn" href="/Adopciones">Conoce a nuestros bigotudo</a>
      <img className="index-header-imagenPortada" src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoheader.svg"/>
      <div className="index-header-img">
        <img  src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/feedPet.svg"/> <img src="/src/assets/mobile//animals_cat.svg"/>
      </div>
      </section>
    </>
  );
};

export default Header;
