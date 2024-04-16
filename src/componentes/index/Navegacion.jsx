import { useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "./login-registro/BtnModal";
import { supabase } from "../../supabase/client";
import ModalPerfil from "../inicio/perfil/ModalPerfil";


const  Navegacion = () => {
	const navRef = useRef();
	
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};



console.log("sadasdu")






	return (
		<div className="index-nav">
			<img className="index-nav-logo" src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/sign/imagen/logo-read.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW4vbG9nby1yZWFkLnN2ZyIsImlhdCI6MTcxMzIzNTg5NiwiZXhwIjoyMDI4NTk1ODk2fQ.H95FxH9KuRvqsHPnxk4cpkuBLPw2FUJMQ-8QpUXVVbM"/>
			<nav className="index-nav-contenedor" ref={navRef}>
				<a className="index-nav-contenedor-link" href="/#" >Home</a>
				<a  className="index-nav-contenedor-link" href="/#">Sobre nosotros</a>
				<a className="index-nav-contenedor-link" href="/#">Contactanos</a>
				<div>
				<Modal/>
				</div>
				
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