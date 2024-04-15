
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Componente envolvente para proporcionar el script de PayPal
const PayPalWrapper = ({ currency, amount, onSuccess, onError }) => {
  const initialOptions = {
    "client-id": "AerswaYzbd_BeRzJGbkQm5GKZMk0b6-MLqBHOLiXvYWU8f4_a9Xr7yBgTmeQI_5TcCXwDH7Q_0Rd1jVy", // Reemplaza YOUR_CLIENT_ID con tu clientId de PayPal
    currency: currency
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButton amount={amount} onSuccess={onSuccess} onError={onError} />
    </PayPalScriptProvider>
  );
};

// Componente botón de PayPal
const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalButtons 
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount
            }
          }]
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(details => {
          // Llamada cuando el pago es exitoso
          onSuccess(details);
        });
      }}
      onError={(error) => {
        // Llamada cuando hay un error en el proceso de pago
        onError(error);
      }}
    />
  );
};

export default PayPalWrapper;