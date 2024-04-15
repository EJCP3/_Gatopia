import { Accordion } from 'rsuite';
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';


const Footer = () => {
  return (
<section className="donaciones-footer">

<Accordion  defaultActiveKey={1} bordered>
    <Accordion.Panel header="Otra forma de donar" eventKey={1} caretAs={FaAngleDoubleDown}>
    <p className="donaciones-footer-masInfo">
    También puede donar con comida, areneros y medicamentos. Puede enviarnos un correo a gatopia@gmail.com o visitar alguna de nuestras redes sociales.
            </p>
    </Accordion.Panel>
    <Accordion.Panel header="Transacciones" eventKey={2} caretAs={FaArrowAltCircleDown}>
    <h3 className="donaciones-footer-info-titulo"></h3>
            <p className="donaciones-footer-info-cuenta">Banreservas: <span>4547-4857-2021-4577</span></p>
            <p className="donaciones-footer-info-paypal">Paypal: <span>Gatopia</span> </p>
    </Accordion.Panel>
    <Accordion.Panel header="Ayudar/Info" eventKey={3} caretAs={FaArrowDown}>
      <p className="donaciones-footer-masInfo">
            Cualquier problema o duda no dude en contactarnos
            </p>
    </Accordion.Panel>
  </Accordion>

        {/* <article className="donaciones-footer-info">
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
        </picture> */}
    </section>
  )
}

export default Footer