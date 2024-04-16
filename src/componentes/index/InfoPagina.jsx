

 const InfoPagina = () => {
  return (
    <section  className='index-main' >
      <article className="index-main-servicio">
        <h2 className="index-main-servicio-titulo" >Brindamos una nueva vida a todos los necesitados</h2>
        <p className="index-main-servicio-parrafo">
          Gatopia es una organización dedicada al rescate y cuidado de gatos sin
          hogar, brindándoles una nueva vida. A través de convenios con negocios
          locales, ofrecen alimentación y establecen planes de adopción para
          encontrarles hogares temporales y permanentes. programa de cuidado de
          barrios incluye esterilización, alimentación y seguimiento. También
          invitan a voluntarios a colaborar en diversas actividades y promueven
          una adopción responsable mediante un riguroso proceso de selección y
          guía de cuidado para los nuevos dueños.
        </p>
        <div className='index-main-servicio-contenido'>
        <figure className="index-main-servicio-subcontenido">
          <figcaption>Alimentacion</figcaption>
          <img src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoServicio.svg" />
        </figure>
        <figure className="index-main-servicio-subcontenido">
          <figcaption>Planes de adopcion</figcaption>
          <img src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoServicio2.svg"/>
        </figure>
        <figure className="index-main-servicio-subcontenido">
          <figcaption>Adopción responsable</figcaption>
          <img src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoServicio3.svg"/>
        </figure>
        </div>
      </article>
    </section>
  );
};

export default InfoPagina;
