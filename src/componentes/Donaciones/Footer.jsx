import { Accordion } from 'rsuite';
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className="donaciones-footer">
      <div className="donaciones-footer-img">
        <img src="/src/assets/mobile/imagenDonacion.svg" alt="Donación"/>
        <img src="/src/assets/mobile/feedPet.svg" alt="Comida para mascotas"/>
        <img src="/src/assets/mobile/animals_cat.svg" alt="Gato"/>
      </div>

      <Accordion defaultActiveKey={1} bordered>
        <Accordion.Panel header="Otra forma de donar" eventKey={1} caretAs={FaAngleDoubleDown}>
          <p className="donaciones-footer-masInfo">
            También puede donar con comida, areneros y medicamentos. Puede enviarnos un correo a gatopia@gmail.com o visitar alguna de nuestras redes sociales.
          </p>
        </Accordion.Panel>
        <Accordion.Panel header="Transacciones" eventKey={2} caretAs={FaArrowAltCircleDown}>
          <p className="donaciones-footer-info-paypal">Paypal: <span>Gatopia</span></p>
        </Accordion.Panel>
        <Accordion.Panel header="Ayudar/Info" eventKey={3} caretAs={FaArrowDown}>
          <p className="donaciones-footer-masInfo">
            Cualquier problema o duda no dude en contactarnos.
          </p>
        </Accordion.Panel>
      </Accordion>
    </section>
  )
}

export default Footer;
