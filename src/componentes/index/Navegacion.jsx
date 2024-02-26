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
		<div className="index-nav">
			<img className="index-nav-logo" src="/src/assets/mobile/logo-read.svg"/>
			<nav className="index-nav-contenedor" ref={navRef}>
				<a className="index-nav-contenedor-link" href="/#" >index</a>
				<a  className="index-nav-contenedor-link" href="/#">Sobre nosotros</a>
				<a className="index-nav-contenedor-link" href="/#">Contactanos</a>
				<a className="index-nav-contenedor-item" href="/Home">Únete a la familia</a>
				<button
					className="index-nav-contenedor-btn index-nav-contenedor-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="index-nav-contenedor-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
			
		</div>
	);
}

export default Navegacion