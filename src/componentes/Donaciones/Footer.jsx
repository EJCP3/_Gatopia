

const Footer = () => {
  return (
    <section className="donaciones-footer">
        <article className="donaciones-footer-info">
            <picture className="donaciones-footer-info-img">
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
            </picture>
            <h3 className="donaciones-footer-info-titulo">Transacciones</h3>
            <p className="donaciones-footer-info-cuenta">Cuenta de resevasa: <span>4547-4857-2021-4577</span></p>
            <p className="donaciones-footer-info-paypal">Paypal: <span>Gatopia</span> </p>
            <picture className="donaciones-footer-info-img">
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
            </picture>
        </article>
            <p className="donaciones-footer-masInfo">
            También puede donar con comida,areneros,medicamentos.
            </p>
        <picture className="donaciones-footer-img">
            <img src="/src/assets/mobile/feedPet.svg"/>
            <img src="/src/assets/mobile/animals_cat.svg"/>
        </picture>
    </section>
  )
}

export default Footer