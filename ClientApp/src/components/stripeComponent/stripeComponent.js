import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function StripePaymentForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('Error:', error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            // Additional handling here, like calling your backend to create a charge
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay {amount}
            </button>
        </form>
    );
}

export default StripePaymentForm;