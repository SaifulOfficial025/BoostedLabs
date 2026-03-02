import React, { useState } from "react";
import { FaTint, FaFlask, FaSyringe, FaCalculator } from "react-icons/fa";

const reconstitutionData = [
  {
    name: "Retatrutide",
    vialSize: "20mg",
    category: "Weight Loss",
    color: "bg-rose-100 text-rose-700 border-rose-300",
    bacWater: "2 mL",
    concentration: "10 mg/mL",
    doseExample: "1 mg dose = 0.1 mL / 10 units",
    notes: "Some use 4 mL for 5 mg/mL if preferring larger volumes",
  },
  {
    name: "Tesamorelin",
    vialSize: "10mg",
    category: "Fat Loss",
    color: "bg-orange-100 text-orange-700 border-orange-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "Daily doses 1–2 mg = 0.2–0.6 mL / 20–60 units",
  },
  {
    name: "Ipamorelin",
    vialSize: "10mg",
    category: "Recovery",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "100–300 mcg doses = 0.02–0.09 mL / 2–9 units",
  },
  {
    name: "GLOW",
    vialSize: "70mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    bacWater: "3–5 mL",
    concentration: "~14–23 mg/mL total",
    doseExample: "2–5 mg total blend/day = 0.1–0.35 mL",
    notes: "Blend (GHK-Cu heavy + others)",
  },
  {
    name: "NAD+",
    vialSize: "1000mg",
    category: "Longevity",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    bacWater: "5–10 mL",
    concentration: "100–200 mg/mL",
    doseExample: "50–100 mg doses = 0.25–1 mL / 25–100 units",
    notes: "Start low to avoid flush/nausea",
  },
  {
    name: "Semax",
    vialSize: "10mg",
    category: "Nootropic",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "300–1000 mcg = 0.06–0.3 mL",
    notes: "Often intranasal, but subQ possible",
  },
  {
    name: "Selank",
    vialSize: "10mg",
    category: "Nootropic",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "250–1000 mcg = 0.05–0.3 mL",
    notes: "Intranasal common",
  },
  {
    name: "MOTS-c",
    vialSize: "10mg",
    category: "Energy",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "5–10 mg = 1–3 mL, but often microdosed lower",
  },
  {
    name: "AOD-9604",
    vialSize: "10mg",
    category: "Fat Loss",
    color: "bg-orange-100 text-orange-700 border-orange-300",
    bacWater: "2 mL",
    concentration: "5 mg/mL",
    doseExample: "250–500 mcg = 0.05–0.1 mL / 5–10 units",
  },
  {
    name: "SS-31",
    vialSize: "50mg",
    category: "Longevity",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    bacWater: "3–5 mL",
    concentration: "10–16.7 mg/mL",
    doseExample: "500–1000 mcg = 0.03–0.1 mL",
  },
  {
    name: "CJC-DAC",
    vialSize: "5mg",
    category: "Recovery",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    bacWater: "2 mL",
    concentration: "2.5 mg/mL",
    doseExample: "Weekly doses 1–2 mg = 0.4–0.8 mL / 40–80 units",
  },
  {
    name: "CJC + Ipamorelin",
    vialSize: "10mg",
    category: "Recovery",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL total",
    doseExample: "100–300 mcg each = 0.06–0.18 mL total / 6–18 units",
  },
  {
    name: "DSIP",
    vialSize: "10mg",
    category: "Sleep",
    color: "bg-slate-100 text-slate-700 border-slate-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "100–300 mcg = 0.02–0.09 mL pre-bed",
  },
  {
    name: "Epitalon",
    vialSize: "10mg",
    category: "Longevity",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    bacWater: "2 mL",
    concentration: "5 mg/mL",
    doseExample: "1–5 mg = 0.2–1 mL",
    notes: "Short cycles",
  },
  {
    name: "Melanotan II",
    vialSize: "10mg",
    category: "Tanning",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    bacWater: "2 mL",
    concentration: "5 mg/mL",
    doseExample: "100–500 mcg = 0.02–0.1 mL / 2–10 units",
  },
  {
    name: "Wolverine BPC + TB",
    vialSize: "20mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    bacWater: "2–4 mL",
    concentration: "5–10 mg/mL total",
    doseExample: "500–1000 mcg total = 0.05–0.2 mL",
    notes: "~10mg each BPC-157 + TB-500",
  },
  {
    name: "KLOW",
    vialSize: "80mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    bacWater: "4–6 mL",
    concentration: "~13–20 mg/mL total",
    doseExample: "2–5 mg blend/day = 0.1–0.4 mL",
    notes: "Advanced blend (GHK-Cu heavy + BPC/TB/KPV)",
  },
  {
    name: "GHK-Cu",
    vialSize: "100mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    bacWater: "5–10 mL",
    concentration: "10–20 mg/mL",
    doseExample: "1–2 mg = 0.05–0.2 mL",
    notes: "Topical possible too",
  },
  {
    name: "HCG",
    vialSize: "Variable",
    category: "Hormone",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    bacWater: "5 mL (if 5000 IU vial)",
    concentration: "1000 IU/mL",
    doseExample: "250–500 IU = 0.25–0.5 mL",
    notes: "Varies by vial size; often comes pre-mixed",
  },
  {
    name: "Kisspeptin",
    vialSize: "10mg",
    category: "Hormone",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    bacWater: "2–3 mL",
    concentration: "3.33–5 mg/mL",
    doseExample: "100–200 mcg = 0.02–0.06 mL / 2–6 units, 2–3x/week",
  },
  {
    name: "KPV",
    vialSize: "10mg",
    category: "Anti-Inflammatory",
    color: "bg-teal-100 text-teal-700 border-teal-300",
    bacWater: "2 mL",
    concentration: "5 mg/mL",
    doseExample: "250–500 mcg = 0.05–0.1 mL",
    notes: "Oral/topical options too",
  },
];

