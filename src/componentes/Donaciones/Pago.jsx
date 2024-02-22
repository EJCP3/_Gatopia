

const Pago = () => {
  return (
    <section>
      <article className="form-pago">
        <div className="form-pago-paso">
          <img src="/src/assets/mobile/circuloNegro.svg"/>
          <img src="/src/assets/mobile/circuloGris.svg"/>
          <img src="/src/assets/mobile/circuloGris.svg"/>
        </div>
        <h3 className="form-pago-titulo">Metodo de pago</h3>
        <div className="form-pago-metodo">
        <button className=" btn form-pago-metodo-btn_mastecard" >Mastecard</button>
        <button className=" btn form-pago-metodo-btn_paypal">Paypal</button>
        </div>
       
      </article>
        
    </section>
  )
}

export default Pago