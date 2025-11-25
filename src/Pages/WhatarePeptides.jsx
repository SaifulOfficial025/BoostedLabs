import React from "react";
import Noticebar from "../Shared/Noticebar";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

function WhatarePeptides() {
  const heroImage = `${
    import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : "/"
  }peptides.png`;

  const sections = [
    {
      title: "Peptides Overview",
      body: "Peptides are short chains of amino acids, which are the foundational building blocks of proteins. They function as natural messengers within the body, sending signals to cells and guiding specific biological processes. These processes include healing damaged tissue, improving metabolism, enhancing skin quality and supporting overall wellness.",
    },
    {
      title: "How Do Peptides Work?",
      body: "Peptides bind to receptors on the surface of cells and activate targeted biological responses. Unlike hormones, which may influence many systems at once, peptides work with remarkable precision. Their targeted nature makes them effective tools for improving recovery, performance, skin health and metabolic balance.",
    },
    {
      title: "How Peptides Work",
      body: "Peptides bind to receptors on the surface of cells and activate targeted biological responses. Their targeted nature and signaling specificity are why peptides are valuable in therapeutic and cosmetic applications. Results are often observed within a short period of consistent use.",
    },
    {
      title: "Benefits of Peptide Therapy",
      body: "Peptide therapy is valued for its focused and efficient effects. It works in harmony with the body's own signaling pathways. Many people begin to notice results within a short period of consistent use. Peptides can be used for a wide range of goals including healing, cosmetic improvements, performance enhancement and general wellness.",
    },
    {
      title: "Categories of Peptides",
      body: "Healing peptides help the body repair tissues, reduce inflammation and recover from injuries. Performance peptides support muscle development, strength improvement and athletic performance. Cosmetic peptides improve collagen production, skin elasticity and overall skin appearance.",
    },
    {
      title: "Scientific Background",
      body: "Research into therapeutic peptides has expanded significantly over the past two decades. Clinical studies demonstrate their potential to accelerate wound healing, improve tissue regeneration, enhance muscle growth, increase skin firmness and collagen density, support fat loss, and strengthen mitochondrial and metabolic function.",
    },
    {
      title: "Disclaimer",
      body: "All Boosted Labs peptides are sold strictly for research use. They are not medical treatments, and no medical claims are made. Peptides should never replace professional medical advice. Anyone considering peptide use should consult a qualified healthcare provider.",
    },
    {
      title: "Beginner’s Guide to Peptides",
      body: "Before choosing a peptide, it is important to define personal goals. Individuals seeking recovery may consider healing peptides such as BPC-157 or TB-500. Those focused on muscle growth often explore CJC-1295 or Ipamorelin. For skin and anti-aging goals, GHK-Cu is a common starting point. Weight management goals may involve peptides like Retatrutide or Tesamorelin. For energy and longevity, NAD+ or MOTS-c are often preferred.",
    },
    {
      title: "Dosage and Use",
      body: "Most peptides are taken through subcutaneous injection, although some are available as nasal sprays or oral formulations. It is recommended to begin with the lowest effective dose and assess individual tolerance. Consistency is essential, and certain peptides may benefit from structured cycles. Keeping a personal record of dosage, timing and effects helps track progress.",
    },
    {
      title: "Storage and Reconstitution",
      body: "Peptides typically arrive as freeze-dried powder and must be reconstituted with bacteriostatic water. Unreconstituted peptides should be stored in the freezer. After reconstitution, they should be kept in the refrigerator and used within thirty days. They should be protected from direct sunlight and temperature fluctuations.",
    },
    {
      title: "Monitoring and Adjusting",
      body: "Each individual may respond differently to peptides. Early use should focus on tolerance, followed by observing initial results and later refining dosage or timing if needed. Work with measured outcomes and, when possible, lab tests to guide adjustments.",
    },
    {
      title: "Common Mistakes to Avoid",
      body: "Beginners sometimes start with doses that are too high, combine too many peptides at once or store them incorrectly. Patience is important, as peptides generally produce meaningful results over weeks rather than instantly.",
    },
    {
      title: "Safety and Purity",
      body: "Boosted Labs maintains strict standards for quality. All peptides are produced at pharmaceutical grade levels with a minimum purity of ninety-nine percent. Every batch undergoes independent third-party testing to verify purity, concentration and sterility. Proper storage is ensured throughout handling to maintain stability and effectiveness.",
    },
    {
      title: "Identifying Quality Peptides",
      body: "High-quality peptides include clear batch numbers, expiration dates and accessible certificates of analysis. Trusted suppliers provide transparent sourcing details and realistic product descriptions. Low prices, vague sourcing, missing documentation and exaggerated claims are warning signs.",
    },
    {
      title: "General Safety Practices",
      body: "Sterile injection techniques are essential to prevent infection. Injection sites should be rotated to avoid irritation. Users should monitor for allergic reactions and consult healthcare professionals before beginning any peptide program. Individuals with serious medical conditions, including active cancer, should seek medical supervision.",
    },
    {
      title: "Transparency at Boosted Labs",
      body: "Boosted Labs maintains a commitment to complete transparency. All products include batch numbers and expiration dates. Third-party testing certificates are available upon request. Products are clearly labeled for research use only. Customer support is available for questions regarding safety, storage and usage.",
    },
  ];

  return (
    <section>
      <Noticebar />
      <Header />

      <nav className="mt-44 ml-44 text-sm text-gray-500 mb-4 bg-[#f8fafc] py-2 w-40">
        Home &gt; <span className="font-bold text-black">USAGE GUIDES</span>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12  font-sans">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          What Are Peptides?
        </h1>

        <div className="w-full mb-8">
          <img
            src={heroImage}
            alt="Peptides hero"
            className="w-full  object-cover rounded shadow-md border border-gray-200 bg-gray-50"
            onError={(e) => {
              // fallback to a small placeholder SVG if asset not found
              e.currentTarget.src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"><rect width="1200" height="400" fill="%23f8fafc"/><text x="600" y="200" font-size="24" text-anchor="middle" fill="%23999">Hero image</text></svg>';
            }}
          />
        </div>

        <section className="space-y-8 text-gray-800">
          {sections.map((s) => (
            <article key={s.title} className="">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {s.title}
              </h2>
              <p className="text-md leading-7 text-gray-600">{s.body}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </section>
  );
}

export default WhatarePeptides;
