import React, { useState } from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const faqData = [
  {
    q: "What makes Boosted Labs different?",
    a: "Boosted Labs is built around convenience and ease of use. All injection pens are professionally reconstituted prior to dispatch and supplied in an insulated travel bag, so they arrive ready to use with no mixing or preparation required.",
  },
  {
    q: "Do I need to reconstitute or mix the pen myself?",
    a: "No. All Boosted Labs pens are pre-reconstituted before shipping, removing the need for mixing or preparation.",
  },
  {
    q: "How does the pen arrive?",
    a: "Each pen is shipped fully reconstituted and ready to use, packaged in an insulated travel bag for convenience and safety.",
  },
  {
    q: "Why do you send the pens pre-reconstituted?",
    a: "We do this to make starting easier. By handling reconstitution in-house, we remove unnecessary steps and reduce user error, allowing for a smoother and more convenient experience.",
  },
  {
    q: "Is the insulated travel bag included?",
    a: "Yes. Every pen is supplied with an insulated travel bag at no additional cost.",
  },
  {
    q: "Do I need any additional equipment?",
    a: "No additional preparation equipment is required. Everything is designed to arrive ready for use.",
  },
  {
    q: "How should I store my pen once received?",
    a: "Storage instructions are provided with your order. The insulated travel bag can be used when travelling or transporting the pen.",
  },
  {
    q: "Are Boosted Labs products for medical use?",
    a: "No. All products are supplied for research purposes only and are not intended to diagnose, treat, cure, or prevent any disease.",
  },
  {
    q: "Who are Boosted Labs products suitable for?",
    a: "Our products are intended for research and educational purposes only. Customers should ensure they understand appropriate handling and storage prior to use.",
  },
  {
    q: "How long does shipping take?",
    a: "Shipping times vary by location. Dispatch and tracking details are provided once your order has been processed.",
  },
  {
    q: "Can I travel with my pen?",
    a: "Yes. Pens are supplied in an insulated travel bag, making transport more convenient while helping maintain temperature stability.",
  },
  {
    q: "Need help or have questions?",
    a: "You can contact our support team via the contact page for assistance with your order.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800 mt-20 mb-20 font-sans">
        <h1 className="text-3xl font-bold mb-16 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div key={idx} className="border-b pb-4">
              <button
                className="w-full text-left font-semibold text-lg focus:outline-none flex justify-between items-center"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span>{item.q}</span>
                <span className="ml-2 text-gray-500">
                  {openIdx === idx ? "-" : "+"}
                </span>
              </button>
              {openIdx === idx && (
                <p
                  id={`faq-answer-${idx}`}
                  className="mt-2 text-base text-gray-700 transition-all duration-200"
                >
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* <footer className="mt-10 border-t pt-6 text-sm text-center text-gray-500">
        For research purposes only. Not intended to diagnose, treat, cure, or
        prevent any disease.
      </footer> */}
      </div>
      <Footer />
    </section>
  );
}

export default FAQ;
