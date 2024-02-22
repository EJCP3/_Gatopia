

export const InfoPagina = () => {
  return (
    <section className='main' >
      <article className="main-servicio">
        <h2 className="main-servicio-titulo" >Brindamos una nueva vida a todos los necesitados</h2>
        <p className="main-servicio-parrafo">
          Gatopia es una organización dedicada al rescate y cuidado de gatos sin
          hogar, brindándoles una nueva vida. A través de convenios con negocios
          locales, ofrecen alimentación y establecen planes de adopción para
          encontrarles hogares temporales y permanentes. programa de cuidado de
          barrios incluye esterilización, alimentación y seguimiento. También
          invitan a voluntarios a colaborar en diversas actividades y promueven
          una adopción responsable mediante un riguroso proceso de selección y
          guía de cuidado para los nuevos dueños.
        </p>
        <div className='main-servicio-contenido'>
        <div className="main-servicio-subcontenido">
          <h3>Alimentacion</h3>
          <img src="/src/assets/mobile/gatoServicio.svg" />
        </div>
        <div className="main-servicio-subcontenido">
          <h3>Planes de adopcion</h3>
          <img src="/src/assets/mobile/gatoServicio2.svg"/>
        </div>
        <div className="main-servicio-subcontenido">
          <h3>Adopción responsable</h3>
          <img src="/src/assets/mobile/gatoServicio3.svg"/>
        </div>
        </div>
      </article>
    </section>
  );
};

// export default Info;
