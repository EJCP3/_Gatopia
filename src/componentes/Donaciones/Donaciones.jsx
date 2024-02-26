import Footer from "./Footer"
import Header from "./Header"
import Pago from "./Pago"
import './estilos/styles.scss'

const Donaciones = () => {
  return (
    <section className="donaciones">
        <Header/>
        <Pago/>
        <Footer/>
    </section>
  )
}

export default Donaciones