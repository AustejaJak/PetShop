import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function StripePaymentForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntentId, setPaymentIntentId] = useState('');

    const stringClientSecret = clientSecret.toString()

    useEffect(() => {
        // Create PaymentIntent and fetch client secret from the backend
        fetch('http://localhost:5088/api/Stripe/Create-Payment-Intent', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ amount })
        })
        .then(response => response.json())
        .then(data => {
            setClientSecret(data.clientSecret);
            setPaymentIntentId(data.paymentIntentId);
        });
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(stringClientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (error) {
            console.error('Error:', error);
            return;
        }

        const { paymentMethod } = paymentIntent;

        const confirmResponse = await fetch('http://localhost:5088/api/Stripe/ConfirmPayment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
             },
            body: JSON.stringify({
                paymentIntentId: paymentIntentId,
                paymentMethodId: paymentMethod.id,
            }),
        });

        const confirmResult = await confirmResponse.json();

        if (confirmResponse.ok) {
            console.log('PaymentIntent:', confirmResult);
            if (confirmResult.status === 'succeeded') {
                console.log('Payment succeeded!');
            }
        } else {
            console.error('Error confirming payment:', confirmResult);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay {amount} EUR
            </button>
        </form>
    );
}

export default StripePaymentForm;
