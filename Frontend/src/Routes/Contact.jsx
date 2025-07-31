import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Your message has been submitted (mock)");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Illustration */}
        <div className="hidden md:flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740"
            alt="Contact Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="backdrop-blur-md bg-white/60 shadow-lg p-10 rounded-2xl border border-white/30">
          <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-gray-700 mb-8 text-center">
            Have a question, idea, or partnership proposal? We’d love to hear from you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Let us know your need"
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
