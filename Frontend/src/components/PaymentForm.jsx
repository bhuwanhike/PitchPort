// src/components/PaymentForm.jsx
import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { XCircle, CreditCard as CreditCardIcon } from "lucide-react"; // Added CreditCardIcon for consistency

// Load Stripe.js outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Options for styling the CardElement
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#E2E8F0", // Light gray for text
      fontFamily: '"Inter", sans-serif', // Using Inter font
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#94A3B8", // Slate-400 for placeholder
      },
    },
    invalid: {
      color: "#EF4444", // Red-500 for invalid input
      iconColor: "#EF4444",
    },
  },
  hidePostalCode: true, // Often handled separately or not needed for simple updates
};

// Reusable component for a form field
const FormField = ({ label, children }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-medium text-slate-300 mb-1">{label}</label>
    {children}
  </div>
);

const CheckoutForm = ({
  amount,
  currency,
  onSuccess,
  onError,
  onCancel,
  successMssg,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setPaymentError(null);
    setPaymentSuccess(false);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      setLoading(false);
      return;
    }

    // 1. Create a Payment Intent on your backend
    // For updating a payment method, you might typically use a SetupIntent
    // However, sticking to PaymentIntent as per previous discussion,
    // where a small authorization amount is used.
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/create-payment-intent`, // Ensure this path is correct
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          description: "Update Payment Method Authorization",
        }),
      }
    );

    const { clientSecret, error: backendError } = await response.json();

    if (backendError) {
      setPaymentError(
        backendError.message || "Failed to create payment intent."
      );
      onError(backendError.message || "Failed to create payment intent.");
      setLoading(false);
      return;
    }

    // 2. Confirm the card payment on the client-side
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName, // Pass cardholder name to Stripe
          },
        },
      }
    );
    // console.log("trying for error", error);
    // console.log("Payment Intent:", paymentIntent.status);

    if (error) {
      setPaymentError(error.message);
      onError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      onSuccess(paymentIntent); // Pass paymentIntent details to parent
    } else {
      setPaymentError(
        "Payment not successful. Status: " + paymentIntent.status
      );
      onError("Payment not successful. Status: " + paymentIntent.status);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 relative"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        title="Cancel Payment"
      >
        <XCircle className="w-6 h-6" />
      </button>

      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Update Payment Method
      </h3>

      <div className="space-y-5">
        {/* Cardholder Name */}
        <FormField label="Cardholder Name">
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            className="input-field"
            required
          />
        </FormField>

        {/* Card Details */}
        <FormField label="Card Details">
          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800 focus-within:border-cyan-500 transition-colors">
            <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
          </div>
        </FormField>

        {/* Payment Messages */}
        {paymentError && (
          <div className="text-red-500 text-sm bg-red-900/20 border border-red-700 rounded-md p-3">
            {paymentError}
          </div>
        )}
        {paymentSuccess && (
          <div className="text-green-500 text-sm bg-green-900/20 border border-green-700 rounded-md p-3">
            {successMssg}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="
          mt-8 w-full
          bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
          text-white font-bold py-3.5 rounded-lg shadow-lg
          transition-all duration-300 hover:brightness-110
          focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-60
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Processing..." : `Confirm Payment Method`}
      </button>
    </form>
  );
};

// Wrapper component to provide Stripe context
const StripePaymentWrapper = ({
  amount,
  currency,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <div className="max-w-md mx-auto my-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          currency={currency}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel} // Pass onCancel to CheckoutForm
        />
      </Elements>
    </div>
  );
};

export default StripePaymentWrapper;
