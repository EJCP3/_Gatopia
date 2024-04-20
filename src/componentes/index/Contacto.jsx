import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast,Toaster } from 'sonner';

export const Contacto = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_h7f16tp', 'template_l2bilsi', form.current, '7A-xyLXHrHQM0zJ39')
      .then((result) => {
          console.log('SUCCESS!', result.text);
          toast.success('Correo enviado con éxito!'); // Notificación de éxito
      }, (error) => {
          console.log('FAILED...', error.text);
          toast.error('Error al enviar el correo.'); // Notificación de error
      });
  };

  return (
    <section className='index-contacto'>
          <Toaster position="top-center" reverseOrder={false} /> 
      <h2 className='index-contacto-titulo'>Quieres ser parte de la familia <span>gatunas</span></h2>
      <picture className='index-contacto-img'>
        <img src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoContacto.svg' alt="Gato contacto" />
        <img src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoContacto1.svg' alt="Gato contacto" />
      </picture>
      <div className="index-contacto-contenedor">
        <article className='index-contacto-contenedor-info'>
          <h3>INFORMACIÓN DE CONTACTO</h3>
          <p className='index-contacto-contenedor-info-correo'>Gatopia@gmail.com</p>
          <p className='index-contacto-contenedor-info-numero'>+1 826 024 2023</p>
        </article>
        <article className='index-contacto-contenedor-form'>
          <h3>Envía un mensaje</h3>
          <form className='index-contacto-contenedor-form-formulario' ref={form} onSubmit={sendEmail}>
            <label className='index-contacto-contenedor-form-titulo' htmlFor="nombre">Nombre</label>
            <input
              className='index-contacto-contenedor-form-input'
              type="text"
              id="nombre"
              name="name" // Importante para vincular con EmailJS
            />
            <label className='index-contacto-contenedor-form-titulo' htmlFor="email">Correo Electrónico</label>
            <input
              className='index-contacto-contenedor-form-input'
              type="email"
              id="email"
              name="email" // Importante para vincular con EmailJS
            />
            <label className='index-contacto-contenedor-form-titulo' htmlFor="mensaje">Mensaje</label>
            <textarea
              className='index-contacto-contenedor-form-textTarea'
              id="mensaje"
              name="message" // Importante para vincular con EmailJS
            />
            <button className='index-contacto-contenedor-form-btn' type="submit">Enviar</button>
          </form>
        </article>
      </div>
      <picture className='index-contacto-img'>
        <img src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoContacto3.svg' alt="Gato contacto" />
        <img src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/sign/imagen/gatoContacto4.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW4vZ2F0b0NvbnRhY3RvNC5zdmciLCJpYXQiOjE3MTMyMzU3OTEsImV4cCI6MTcxNTgyNzc5MX0.S5-gtdEhC6JnIgpPX14vGQVRFAa16NYw1vCDmsB01mY&t=2024-04-16T02%3A49%3A51.637Z' alt="Gato contacto" />
      </picture>
    </section>
  );
}
