import React, { useState } from "react";
import { FaSyringe, FaClock, FaRedo, FaDna } from "react-icons/fa";

const peptideData = [
  {
    name: "Retatrutide",
    vialSize: "20mg",
    category: "Weight Loss",
    color: "bg-rose-100 text-rose-700 border-rose-300",
    description:
      "Triple agonist (GLP-1/GIP/glucagon) for fat loss/weight management",
    dosage: "Start 0.5–1 mg/week subcutaneous (subQ), titrate to 4–12 mg/week",
    frequency: "Weekly injection",
    cycle: "12–48+ weeks with titration",
    notes: "Research trials up to 12 mg/week",
  },
  {
    name: "Tesamorelin",
    vialSize: "10mg",
    category: "Fat Loss",
    color: "bg-orange-100 text-orange-700 border-orange-300",
    description: "GH-releasing for visceral fat loss/IGF-1 support",
    dosage: "1–2 mg/day subQ, morning fasted",
    frequency: "Daily or 5 days on/2 off",
    cycle: "8–12 weeks on, breaks",
  },
  {
    name: "Ipamorelin",
    vialSize: "10mg",
    category: "Recovery",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    description: "Mild GHRP for GH pulses, recovery, sleep",
    dosage: "100–300 mcg (0.1–0.3 mg) subQ, 1–2x/day",
    frequency: "5–7 days/week, often pre-bed or AM/PM",
    cycle: "8 weeks on, 4–8 off",
  },
  {
    name: "GLOW",
    vialSize: "70mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    description:
      "BPC-157 (10mg) + TB-500 (10mg) + GHK-Cu (50mg) blend for healing/skin/tissue repair",
    dosage:
      "2–5 mg total blend/day subQ (~500 mcg each BPC/TB + 1–2 mg GHK-Cu)",
    frequency: "Daily or 5 on/2 off",
    cycle: "4–8 weeks",
  },
  {
    name: "NAD+",
    vialSize: "1000mg",
    category: "Longevity",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    description:
      "For energy, longevity, mitochondrial support (injectable form)",
    dosage:
      "50–100 mg subQ/IM daily or 2–3x/week; higher (250–500 mg) via slow IV if available",
    frequency: "2–5x/week, start low (20–50 mg) to avoid flush",
    cycle: "As needed, often ongoing low-dose",
  },
  {
    name: "Semax",
    vialSize: "10mg",
    category: "Nootropic",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    description: "Nootropic for cognition/focus/neuroprotection",
    dosage: "300–1000 mcg (0.3–1 mg) intranasal or subQ daily",
    frequency: "2–3 days/week or cycles",
    cycle: "8 weeks on/off",
  },
  {
    name: "Selank",
    vialSize: "10mg",
    category: "Nootropic",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    description: "Anxiolytic/nootropic for mood/stress",
    dosage: "250–1000 mcg intranasal or subQ daily",
    frequency: "2–3 days/week",
    cycle: "8 weeks on/off",
  },
  {
    name: "MOTS-c",
    vialSize: "10mg",
    category: "Energy",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    description: "Mitochondrial peptide for metabolism/energy/exercise mimic",
    dosage: "5–10 mg subQ, 2–3x/week (or 1–5 mg daily microdose)",
    frequency: "Morning/pre-workout",
    cycle: "8 weeks",
  },
  {
    name: "AOD-9604",
    vialSize: "10mg",
    category: "Fat Loss",
    color: "bg-orange-100 text-orange-700 border-orange-300",
    description: "Fat loss fragment of GH",
    dosage: "250–500 mcg subQ daily, morning fasted",
    frequency: "5 on/2 off",
    cycle: "8 weeks",
  },
  {
    name: "SS-31",
    vialSize: "50mg",
    category: "Longevity",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    description: "Mitochondrial protector for longevity/energy",
    dosage: "500–1000 mcg subQ daily or 5 on/2 off",
    frequency: "Daily or 5 on/2 off",
    cycle: "8 weeks",
  },
  {
    name: "CJC-DAC",
    vialSize: "5mg",
    category: "Recovery",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    description: "Long-acting GHRH (with DAC)",
    dosage: "1–2 mg subQ once or twice weekly",
    frequency: "1-2x/week",
    cycle: "8–12 weeks",
  },
  {
    name: "CJC + Ipamorelin",
    vialSize: "10mg",
    category: "Recovery",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    description: "Blend (1:1–1:2 ratio) for GH pulses",
    dosage: "100–300 mcg each subQ, 1–2x/day (pre-bed common)",
    frequency: "5–7 days/week",
    cycle: "8 weeks on/off",
  },
  {
    name: "DSIP",
    vialSize: "10mg",
    category: "Sleep",
    color: "bg-slate-100 text-slate-700 border-slate-300",
    description: "Delta sleep-inducing for sleep regulation",
    dosage: "100–300 mcg subQ, 1–3 hours pre-bed",
    frequency: "5 on/2 off or as needed",
    cycle: "8 weeks",
  },
  {
    name: "Epitalon",
    vialSize: "10mg",
    category: "Longevity",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    description: "Telomere/longevity peptide",
    dosage:
      "1–5 mg (often 2–10 mg in some protocols) subQ daily for 10–20 days",
    frequency: "Daily for 10-20 days",
    cycle: "Repeat 2–3x/year",
  },
  {
    name: "Melanotan II",
    vialSize: "10mg",
    category: "Tanning",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    description: "Tanning/libido enhancement",
    dosage: "100–500 mcg subQ daily until desired tan",
    frequency: "Daily until desired effect, then maintenance 1–2x/week",
    cycle: "Variable",
  },
  {
    name: "Wolverine BPC + TB",
    vialSize: "20mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    description: "Blend (BPC-157 + TB-500, 10mg each) for healing/injury",
    dosage:
      "250–500 mcg each (total 500–1000 mcg) subQ daily or near injury site",
    frequency: "Daily",
    cycle: "4–8 weeks",
  },
  {
    name: "KLOW",
    vialSize: "80mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    description:
      "Advanced blend (GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg + KPV 10mg) for healing/anti-inflammation",
    dosage: "2–5 mg total blend/day subQ (proportional to components)",
    frequency: "5 on/2 off",
    cycle: "8 weeks",
  },
  {
    name: "GHK-Cu",
    vialSize: "100mg",
    category: "Healing",
    color: "bg-pink-100 text-pink-700 border-pink-300",
    description: "Copper peptide for skin/collagen/wound healing",
    dosage: "1–2 mg subQ or topical daily",
    frequency: "Daily",
    cycle: "4–8 weeks",
  },
  {
    name: "HCG",
    vialSize: "Variable",
    category: "Hormone",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    description: "For fertility/TRT support (testicular function)",
    dosage: "250–500 IU subQ 2–3x/week (or 1000–2000 IU weekly)",
    frequency: "2-3x/week",
    cycle: "Varies widely by protocol",
  },
  {
    name: "Kisspeptin",
    vialSize: "10mg",
    category: "Hormone",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    description: "For LH/FSH stimulation, libido/fertility",
    dosage: "100–200 mcg subQ, 2–3x/week (often with TRT)",
    frequency: "2-3x/week",
    cycle: "30 days on/off or as adjunct",
  },
  {
    name: "KPV",
    vialSize: "10mg",
    category: "Anti-Inflammatory",
    color: "bg-teal-100 text-teal-700 border-teal-300",
    description: "Anti-inflammatory (gut/skin/autoimmune)",
    dosage: "250–500 mcg subQ or oral/topical daily",
    frequency: "5 on/2 off",
    cycle: "8 weeks",
  },
];

function UpdatedUsagesGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(peptideData.map((p) => p.category))];

  const filteredPeptides = peptideData.filter((peptide) => {
    const matchesSearch = peptide.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || peptide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen mt-4 bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Peptide Usage Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive dosage and cycle information for peptide therapy
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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
                <p className="text-sm text-gray-700 leading-relaxed">
                  {peptide.description}
                </p>

                <div className="space-y-3">
                  {/* Dosage */}
                  <div className="flex items-start gap-3">
                    <FaSyringe className="text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Dosage
                      </p>
                      <p className="text-sm text-gray-800">{peptide.dosage}</p>
                    </div>
                  </div>

                  {/* Frequency */}
                  <div className="flex items-start gap-3">
                    <FaClock className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Frequency
                      </p>
                      <p className="text-sm text-gray-800">
                        {peptide.frequency}
                      </p>
                    </div>
                  </div>

                  {/* Cycle */}
                  <div className="flex items-start gap-3">
                    <FaRedo className="text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Cycle
                      </p>
                      <p className="text-sm text-gray-800">{peptide.cycle}</p>
                    </div>
                  </div>

                  {/* Notes (if available) */}
                  {peptide.notes && (
                    <div className="flex items-start gap-3">
                      <FaDna className="text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Notes
                        </p>
                        <p className="text-sm text-gray-800">{peptide.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
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

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-2">
            ⚠️ Important Disclaimer
          </h3>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This information is for educational purposes only. Always consult
            with a qualified healthcare professional before starting any peptide
            therapy. Dosages and protocols should be individualized based on
            your specific needs, health status, and under medical supervision.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdatedUsagesGuide;