const keyNotes = [
  "Always add BAC water slowly along the vial wall (don't blast the powder to avoid foaming/denaturing)",
  "Gently swirl (never shake vigorously) until dissolved",
  "Refrigerate reconstituted vials (2–8°C); most stable 2–4 weeks (some shorter, check stability per peptide)",
  "Use sterile technique; these are research compounds (not FDA-approved for human use)",
  "Volumes are suggestions for ease—adjust based on your desired dose (lower volume = higher concentration = smaller injection)",
  "For blends, reconstitute the total mg in the vial",
  "Get bloodwork/medical oversight, especially in Australia (strict regulations)",
];

function UpdatedReconstitute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(reconstitutionData.map((p) => p.category)),
  ];

  const filteredPeptides = reconstitutionData.filter((peptide) => {
    const matchesSearch = peptide.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || peptide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen mt-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Peptide Reconstitution Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Step-by-step reconstitution instructions with BAC water volumes and
            concentrations
          </p>
        </div>

        {/* Key Notes Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 mb-10 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaFlask className="text-3xl" />
            Key Notes for All Peptides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {keyNotes.map((note, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-sm leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 mt-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search peptides..."
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Peptide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeptides.map((peptide, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className={`${peptide.color} border-b-2 p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{peptide.name}</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full">
                    {peptide.vialSize}
                  </span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full">
                  {peptide.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* BAC Water */}
                <div className="flex items-start gap-3">
                  <FaTint className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      BAC Water
                    </p>
                    <p className="text-lg font-bold text-blue-700">
                      {peptide.bacWater}
                    </p>
                  </div>
                </div>

                {/* Concentration */}
                <div className="flex items-start gap-3">
                  <FaFlask className="text-purple-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Concentration
                    </p>
                    <p className="text-base font-semibold text-purple-700">
                      {peptide.concentration}
                    </p>
                  </div>
                </div>

                {/* Dose Example */}
                <div className="flex items-start gap-3">
                  <FaSyringe className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Dose Example
                    </p>
                    <p className="text-sm text-gray-800">
                      {peptide.doseExample}
                    </p>
                  </div>
                </div>

                {/* Notes (if available) */}
                {peptide.notes && (
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">
                      Note
                    </p>
                    <p className="text-sm text-yellow-900">{peptide.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPeptides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No peptides found matching your search.
            </p>
          </div>
        )}

        {/* Calculator Tip */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <FaCalculator className="text-4xl text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">
                💡 Reconstitution Calculator Tip
              </h3>
              <p className="text-sm text-green-800 leading-relaxed">
                To calculate your exact dose:{" "}
                <strong>
                  Desired Dose (mg or mcg) ÷ Concentration = Volume to inject
                  (mL)
                </strong>
                . For example: If you want 2mg and your concentration is 5mg/mL,
                you inject 2÷5 = 0.4mL (40 units on insulin syringe).
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-red-900 mb-2">
            ⚠️ Important Safety Notice
          </h3>
          <p className="text-sm text-red-800 leading-relaxed">
            This information is for educational and research purposes only.
            These are research compounds not approved by the FDA for human use.
            Always maintain sterile technique, consult qualified healthcare
            professionals, and comply with local regulations. Improper
            reconstitution or administration can be dangerous.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdatedReconstitute;
