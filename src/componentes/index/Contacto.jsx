

export const Contacto = () => {
  return (
   <section className='index-contacto'>
    <h2 className='index-contacto-titulo'>Quieres ser parte del la familia <span>gatunas</span> </h2>
    <picture className='index-contacto-img'>
        <img src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoContacto.svg'/>
        <img src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoContacto1.svg'/>
    </picture>
    <div className="index-contacto-contenedor">
     <article className='index-contacto-contenedor-info' >
        <h3>
        INFORMACION DE CONTACTO
        </h3>
        <p className='index-contacto-contenedor-info-correo'>Gatopia@gmail.com</p>
        <p className='index-contacto-contenedor-info-numero'>+1 826 024 2023</p>

     </article>
     <article className='index-contacto-contenedor-form'>
        <h3>
        Envia un mensaje
        </h3>
        <form className='index-contacto-contenedor-form-formulario'>
        <label className='index-contacto-contenedor-form-titulo' htmlFor="nombre">Nombre</label>
        <input
        className='index-contacto-contenedor-form-input'
          type="text"
          id="nombre"
        />
        <label className='index-contacto-contenedor-form-titulo' htmlFor="email">Correo Electrónico</label>
        <input
        className='index-contacto-contenedor-form-input'
          type="email"
          id="email"
        />
        <label className='index-contacto-contenedor-form-titulo' htmlFor="mensaje">Mensaje</label>
        <textarea
        className='index-contacto-contenedor-form-textTarea'
          id="mensaje"
        />
      <button className='index-contacto-contenedor-form-btn' type="submit">Enviar</button>
    </form>
     </article>
     </div>
     <picture className='index-contacto-img'>
     <img  src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoContacto3.svg'/>
     <img  src='https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/sign/imagen/gatoContacto4.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW4vZ2F0b0NvbnRhY3RvNC5zdmciLCJpYXQiOjE3MTMyMzU3OTEsImV4cCI6MTcxNTgyNzc5MX0.S5-gtdEhC6JnIgpPX14vGQVRFAa16NYw1vCDmsB01mY&t=2024-04-16T02%3A49%3A51.637Z'/>
     </picture>
   
     
   </section>
  )
}

