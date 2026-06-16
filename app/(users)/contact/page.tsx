"use client";

import React, { useState } from "react";
import { lavishly } from "@/app/fonts";
import { supabase } from "@/src/lib/supabase";
import toast from "react-hot-toast";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
      });

      if (error) {
        console.log("SUPABASE ERROR:", error.message);
        toast.error(error.message);
        return;
      }

      toast.success("Message sent successfully");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center pt-0 px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10 space-y-3">
          <h1
            className={`text-4xl md:text-6xl font-bold tracking-wide ${lavishly.className}`}
          >
            Contact
          </h1>

          <p className="text-xs text-gray-500 tracking-widest">HAPPY TO HELP</p>

          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            If you have any questions about your order, please fill in this
            contact form and our team will get back to you as soon as possible.
            For shoe care advice or product questions, you can contact our
            experts directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>

            <textarea
              rows={6}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xs resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-emerald-500 text-white px-8 py-3 rounded-sm font-medium hover:bg-emerald-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
