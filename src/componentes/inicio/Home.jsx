
import './estilos/styles.scss'
import Header from './Header'
import Publicaciones from './Publicaciones'
import Navegacion from './Navegacion'

const Home = () => {
  return (
    <section className='home'>
        <Navegacion/>
        <Header/>
        <section className='home-publicacion'>
        <Publicaciones/>
        <Publicaciones/>
        </section>
        

    </section>
  )
}

export default Home