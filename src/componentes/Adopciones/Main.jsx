const Main = () => {
  return (
      <article className="adopcion-card">
        <img
          className="adopcion-card-img"
          src="/src/assets/mobile/gatoAdopcion.svg"
        />
        <div className="adopcion-card-sub">
          <h3 className="adopcion-card-sub-nombre">Nombre</h3>

          <h3 className="adopcion-card-sub-edad">Edad</h3>
        </div>
      </article>
  );
};

export default Main;
