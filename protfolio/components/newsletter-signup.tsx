import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validate = (val: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    // TODO: Integrate with Mailchimp/ConvertKit API
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full border-2 border-gray-200 focus:border-primary focus:shadow-lg transition-all outline-none"
        disabled={submitted}
      />
      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow btn-lift transition-all disabled:opacity-60"
        disabled={submitted}
      >
        {submitted ? "Subscribed!" : "Subscribe"}
      </motion.button>
      {error && <span className="text-red-500 text-xs mt-1 w-full text-center">{error}</span>}
      {submitted && <span className="text-green-600 text-xs mt-1 w-full text-center">Thank you for subscribing!</span>}
    </form>
  );
} 