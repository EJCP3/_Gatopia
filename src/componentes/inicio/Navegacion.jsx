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
		<div className="main-nav">
			<div className="logo">
			<img className="main-nav-logo" src="/src/assets/mobile/logo-red.svg"/>
			<h3 className="main-nav-titulo">Usuario-1</h3>
			</div>
			
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">Adopciones</a>
                <a href="/#">Donaciones </a>
                <a href="/#">Historias</a>
				<a className="nav-item" href="/#">Configuracion</a>
                <a className="nav-item" href="/#">Cerrar Sesion</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</div>
	);
}

export default Navegacion