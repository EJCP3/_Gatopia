import  { useState } from 'react';
import { Steps, Panel, InputNumber, ButtonGroup, Button, InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import PayPalWrapper from '../../page/PaypalWrapper';


const Pago = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);

  const onNext = () => setStep(step < 1 ? step + 1 : 1);
  const onPrevious = () => setStep(step > 0 ? step - 1 : 0);
  console.log(step)

  const handlePaymentSuccess = (details) => {
    alert("Pago realizado con éxito! Detalles: " + JSON.stringify(details));
    setStep(0);  // Opcional: Reiniciar el proceso después de un pago exitoso.
  };

  

  const handleCustomAmountChange = (value) => {
    setAmount(value.toString());
    console.log(value)
  };

  // const handleDonate = () => {
  //   // Aquí podrías llamar a la API de PayPal o realizar otras operaciones de backend
  //   alert(`Donación procesada para $${ amount}`);
  // };

  const handlePaymentError = (error) => {
    console.error("Error en el pago:", error);
  };

  

  return (
    <Panel  className="donaciones-pago" shaded>
      <article className="donaciones-pago-form-pago">
      <Steps current={step}>
        <Steps.Item title="Método de pago"  />
        <Steps.Item title="Monto de donación" />
      </Steps>
      <hr />
      <Panel>
        {step === 0 && (
          <ButtonGroup>
            <Button onClick={() => onNext()}>PayPal</Button>
          </ButtonGroup>
        )}
        {step === 1 && (
          <div>
            <InputGroup>
              <InputNumber placeholder="Monto personalizado" value={amount}  onChange={(value) => handleCustomAmountChange(value)} />
              <InputGroup.Addon>$</InputGroup.Addon>
            </InputGroup>
          </div>
          
        )}
        {step === 1 && (
            <PayPalWrapper
              currency="USD"
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
        )}
      </Panel>
      <hr />
      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          Anterior
        </Button>
        <Button onClick={onNext} disabled={step >= 1}>
          Siguiente
        </Button>
      </ButtonGroup>


        {/* <div className="donaciones-pago-form-pago-paso">
          <img src="/src/assets/mobile/circuloNegro.svg"/>
          <img src="/src/assets/mobile/circuloGris.svg"/>
          <img src="/src/assets/mobile/circuloGris.svg"/>
        </div>
        <h3 className="donaciones-pago-form-pago-titulo">Metodo de pago</h3>
        <div className="donaciones-pago-form-pago-metodo">
        <button className=" donaciones-pago-form-pago-metodo-btn donaciones-pago-form-pago-metodo-btn_mastecard" >Mastecard</button>
        <button className=" donaciones-pago-form-pago-metodo-btn donaciones-pago-form-pago-metodo-btn_paypal">Paypal</button>
        </div> */}
       
      </article>
        
    </Panel>
  )
}

export default Pago