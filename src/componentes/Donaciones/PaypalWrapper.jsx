import  { useEffect } from 'react';

const PayPalWrapper = ({ amount, currency, onSuccess, onError }) => {
  useEffect(() => {
    let isMounted = true; // Flag para controlar el montaje del componente

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AerswaYzbd_BeRzJGbkQm5GKZMk0b6-MLqBHOLiXvYWU8f4_a9Xr7yBgTmeQI_5TcCXwDH7Q_0Rd1jVy&currency=${currency}`;
    document.body.appendChild(script);

    script.onload = () => {
      if (isMounted) {
        window.paypal.Buttons({
          // Configuración de botones
        }).render('#paypal-button-container').catch(error => {
          console.error('PayPal Buttons failed to load:', error);
        });
      }
    };

    return () => {
      isMounted = false;
      if (window.paypal && window.paypal.Buttons) {
        window.paypal.Buttons().close(); // Asegúrate de cerrar los botones de PayPal
      }
      document.body.removeChild(script);
    };
  }, [currency, amount]); // Dependencias que pueden requerir recarga del script

  return <div id="paypal-button-container"></div>;
};

export default PayPalWrapper;
