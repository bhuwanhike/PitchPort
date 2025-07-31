import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import PaymentHistory from "../schema/paymentHistory.schema.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // Use a recent API version for best compatibility
});

const paymentIntentController = async (req, res) => {
  const { amount, currency, description } = req.body;

  // Basic validation
  if (!amount || !currency) {
    return res
      .status(400)
      .json({ error: { message: "Amount and currency are required." } });
  }



  try {
    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents (e.g., 50 for $0.50)
      currency: currency, // e.g., 'usd'
      description: description || "Generic purchase",
      // Add other options like 'metadata', 'receipt_email' if needed
      // metadata: { userId: req.user.id, orderId: 'your-order-id' },
      // receipt_email: 'customer@example.com',
    });

    // Send the client secret back to the frontend.
    // The client secret is used by Stripe.js on the frontend to confirm the payment.
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    // Send a more detailed error message to the frontend for debugging
    res.status(500).json({
      error: {
        message:
          error.message ||
          "Failed to create payment intent due to server error.",
      },
    });
  }
};

const paymentSuccessController = async (req, res) => {
  const { paymentIntentId, userId, amount, currency } = req.body;

  if (!paymentIntentId || !userId || !amount || !currency) {
    return res
      .status(400)
      .json({ message: "Missing required payment details." });
  }

  try {
    // Verify the paymentIntent status with Stripe to ensure it's truly succeeded
    const stripePaymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (stripePaymentIntent.status !== "succeeded") {
      return res
        .status(400)
        .json({ message: "Payment Intent not succeeded yet." });
    }

    // Check if this payment has already been recorded to prevent duplicates
    const existingRecord = await PaymentHistory.findOne({
      stripePaymentIntentId: paymentIntentId,
    });
    if (existingRecord) {
      return res.status(200).json({
        message: "Payment already recorded.",
        payment: existingRecord,
      });
    }

    const newPaymentRecord = await PaymentHistory.create({
      userId: userId,
      stripePaymentIntentId: paymentIntentId,
      amount: amount,
      currency: currency,
      status: "succeeded",
      date: new Date(), // Capture the current date
    });

    res.status(201).json({
      message: "Payment recorded successfully!",
      payment: newPaymentRecord,
    });
  } catch (error) {
    console.error("Error recording payment success:", error);
    res.status(500).json({ message: "Server error recording payment." });
  }
};

const paymentHistoryController = async (req, res) => {
  const { userId } = req.params; // Get userId from URL parameters

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User ID is required to fetch payment history." });
  }

  try {
    // In a real app, ensure req.user.id matches userId for security
    const history = await PaymentHistory.find({ userId: userId }).sort({
      date: -1,
    }); // Sort by newest first

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ message: "Server error fetching payment history." });
  }
};

export {
  paymentIntentController,
  paymentSuccessController,
  paymentHistoryController,
};
