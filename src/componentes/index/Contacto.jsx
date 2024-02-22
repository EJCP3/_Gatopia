

export const Contacto = () => {
  return (
   <section className='contacto'>
    <h2 className='contacto-titulo'>Quieres ser parte del la familia <span>gatunas</span> </h2>
    <picture className='contacto-img'>
        <img src='/src/assets/mobile/gatoContacto.svg'/>
        <img src='/src/assets/mobile/gatoContacto1.svg'/>
    </picture>
     <article className='contacto-info' >
        <h3>
        INFORMACION DE CONTACTO
        </h3>
        <p className='contacto-info-correo'>Gatopia@gmail.com</p>
        <p className='contacto-info-numero'>+1 826 024 2023</p>
     </article>
     <article className='contacto-form'>
        <h3>
        Envia un mensaje
        </h3>
        <form className='contacto-form-formulario'>
        <label className='contacto-form-titulo' htmlFor="nombre">Nombre</label>
        <input
        className='contacto-form-input'
          type="text"
          id="nombre"
        />
        <label className='contacto-form-titulo' htmlFor="email">Correo Electrónico</label>
        <input
        className='contacto-form-input'
          type="email"
          id="email"
        />
        <label className='contacto-form-titulo' htmlFor="mensaje">Mensaje</label>
        <textarea
        className='contacto-form-textTarea'
          id="mensaje"
        />
      <button className='contacto-form-btn' type="submit">Enviar</button>
    </form>
     </article>
     <img className='contacto-foto' src='/src/assets/mobile/gatoContacto3.svg'/>
   </section>
  )
}

