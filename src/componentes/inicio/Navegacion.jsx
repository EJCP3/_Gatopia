import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navegacion() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<div className="home-nav">
		<div className ="home-nav-logo">
			<img className="home-nav-logo-img" src="/src/assets/mobile/logo-red.svg"/>
			<h3 className="home-nav-logo-titulo">Usuario-1</h3>
		</div>
		
		<nav className="home-nav-contenedor" ref={navRef}>
			<div className="home-nav-contenedor-pagina">
			<a className="home-nav-contenedor-pagina-link" href="/Home" >Home</a>
			<a  className="home-nav-contenedor-pagina-link" href="/Adopciones">Adopciones</a>
			<a className="home-nav-contenedor-pagina-link" href="/Donaciones">Donaciones</a>
			<a className="home-nav-contenedor-pagina-link" href="/Historias">Historias</a>
			</div>
			<div className="home-nav-contenedor-confi">
			<a className="home-nav-contenedor-confi-item" href="/#">Configuracion</a>
			<a className="home-nav-contenedor-confi-item" href="/">Cerrar sesion</a>
			</div>
			
			<button
				className="home-nav-contenedor-btn home-nav-contenedor-close-btn"
				onClick={showNavbar}>
				<FaTimes />
			</button>
		</nav>
		<button
			className="home-nav-contenedor-btn"
			onClick={showNavbar}>
			<FaBars />
		</button>
		
	</div>
	);
}

export default Navegacion