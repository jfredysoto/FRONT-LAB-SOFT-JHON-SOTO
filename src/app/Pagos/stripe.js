// stripe.js
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('tu_clave_publica'); // Reemplaza con tu clave pública de Stripe
  }
  return stripePromise;
};
