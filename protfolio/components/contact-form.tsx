import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}
interface TouchedState {
  name?: boolean;
  email?: boolean;
  service?: boolean;
  message?: boolean;
}
interface ErrorsState {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

const initialState: FormState = { name: "", email: "", service: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<TouchedState>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});

  const validate = (field: FormState = form): ErrorsState => {
    const errs: ErrorsState = {};
    if (!field.name) errs.name = "Name is required";
    if (!field.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.email)) errs.email = "Valid email required";
    if (!field.service) errs.service = "Select a service";
    if (!field.message) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(validate({ ...form, [e.target.name]: e.target.value } as FormState));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, service: true, message: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      // TODO: Integrate with email service (e.g., EmailJS, Formspree, custom API)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary mb-2">Contact Us</h2>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded border-2 transition-all focus:border-primary focus:shadow-lg ${errors.name && touched.name ? "border-red-400" : "border-gray-200"}`}
        />
        {errors.name && touched.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded border-2 transition-all focus:border-primary focus:shadow-lg ${errors.email && touched.email ? "border-red-400" : "border-gray-200"}`}
        />
        {errors.email && touched.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded border-2 transition-all focus:border-primary focus:shadow-lg ${errors.service && touched.service ? "border-red-400" : "border-gray-200"}`}
        >
          <option value="">Service Interest</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>
        {errors.service && touched.service && <span className="text-red-500 text-xs mt-1">{errors.service}</span>}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded border-2 transition-all focus:border-primary focus:shadow-lg resize-none min-h-[100px] ${errors.message && touched.message ? "border-red-400" : "border-gray-200"}`}
        />
        {errors.message && touched.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <button
          type="submit"
          className="btn-lift bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-secondary transition-all"
        >
          {submitted ? "Submitted!" : "Send Message"}
        </button>
      </motion.div>
      {submitted && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-center font-medium mt-2">Thank you! We'll be in touch soon.</motion.div>}
    </form>
  );
} 