import React from "react";

function ContactPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center pt-0 px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Contact
          </h1>
          <p className="text-xs text-gray-500 tracking-widest">HAPPY TO HELP</p>
          <h2 className="text-2xl md:text-3xl font-medium">
            Get in touch with us
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            If you have any questions about your order, please fill in this
            contact form and our team will get back to you as soon as possible.
            For shoe care advice or product questions, you can contact our
            experts directly.
          </p>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              rows={6}
              placeholder="Write your message..."
              className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xs resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="cursor-pointer bg-emerald-500 text-white px-8 py-3 rounded-sm font-medium hover:bg-emerald-600 active:scale-[0.98] transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
