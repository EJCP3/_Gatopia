

const Pago = () => {
  return (
    <section className="donaciones-pago">
      <article className="donaciones-pago-form-pago">
        <div className="donaciones-pago-form-pago-paso">
          <img src="/src/assets/mobile/circuloNegro.svg"/>
          <img src="/src/assets/mobile/circuloGris.svg"/>
          <img src="/src/assets/mobile/circuloGris.svg"/>
        </div>
        <h3 className="donaciones-pago-form-pago-titulo">Metodo de pago</h3>
        <div className="donaciones-pago-form-pago-metodo">
        <button className=" donaciones-pago-form-pago-metodo-btn donaciones-pago-form-pago-metodo-btn_mastecard" >Mastecard</button>
        <button className=" donaciones-pago-form-pago-metodo-btn donaciones-pago-form-pago-metodo-btn_paypal">Paypal</button>
        </div>
       
      </article>
        
    </section>
  )
}

export default Pago