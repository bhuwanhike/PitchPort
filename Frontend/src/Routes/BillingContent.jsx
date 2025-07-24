import React from "react";
import { CreditCard, Download, CheckCircle } from "lucide-react";

// --- DUMMY DATA ---
const billingData = {
  currentPlan: {
    name: "Pro Investor",
    price: 99,
    period: "monthly",
    features: [
      "Unlimited Startup Pitches",
      "Advanced Analytics",
      "Direct Messaging with Founders",
      "Priority Support",
    ],
  },
  paymentMethod: {
    brand: "Visa",
    last4: "4242",
    expiry: "12/26",
  },
  billingHistory: [
    { id: "inv_12345", date: "June 1, 2024", amount: 99.0, status: "Paid" },
    { id: "inv_12344", date: "May 1, 2024", amount: 99.0, status: "Paid" },
    { id: "inv_12343", date: "April 1, 2024", amount: 99.0, status: "Paid" },
    { id: "inv_12342", date: "March 1, 2024", amount: 99.0, status: "Paid" },
  ],
};

// --- HELPER COMPONENTS ---

const SettingsCard = ({ title, description, children, footer }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl">
    <div className="p-6 border-b border-slate-700/80">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {description && (
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      )}
    </div>
    <div className="p-6">{children}</div>
    {footer && (
      <div className="p-6 bg-slate-800/30 border-t border-slate-700/80 rounded-b-2xl flex justify-end items-center">
        {footer}
      </div>
    )}
  </div>
);

// --- MAIN BILLING PAGE COMPONENT ---

const BillingContent = () => {
  const { currentPlan, paymentMethod, billingHistory } = billingData;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Billing & Subscriptions
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your subscription, payment method, and view your invoice
          history.
        </p>
      </div>

      {/* Current Plan Section */}
      <SettingsCard
        title="Current Plan"
        footer={
          <button
            type="button"
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors"
          >
            Upgrade Plan
          </button>
        }
      >
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {currentPlan.name}
            </h3>
            <p className="text-slate-400">
              <span className="text-3xl font-extrabold text-white">
                ${currentPlan.price}
              </span>{" "}
              / month
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-slate-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SettingsCard>

      {/* Payment Method Section */}
      <SettingsCard
        title="Payment Method"
        description="Your primary payment method for all transactions on PitchPort."
        footer={
          <button
            type="button"
            className="bg-slate-700/80 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all"
          >
            Update Payment Method
          </button>
        }
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-8 bg-slate-700 rounded-md flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-white">
              {paymentMethod.brand} ending in {paymentMethod.last4}
            </p>
            <p className="text-sm text-slate-400">
              Expires {paymentMethod.expiry}
            </p>
          </div>
        </div>
      </SettingsCard>

      {/* Billing History Section */}
      <SettingsCard
        title="Billing History"
        description="Download your past invoices for your records."
      >
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
                <tr key={invoice.id} className="border-t border-slate-700/80">
                  <td className="px-4 py-4 text-slate-300">{invoice.date}</td>
                  <td className="px-4 py-4 text-white font-medium">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <a
                      href="#"
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
      </SettingsCard>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BillingContent;
