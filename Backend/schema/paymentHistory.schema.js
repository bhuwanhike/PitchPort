import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Link to your User schema's _id
      ref: "User", // Assuming your main user schema is named 'User'
      required: true,
    },
    email: {
      // Storing email for easier lookup, or use userId exclusively
      type: String,

      lowercase: true,
      trim: true,
    },
    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true, // Each payment intent ID should be unique
    },
    amount: {
      type: Number, // Amount in cents
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "usd",
    },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed", "canceled", "requires_action"], // Stripe PaymentIntent statuses
      default: "pending",
    },
    date: {
      // Date of the payment
      type: Date,
      default: Date.now,
    },
    // You can add more fields if needed, e.g.,
    // description: String,
    // receiptUrl: String, // From Stripe's charge object
    // paymentMethodBrand: String,
    // paymentMethodLast4: String,
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

const PaymentHistory = mongoose.model("PaymentHistory", paymentHistorySchema);

export default PaymentHistory;
