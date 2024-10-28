const express = require('express');
const stripe = require('stripe')('tu_clave_secreta'); // Reemplaza con tu clave secreta de Stripe
const app = express();
app.use(express.json());

app.post('/api/pagos', async (req, res) => {
    try {
        const { paymentMethodId } = req.body;

        // Crea un pago
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // Monto en centavos
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.status(200).send({ success: true, paymentIntent });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
