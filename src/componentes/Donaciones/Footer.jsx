

const Footer = () => {
  return (
    <section>
        <article className="footer-info">
            <picture className="footer-info-img">
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
            </picture>
            <h3 className="footer-info-titulo">Transacciones</h3>
            <p className="footer-info-cuenta">Cuenta de resevasa: <span>4547-4857-2021-4577</span></p>
            <p className="footer-info-paypal">Paypal: <span>Gatopia</span> </p>
            <picture className="footer-info-img">
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
                <img src="/src/assets/mobile/imagenDonacion.svg"/>
            </picture>
        </article>
            <p className="footer-masInfo">
            También puede donar con comida,areneros,medicamentos.
            </p>
        <picture className="footer-img">
            <img src="/src/assets/mobile/feedPet.svg"/>
            <img src="/src/assets/mobile/animals_cat.svg"/>
        </picture>
    </section>
  )
}

export default Footer