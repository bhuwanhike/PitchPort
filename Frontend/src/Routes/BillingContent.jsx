import React, { useState, useEffect } from "react";
import { CreditCard, Download, CheckCircle, XCircle } from "lucide-react";
import StripePaymentWrapper from "../components/PaymentForm";
import { jwtDecode } from "jwt-decode";

// --- HELPER COMPONENTS ---

const SettingsCard = ({ title, description, children }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl">
    <div className="p-6 border-b border-slate-700/80">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {description && (
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// --- MAIN BILLING PAGE COMPONENT ---

const BillingContent = () => {
  const [currentPlan, setCurrentPlan] = useState({
    // MODIFIED: Changed from initialBillingData to individual states
    name: "Pro Investor",
    price: 99,
    period: "monthly",
    features: [
      "Unlimited Startup Pitches",
      "Advanced Analytics",
      "Direct Messaging with Founders",
      "Priority Support",
    ],
  });
  const [paymentMethod, setPaymentMethod] = useState({
    // MODIFIED: Changed from initialBillingData to individual states
    brand: "Visa",
    last4: "4242",
    expiry: "12/26",
  });
  const [billingHistory, setBillingHistory] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [showSuccessMssg, setShowSuccessMssg] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const userId = decoded.id;
    setCurrentUser(userId);
    const fetchUserDataAndHistory = async () => {
      setLoadingHistory(true);
      setHistoryError(null);
      try {
        if (!userId) {
          console.error("User not logged in or missing ID/email for billing.");
          setHistoryError("Please log in to view billing details.");
          return;
        }
        setCurrentUser(userId);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/history/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const historyData = await response.json();
          setBillingHistory(historyData);
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch billing history."
          );
        }
      } catch (err) {
        console.error("Error fetching billing history:", err);
        setHistoryError(err.message || "Failed to load billing history.");
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchUserDataAndHistory();
  }, []);

  const handlePaymentSuccess = async (paymentIntent) => {
    console.log("Stripe PaymentIntent Succeeded:", paymentIntent);
    setPaymentMessage("Payment completed successfully!");

    setPaymentMethod((prevMethod) => ({
      // MODIFIED: Using setPaymentMethod directly
      ...prevMethod,
      brand: paymentIntent.payment_method?.card?.brand || "Visa", // MODIFIED: Use actual brand if available
      last4: paymentIntent.payment_method?.card?.last4 || "XXXX", // MODIFIED: Use actual last4 if available
      expiry: "XX/XX", // Dummy expiry for now, or fetch from PM object
    }));

    if (currentUser) {
      try {
        const recordResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/record-payment-success`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              userId: currentUser,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
            }),
          }
        );

        if (recordResponse.ok) {
          const recordedPayment = await recordResponse.json();
          console.log("Payment recorded in DB:", recordedPayment);

          // NEW: Re-fetch history to update the UI
          const updatedHistoryResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/history/${currentUser}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (updatedHistoryResponse.ok) {
            const updatedHistory = await updatedHistoryResponse.json();
            setBillingHistory(updatedHistory);
            setLoadingHistory(false);
          } else {
            console.error(
              "Failed to re-fetch history after recording payment."
            );
          }
        } else {
          const errorData = await recordResponse.json();
          console.error("Failed to record payment in DB:", errorData.message);
          setPaymentMessage(
            `Payment succeeded but failed to record history: ${errorData.message}`
          );
        }
      } catch (dbError) {
        console.error(
          "Error calling record-payment-success endpoint:",
          dbError
        );
        setPaymentMessage(
          `Payment succeeded but failed to record history: ${dbError.message}`
        );
      }
    } else {
      console.warn("No current user to record payment history for.");
    }

    setShowPaymentForm(false); // Hide the form
    setTimeout(() => setShowSuccessMssg(false), 5000);
  };

  const handlePaymentError = (error) => {
    console.error("Stripe Payment Error:", error);
    setPaymentMessage(`Error processing payment: ${error}`);
    setTimeout(() => setShowSuccessMssg(false), 5000); // Clear message after 5 seconds
  };

  // Function to handle canceling the payment form
  const handleCancelPayment = () => {
    setShowPaymentForm(false);
    setShowSuccessMssg(false); // Clear any messages when canceling
  };

  return (
    <div className="space-y-8 animate-fadeIn py-8 px-18">
      {/* Page Header */}
      {/* {console.log(!currentUser?.userId)} */}
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Billing & Subscriptions
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your subscription, payment method, and view your invoice
          history.
        </p>
      </div>

      {/* Payment Message Display */}
      {/* {paymentMessage && (
        <div
          className={`p-4 rounded-lg text-white ${
            paymentMessage.startsWith("Error") ? "bg-red-600" : "bg-green-600"
          } flex items-center justify-between`}
        >
          <span>{paymentMessage}</span>
          <button
            onClick={() => setPaymentMessage(null)}
            className="text-white hover:text-gray-200"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )} */}

      {/* NEW: Payment Section - Now for initiating a payment for a plan */}
      <SettingsCard
        title="Payment Section"
        description="Pay to become a Pro Investor."
      >
        <h2 className="text-xl font-bold text-white mx-auto w-full text-center">
          Pay just $99 to become a Pro Investor
        </h2>
        {
          <div className="mt-4">
            <StripePaymentWrapper
              amount={currentPlan.price * 100} // Amount in cents
              currency="usd"
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handleCancelPayment}
              successMssg={paymentMessage}
              showSuccessMssg={showSuccessMssg}
              setShowSuccessMssg={setShowSuccessMssg}
            />
          </div>
        }
      </SettingsCard>

      {/* Billing History Section */}
      <SettingsCard
        title="Billing History"
        description="Download your past invoices for your records."
      >
        {loadingHistory ? ( // MODIFIED: Added loading state
          <div className="text-slate-400 text-center py-4">
            Loading billing history...
          </div>
        ) : historyError ? ( // MODIFIED: Added error state
          <div className="text-red-500 text-center py-4">
            Error: {historyError}
          </div>
        ) : billingHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((invoice) => (
                  <tr
                    key={invoice.stripePaymentIntentId}
                    className="border-t border-slate-700/80"
                  >
                    {" "}
                    {/* MODIFIED: Key changed to stripePaymentIntentId */}
                    <td className="px-4 py-4 text-slate-300">
                      {new Date(invoice.date).toLocaleDateString("en-US", {
                        // MODIFIED: Date formatting
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4 text-white font-medium">
                      ${(invoice.amount / 100).toFixed(2)}{" "}
                      {/* MODIFIED: Convert cents to dollars */}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          // MODIFIED: Dynamic status styling
                          invoice.status === "succeeded"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <a
                        href="#" // In a real app, this would be invoice.receiptUrl
                        className="flex items-center justify-end gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-slate-400 text-center py-4">
            {" "}
            {/* MODIFIED: Message for no history */}
            No billing history records yet.
          </div>
        )}
      </SettingsCard>
    </div>
  );
};

export default BillingContent;
