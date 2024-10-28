import { getStripe } from './stripe.js';

// Crea una instancia de Stripe
const stripe = await getStripe();

const form = document.getElementById('payment-form');
const cardElement = document.createElement('div');
form.appendChild(cardElement);

// Crea un elemento de tarjeta de Stripe
const card = stripe.elements().create('card');
card.mount(cardElement);

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
    });

    if (error) {
        // Mostrar error en el UI
        document.getElementById('payment-status').innerText = error.message;
    } else {
        // Enviar paymentMethod.id a tu API para procesar el pago
        const response = await fetch('tu_api_endpoint/pagos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        const paymentResponse = await response.json();
        if (paymentResponse.error) {
            // Mostrar error en el UI
            document.getElementById('payment-status').innerText = paymentResponse.error;
        } else {
            // Pago exitoso
            document.getElementById('payment-status').innerText = 'Pago realizado exitosamente!';
        }
    }
});
