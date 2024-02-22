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
			<img className="main-nav-logo" src="/src/assets/mobile/logo.svg"/>
			<h3 className="main-nav-titulo" >gatopia</h3>
			</div>
			
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">Sobre nosotros</a>
				<a href="/#">Contactanos</a>
				<a className="nav-item" href="/#">Únete a la familia</a>
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