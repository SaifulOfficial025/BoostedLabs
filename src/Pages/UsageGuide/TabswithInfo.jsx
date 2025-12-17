import React, { useState } from "react";

function TabswithInfo() {
  const [activeTab, setActiveTab] = useState("wolverine");

  const tabs = [
    { id: "wolverine", name: "Boosted Wolverine™" },
    { id: "glow", name: "Boosted Glow™" },
    { id: "youth", name: "Boosted Youth™" },
    { id: "health", name: "Boosted Health™" },
    { id: "burn", name: "Boosted Burn™" },
    { id: "sun", name: "Boosted Sun™" },
    { id: "libido", name: "Boosted Libido™" },
    { id: "rewind", name: "Boosted Rewind™" },
  ];

  const content = {
    wolverine: {
      title: "Boosted Wolverine™ Usage Guide",
      overview: {
        title: "Boosted Wolverine™ Usage Overview",
        points: [
          "Daily-use peptide for tendon, ligament, joint and connective tissue repair",
          "Each pen contains: 100 mg GHK-Cu, 10 mg BPC-157, 10 mg TB-500",
          "Total pen volume after mixing: 3.0 mL",
          "Total clicks per pen: 300 clicks",
          "Standard dose: 10 clicks daily",
          "Store in refrigerator after mixing",
        ],
        highlight:
          "Boosted Wolverine™ delivers significantly better results when taken EVERY single day — consistency is critical for tissue repair.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 3.0 mL of bacteriostatic water",
            "Inject water slowly along the inside wall",
            "Gently swirl — DO NOT shake",
            "Solution becomes clear within seconds",
            "Refrigerate immediately after mixing",
          ],
          note: "This volume yields exactly 300 clicks per pen, ensuring accurate daily dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Understanding Your Click Dose",
          intro:
            "The pen contains 300 clicks total. Here's the per-click breakdown:",
          table: {
            perClick: [
              { compound: "GHK-Cu", dose: "0.333 mg per click" },
              { compound: "BPC-157", dose: "0.0333 mg per click" },
              { compound: "TB-500", dose: "0.0333 mg per click" },
            ],
            daily: [
              { compound: "GHK-Cu", dose: "3.33 mg per day" },
              { compound: "BPC-157", dose: "0.333 mg (333 mcg) per day" },
              { compound: "TB-500", dose: "0.333 mg (333 mcg) per day" },
            ],
          },
          note: "Daily 10-click dosing is clinically optimized for tissue repair.",
        },
        {
          title: "Step 3",
          subtitle: "Set Your Daily Dose",
          points: [
            "Turn the click dial until you reach 10 clicks",
            "Inject once daily — ideally at the same time every day",
            "For severe cases, advanced users may use 15 clicks daily (optional)",
            "Do NOT skip days — missed doses slow recovery",
          ],
          note: "Every day counts — Wolverine works by cumulative signaling. The more consistent you are, the better your results.",
        },
        {
          title: "Step 4",
          subtitle: "Inject Subcutaneously",
          points: [
            "Clean injection site (abdomen or thigh)",
            "Insert needle at 45–90 degrees",
            "Press plunger slowly",
            "Dispose needle safely",
            "Injection takes less than 10 seconds",
          ],
        },
        {
          title: "Step 5",
          subtitle: "Storage & Handling",
          points: [
            "Refrigerate after mixing",
            "Shelf life after mixing: 30 days",
            "Keep away from heat",
            "Do not freeze",
            "Keep upright if possible",
          ],
        },
      ],
      importantNotes: [
        "Tendon and ligament repair requires daily repetition",
        "Consistency dramatically increases results — missed days reduce effectiveness",
        "Best results occur between Weeks 4 and 12",
        "Wolverine stacks extremely well with Youth™ and Health™",
        "Consistency is the #1 factor determining your results. Daily dosing builds up tissue-repair signals — skipping days resets progress.",
      ],
    },
    glow: {
      title: "Boosted Glow™ Usage Guide",
      overview: {
        title: "Boosted Glow™ Usage Overview",
        points: [
          "Daily-use peptide pen designed for skin tightening, collagen support, and anti-aging",
          "Each pen contains: 100 mg GHK-Cu, 50 mg Epitalon, 10 mg Ipamorelin, 10 mg CJC-1295",
          "Total pen volume after mixing: 3.0 mL",
          "Total clicks per pen: 300 clicks",
          "Standard daily dose: 10 clicks",
          "Store in refrigerator after mixing",
        ],
        highlight:
          "Boosted Glow™ works cumulatively — daily use produces dramatically better skin, collagen, and anti-aging results.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 3.0 mL of bacteriostatic water",
            "Inject water slowly along inside vial wall",
            "Gently swirl to mix — DO NOT shake",
            "Solution becomes clear within seconds",
            "Refrigerate immediately after mixing",
          ],
          note: "This reconstitution volume yields exactly 300 clicks for precise daily dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Understanding Your Click Dose",
          intro:
            "The pen contains 300 clicks total. Here's the per-click breakdown:",
          table: {
            perClick: [
              { compound: "GHK-Cu", dose: "0.333 mg per click" },
              { compound: "Epitalon", dose: "0.166 mg per click" },
              { compound: "Ipamorelin", dose: "0.0333 mg per click" },
              { compound: "CJC-1295", dose: "0.0333 mg per click" },
            ],
            daily: [
              { compound: "GHK-Cu", dose: "3.33 mg" },
              { compound: "Epitalon", dose: "1.66 mg" },
              { compound: "Ipamorelin", dose: "0.333 mg (333 mcg)" },
              { compound: "CJC-1295", dose: "0.333 mg (333 mcg)" },
            ],
          },
          note: "Daily 10-click dosing delivers clinically effective levels for collagen, elasticity, and skin regeneration.",
        },
        {
          title: "Step 3",
          subtitle: "Set Your Daily Dose",
          points: [
            "Turn the dial to deliver 10 clicks once daily",
            "Inject at the same time each day for best results",
            "Morning or evening both acceptable",
            "Do NOT skip days — collagen production is cumulative",
          ],
          note: "Skin and collagen pathways respond best to consistent daily signaling — missing doses slows progress.",
        },
        {
          title: "Step 4",
          subtitle: "Inject Subcutaneously",
          points: [
            "Clean injection site (abdomen or thigh)",
            "Insert needle at 45–90 degrees",
            "Press plunger slowly and steadily",
            "Dispose needle safely",
            "Injection takes less than 10 seconds",
          ],
        },
        {
          title: "Step 5",
          subtitle: "Storage & Handling",
          points: [
            "Refrigerate immediately after mixing",
            "Shelf life after mixing: 30 days",
            "Keep upright if possible",
            "Do not freeze",
            "Avoid heat and light exposure",
          ],
        },
      ],
      importantNotes: [
        "Boosted Glow works BEST with daily consistency — collagen production requires repeated signaling",
        "Most users notice visible improvements in Weeks 3–6",
        "Full anti-aging benefits occur in Weeks 6–12",
        "Works synergistically with: Boosted Youth™ (GH release → collagen boost), Boosted Rewind™ (NAD+ → cell repair), Red light therapy, Collagen + vitamin C supplementation",
        "Consistency is everything. Daily dosing produces exponentially better results in collagen density, firmness, and wrinkle reduction.",
      ],
    },
    youth: {
      title: "Boosted Youth™ Usage Guide",
      overview: {
        title: "Boosted Youth™ Usage Overview",
        points: [
          "Once-weekly peptide pen for GH support, recovery, deep sleep, vitality, and anti-aging",
          "Each pen contains: 8 mg CJC-1295 DAC",
          "Reconstituted volume: 2.0 mL",
          "Total clicks per pen: 200 clicks",
          "Standard weekly dose: 50 clicks = 2 mg",
          "Store in refrigerator after mixing",
        ],
        highlight:
          "You will get the best results when injecting Youth™ at the SAME time every week.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 2.0 mL bacteriostatic water",
            "Inject slowly down the inside wall",
            "Gently swirl — do NOT shake",
            "Solution clears rapidly",
            "Refrigerate immediately",
          ],
          note: "This produces a total of 200 clicks for exact weekly dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Prime the Pen",
          points: [
            "Attach pen tip",
            "Remove BOTH caps",
            "Point pen toward the ceiling",
            "Eject air until very little remains",
            "Stop when a small droplet forms at the needle tip — your pen is primed",
          ],
          note: "Priming is mandatory — unprimed pens underdose.",
        },
        {
          title: "Step 3",
          subtitle: "Understanding Your Weekly Dose",
          intro: "Total pen content: 8 mg CJC-1295 DAC • Total clicks: 200",
          calculation: "8 mg ÷ 200 = 0.04 mg per click (40 mcg)",
          table: {
            weekly: [{ compound: "CJC-1295 DAC", dose: "2 mg" }],
          },
          note: "50 clicks = 2 mg weekly dose (clinically optimized).",
        },
        {
          title: "Step 4",
          subtitle: "Set Your Weekly Dose",
          points: [
            "Turn click-dial to 50 clicks",
            "Inject once weekly",
            "Do NOT take daily",
            "Choose a consistent injection day",
            "Morning or evening is fine — consistency is more important",
          ],
          note: "Youth™ works via long-lasting GH signaling. SKIPPING WEEKS reduces results dramatically.",
        },
        {
          title: "Step 5",
          subtitle: "Inject Subcutaneously",
          points: [
            "Clean abdomen or thigh",
            "Insert needle at 45–90 degrees",
            "Inject slowly",
            "Takes less than 10 seconds",
            "Rotate injection site weekly",
          ],
        },
        {
          title: "Step 6",
          subtitle: "Storage & Handling",
          points: [
            "Refrigerate immediately after mixing",
            "Shelf life: 30 days",
            "Do not freeze",
            "Keep away from heat/sun",
            "Store upright when possible",
          ],
        },
      ],
      importantNotes: [
        "Inject Youth™ ONLY once per week",
        "Do not exceed 2 mg weekly",
        "Missing a week slows GH pathway activation",
        "Best results appear between Weeks 4–12",
        "Works synergistically with: Glow™, Health™, and Wolverine™",
        "Youth™ success = consistency. Weekly GH signaling only works when you dose reliably every 7 days.",
      ],
    },
    health: {
      title: "Boosted Health™ Usage Guide",
      overview: {
        title: "Boosted Health™ Usage Overview",
        points: [
          "Daily-use peptide pen designed for muscle growth, body composition, recovery, sleep quality, and overall vitality",
          "Each pen contains: 100 IU total",
          "Reconstituted volume: 3.0 mL",
          "Total clicks per pen: ≈300 clicks",
          "Standard daily dose: 3 IU per day (~9 clicks)",
          "Store refrigerated after mixing",
        ],
        highlight:
          "Boosted Health™ works cumulatively. Daily dosing is essential for stable IGF-1 and recovery benefits.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 3.0 mL bacteriostatic water",
            "Inject water slowly down the inside wall",
            "Gently swirl — DO NOT shake",
            "Solution clears quickly",
            "Refrigerate immediately after mixing",
          ],
          note: "This yields approximately 300 total clicks for precise IU-based dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Prime the Pen Before First Use",
          points: [
            "Attach the pen tip",
            "Remove BOTH protective caps",
            "Point pen upward",
            "Eject air until very little remains",
            "Stop when a small droplet forms at the needle tip — your pen is primed",
          ],
          note: "Priming removes air and ensures accurate IU delivery.",
        },
        {
          title: "Step 3",
          subtitle: "Understanding Your Daily Dose (Exact IU Math)",
          intro:
            "The Boosted Health™ pen contains 100 IU total across ≈300 clicks.",
          calculation: "100 IU ÷ 300 = 0.333 IU per click",
          table: {
            options: [
              { dose: "3 IU daily", clicks: "~9 clicks" },
              { dose: "2 IU daily", clicks: "~6 clicks" },
              { dose: "4 IU daily", clicks: "~12 clicks" },
            ],
          },
          note: "Daily Target Dose: 3 IU = 9 clicks",
        },
        {
          title: "Step 4",
          subtitle: "Set Your Daily Dose",
          points: [
            "Turn the dial until you reach your required number of clicks",
            "Standard protocol: 9 clicks once daily (3 IU)",
            "Inject at the same time every day",
            "Morning or evening is fine — consistency matters more",
          ],
          note: "HGH pathways respond best to consistent daily signaling. Missing doses reduces results.",
        },
        {
          title: "Step 5",
          subtitle: "Inject Subcutaneously",
          points: [
            "Clean injection site (abdomen or thigh)",
            "Insert needle at 45–90 degrees",
            "Inject slowly and steadily",
            "Takes less than 10 seconds",
            "Rotate injection sites daily",
          ],
        },
        {
          title: "Step 6",
          subtitle: "Storage & Handling",
          points: [
            "Store immediately in refrigerator",
            "Shelf life after mixing: 30 days",
            "Never freeze",
            "Keep away from heat, sun, vibration",
          ],
        },
      ],
      importantNotes: [
        "Daily consistency maximizes the anabolic and recovery benefits",
        "Best effects appear between Weeks 3–8",
        "Works synergistically with: Boosted Youth™ (sleep + GH synergy), Boosted Wolverine™ (recovery acceleration), Boosted Burn™ (fat loss + recomposition synergy)",
        "Do not exceed dosage unless guided by a medical professional",
        "Daily dosing = predictable IGF-1 response. Consistency is the #1 factor in achieving muscle growth, fat loss, and better recovery with Boosted Health™.",
      ],
    },
    burn: {
      title: "Boosted Burn™ Usage Guide",
      overview: {
        title: "Boosted Burn™ Usage Overview",
        points: [
          "Once-weekly GLP-1/GIP/Glucagon triple-pathway peptide for fat loss and metabolic reset",
          "Each pen contains: Month 1 Pen: 6 mg total • Month 2 Pen: 18 mg total • Month 3+ Pen: 32 mg total",
          "Volume per pen: 2.0 mL",
          "Total clicks per pen: 200 clicks",
          "Weekly dosing schedule: increases from 1 mg → 8 mg",
          "Store refrigerated after mixing",
        ],
        highlight:
          "Boosted Burn™ works BEST when doses are taken weekly, at the same time, with no skipped weeks.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 2.0 mL bacteriostatic water",
            "Inject slowly down the inside wall",
            "Gently swirl — do NOT shake",
            "Solution turns clear within seconds",
            "Refrigerate immediately",
          ],
          note: "This creates 200 total clicks for accurate titration dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Prime the Pen Before First Use",
          points: [
            "Attach pen tip",
            "Remove BOTH protective caps",
            "Point pen upward",
            "Eject air until very little remains",
            "Stop when a small droplet forms at the needle tip — your pen is primed",
          ],
          note: "Priming ensures accurate mg delivery for titration.",
        },
        {
          title: "Step 3",
          subtitle: "Understanding Your Dose",
          intro:
            "Each Boosted Burn™ pen contains 2.0 mL = 200 clicks. The mg per pen varies by month:",
          perClick: [
            "Month 1 Pen (6 mg): 6 mg ÷ 200 = 0.03 mg per click",
            "Month 2 Pen (18 mg): 18 mg ÷ 200 = 0.09 mg per click",
            "Month 3+ Pen (32 mg): 32 mg ÷ 200 = 0.16 mg per click",
          ],
          note: "Titration dosing is based on mg-per-click accuracy.",
        },
        {
          title: "Step 4",
          subtitle: "Weekly Titration Schedule (Exact Click Counts)",
          titration: {
            month1: [
              { week: "Week 1", dose: "1 mg", clicks: "33 clicks" },
              { week: "Week 2", dose: "1 mg", clicks: "33 clicks" },
              { week: "Week 3", dose: "2 mg", clicks: "67 clicks" },
              { week: "Week 4", dose: "2 mg", clicks: "67 clicks" },
            ],
            month2: [
              {
                week: "Week 5",
                dose: "3 mg",
                clicks: "33 clicks",
                note: "✓ Appetite control improves",
              },
              {
                week: "Week 6",
                dose: "4 mg",
                clicks: "44 clicks",
                note: "✓ Stable fat-loss acceleration",
              },
              { week: "Week 7", dose: "5 mg", clicks: "56 clicks" },
              { week: "Week 8", dose: "6 mg", clicks: "67 clicks" },
            ],
            month3: [
              { week: "Week 9", dose: "7 mg", clicks: "44 clicks" },
              { week: "Week 10", dose: "8 mg", clicks: "50 clicks" },
              {
                week: "Week 11+",
                dose: "8 mg weekly",
                clicks: "50 clicks weekly (cruise dose)",
              },
            ],
          },
        },
        {
          title: "Step 5",
          subtitle: "Weekly Injection Protocol",
          points: [
            "Inject once weekly at the same time",
            "Follow the titration schedule exactly",
            "Do NOT skip weeks — titration requires progression",
            "Do not exceed assigned weekly dose",
          ],
          note: "Boosted Burn™ results are dose-dependent and consistency-dependent. Weekly doses MUST be taken on schedule for the metabolic reset to occur.",
        },
        {
          title: "Step 6",
          subtitle: "Inject Subcutaneously",
          points: [
            "Inject once weekly",
            "Abdomen or thigh",
            "Rotate sites weekly",
            "Takes <10 seconds",
            "Do not exceed assigned weekly dose",
          ],
        },
        {
          title: "Step 7",
          subtitle: "Storage & Handling",
          points: [
            "Store refrigerated after mixing",
            "Shelf life: 30 days",
            "Do not freeze",
            "Avoid heat and light",
            "Keep upright",
          ],
        },
      ],
      importantNotes: [
        "Appetite suppression appears early (Week 1–2)",
        "Visible fat loss accelerates from Week 3 onward",
        "Do NOT skip weeks — titration requires progression",
        'Week 10–12 is the metabolic "reset window"',
        "Stay hydrated and eat protein-forward meals",
        "Works synergistically with Health™, Youth™, and Sun™",
        "Boosted Burn™ results are dose-dependent and consistency-dependent. Weekly doses MUST be taken on schedule for the metabolic reset to occur.",
      ],
    },
    sun: {
      title: "Boosted Sun™ Usage Guide",
      overview: {
        title: "Boosted Sun™ Usage Overview",
        points: [
          "Melanotan II peptide pen for tanning, pigment activation, and UV protection support",
          "Each pen contains: 30 mg MT2 total",
          "Reconstituted volume: 3.0 mL",
          "Total clicks per pen: 300 clicks",
          "1 click = 0.1 mg (100 mcg) MT2",
          "Loading phase: daily injections • Maintenance phase: 2–3× weekly",
        ],
        highlight:
          "Boosted Sun™ works fastest when loading doses are taken consistently for the first 5–7 days.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 3.0 mL bacteriostatic water",
            "Inject water slowly",
            "Swirl gently — do NOT shake",
            "Store in refrigerator after mixing",
          ],
          note: "This creates 300 total clicks for precise dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Prime the Pen",
          points: [
            "Attach the pen tip",
            "Remove both caps",
            "Point pen upward",
            "Eject air until very little remains",
            "Stop when a small droplet forms at the needle tip — your pen is primed",
          ],
          note: "Priming ensures accurate mcg delivery.",
        },
        {
          title: "Step 3",
          subtitle: "Understanding Your Dose",
          intro:
            "Each Boosted Sun™ pen contains 30 mg MT2 in 3.0 mL = 300 clicks.",
          calculation: "30 mg ÷ 300 = 0.1 mg (100 mcg) per click",
          table: {
            phases: [
              { phase: "Loading dose (5 clicks)", dose: "0.5 mg/day" },
              { phase: "Maintenance (2–3 clicks)", dose: "0.2–0.3 mg" },
            ],
          },
          note: "30 mg ÷ 300 clicks = 0.1 mg (100 mcg) per click",
        },
        {
          title: "Step 4",
          subtitle: "Loading Phase (Days 1–7)",
          points: [
            "Inject 5 clicks per day (0.5 mg/day)",
            "Continue for 5–7 days",
            "Use short, low-intensity sun exposure to activate pigment",
            "Stop loading if excessive nausea occurs",
          ],
        },
        {
          title: "Step 5",
          subtitle: "Maintenance Phase",
          points: [
            "Inject 2–3 clicks (0.2–0.3 mg) per injection",
            "Dose 2–3× weekly",
            "A small amount of sun exposure enhances tanning",
            "If color fades, increase to 5 clicks once weekly",
          ],
        },
        {
          title: "Step 6",
          subtitle: "Inject Subcutaneously",
          points: [
            "Clean injection site (abdomen or thigh)",
            "Insert needle at 45–90 degrees",
            "Inject slowly",
            "Takes less than 10 seconds",
            "Rotate injection sites",
          ],
        },
        {
          title: "Step 7",
          subtitle: "Storage & Handling",
          points: [
            "Refrigerate immediately after mixing",
            "Shelf life: 30 days",
            "Do not freeze",
            "Keep away from heat and light",
            "Store pen refrigerated for entire month",
          ],
        },
      ],
      importantNotes: [
        "Avoid sunburn — melanin builds gradually",
        "Use SPF during prolonged sun exposure",
        "Do not exceed recommended amounts",
        "Hydrate and take short, controlled sun exposures",
        "Stop loading if excessive nausea occurs",
        "Stacks well with Boosted Glow™ for skin tone",
        "Boosted Sun™ delivers the best results with consistent dosing PLUS controlled sun exposure.",
      ],
    },
    libido: {
      title: "Boosted Libido™ Usage Guide",
      overview: {
        title: "Boosted Libido™ Usage Overview",
        points: [
          "HCG-based peptide pen for libido, mood, energy and hormone support",
          "Total HCG per pen: 20,000 IU",
          "Reconstituted volume: 3.0 mL",
          "Total clicks: 300 clicks",
          "1 click = 66.67 IU",
          "Standard dose: 20 clicks, 3× weekly",
          "Store refrigerated after mixing",
        ],
        highlight:
          "Steady, repeated dosing yields the strongest hormonal response.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add exactly 3.0 mL bacteriostatic water",
            "Gently swirl — do NOT shake",
            "Refrigerate immediately",
          ],
          note: "This creates 300 total clicks for precise IU-based dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Prime the Pen",
          points: [
            "Attach pen tip",
            "Remove both caps",
            "Point pen upward",
            "Eject air until very little remains",
            "Stop when a small droplet forms at the needle tip — your pen is primed",
          ],
          note: "Priming ensures accurate IU delivery.",
        },
        {
          title: "Step 3",
          subtitle: "Understanding Your Dose",
          intro:
            "Each Boosted Libido™ pen contains 20,000 IU HCG in 3.0 mL = 300 clicks.",
          calculation: "20,000 IU ÷ 300 = 66.67 IU per click",
          table: {
            dosing: [
              { label: "20 clicks per dose", value: "~1,333 IU per injection" },
              { label: "Weekly total (3× doses)", value: "~4,000 IU" },
            ],
          },
          note: "20,000 IU ÷ 300 clicks = 66.67 IU per click",
        },
        {
          title: "Step 4",
          subtitle: "Dosing Schedule",
          points: [
            "Inject 20 clicks per dose",
            "Dose 3× weekly (e.g. Mon / Wed / Fri)",
            "Inject subcutaneously",
            "Consistency improves hormonal response and libido support",
            "Avoid missing weeks — effects decline quickly",
          ],
          note: "Steady, repeated dosing yields the strongest hormonal response.",
        },
        {
          title: "Step 5",
          subtitle: "Inject Subcutaneously",
          points: [
            "Abdomen or thigh",
            "Rotate injection sites",
            "Inject slowly",
            "Takes <10 seconds",
          ],
        },
        {
          title: "Step 6",
          subtitle: "Storage & Handling",
          points: [
            "Refrigerate immediately after mixing",
            "Shelf life: 30 days",
            "Do not freeze",
            "Store refrigerated at all times",
          ],
        },
      ],
      importantNotes: [
        "Expect improved mood & drive within 3–7 days",
        "Energy improvements follow shortly after",
        "Works synergistically with Youth™ & Health™",
        "Do not exceed 3 doses per week",
        "Store refrigerated at all times",
        "Steady, repeated dosing yields the strongest hormonal response.",
      ],
    },
    rewind: {
      title: "Boosted Rewind™ Usage Guide",
      overview: {
        title: "Boosted Rewind™ Usage Overview",
        points: [
          "High-dose NAD+ delivery system for energy, cognition, longevity and cellular repair",
          "Total NAD+ per pen: 500 mg",
          "Volume: 3.0 mL",
          "Total clicks: 300",
          "Dosing frequency: 3× weekly",
          "Store refrigerated after mixing",
        ],
        highlight:
          "High-dose NAD+ works best with consistent 3× weekly dosing. Energy and cognitive benefits compound over time.",
      },
      steps: [
        {
          title: "Step 1",
          subtitle: "Reconstitute Your Pen",
          points: [
            "Add 3.0 mL bacteriostatic water",
            "Swirl gently",
            "Do not shake",
            "Refrigerate immediately",
          ],
          note: "This creates 300 total clicks for precise NAD+ dosing.",
        },
        {
          title: "Step 2",
          subtitle: "Prime the Pen",
          points: [
            "Attach pen tip",
            "Remove both caps",
            "Point pen upward",
            "Eject air until very little remains",
            "Stop when a small droplet forms at the needle tip — your pen is primed",
          ],
          note: "Priming ensures accurate mg delivery.",
        },
        {
          title: "Step 3",
          subtitle: "Understanding Your Dose",
          intro:
            "Each Boosted Rewind™ pen contains 500 mg NAD+ in 3.0 mL = 300 clicks.",
          calculation: "500 mg ÷ 300 = 1.666 mg per click",
          table: {
            options: [
              { dose: "15 clicks", amount: "~25 mg NAD+" },
              { dose: "30 clicks", amount: "~50 mg NAD+" },
              { dose: "Maintenance (10–15 clicks)", amount: "~17–25 mg NAD+" },
            ],
          },
          note: "500 mg ÷ 300 clicks = 1.666 mg per click",
        },
        {
          title: "Step 4",
          subtitle: "Dosing Schedule",
          points: [
            "Inject 15–30 clicks (25–50 mg NAD+) per dose",
            "Dose 3× weekly (e.g. Mon / Wed / Fri)",
            "Higher fatigue → consider 30 clicks",
            "Maintenance phase → 10–15 clicks (as needed)",
          ],
          note: "High-dose NAD+ works best with consistent 3× weekly dosing. Energy and cognitive benefits compound over time.",
        },
        {
          title: "Step 5",
          subtitle: "Inject Subcutaneously",
          points: [
            "Inject abdomen or thigh",
            "Rotate sites",
            "Slow steady injection",
            "Takes <10 seconds",
          ],
        },
        {
          title: "Step 6",
          subtitle: "Storage & Handling",
          points: [
            "Refrigerate immediately after mixing",
            "Shelf life: 30 days",
            "Do not freeze",
            "Keep away from heat and light",
          ],
        },
      ],
      importantNotes: [
        "Expect early clarity & energy in Week 1",
        "Deeper cellular repair in Weeks 3–6",
        "Hydration improves NAD+ utilization",
        "Works synergistically with Glow™, Youth™, and Health™",
        "High-dose NAD+ works best with consistent 3× weekly dosing. Energy and cognitive benefits compound over time.",
      ],
    },
  };

  const activeContent = content[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading and Subheading */}
      <div className="text-center my-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          How to Use Your Boosted Peptide Pen
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Select your product to see precise step-by-step instructions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Title */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold">
            {activeContent.title}
          </h2>
        </div>

        {/* Overview */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {activeContent.overview.title}
          </h3>
          <ul className="space-y-2 mb-4">
            {activeContent.overview.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-gray-800 font-medium">
              {activeContent.overview.highlight}
            </p>
          </div>
        </div>

        {/* Steps */}
        {activeContent.steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center mb-3">
              <span className="bg-blue-600 text-white font-bold text-lg px-4 py-2 rounded-full mr-3">
                {step.title}
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                {step.subtitle}
              </h3>
            </div>

            {step.intro && (
              <p className="text-gray-700 mb-3 font-medium">{step.intro}</p>
            )}

            {step.calculation && (
              <div className="bg-gray-50 p-3 rounded mb-3">
                <p className="font-mono text-gray-800">{step.calculation}</p>
              </div>
            )}

            {step.points && (
              <ul className="space-y-2 mb-3">
                {step.points.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {step.table && (
              <div className="my-4">
                {step.table.perClick && (
                  <div className="mb-3">
                    <h4 className="font-bold text-gray-800 mb-2">
                      Per-Click Dosage:
                    </h4>
                    <div className="bg-gray-50 rounded p-3 space-y-1">
                      {step.table.perClick.map((item, tIndex) => (
                        <div key={tIndex} className="flex justify-between">
                          <span className="font-medium text-gray-700">
                            {item.compound}
                          </span>
                          <span className="text-gray-600">{item.dose}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {step.table.daily && (
                  <div className="mb-3">
                    <h4 className="font-bold text-gray-800 mb-2">
                      Daily Dose (10 Clicks):
                    </h4>
                    <div className="bg-blue-50 rounded p-3 space-y-1">
                      {step.table.daily.map((item, tIndex) => (
                        <div key={tIndex} className="flex justify-between">
                          <span className="font-medium text-gray-700">
                            {item.compound}
                          </span>
                          <span className="text-gray-600">{item.dose}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {step.table.weekly && (
                  <div className="mb-3">
                    <h4 className="font-bold text-gray-800 mb-2">
                      Weekly Dose (50 Clicks):
                    </h4>
                    <div className="bg-blue-50 rounded p-3 space-y-1">
                      {step.table.weekly.map((item, tIndex) => (
                        <div key={tIndex} className="flex justify-between">
                          <span className="font-medium text-gray-700">
                            {item.compound}
                          </span>
                          <span className="text-gray-600">{item.dose}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {step.table.options && (
                  <div className="bg-gray-50 rounded p-3 space-y-2">
                    {step.table.options.map((item, tIndex) => (
                      <div
                        key={tIndex}
                        className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0"
                      >
                        <span className="font-medium text-gray-700">
                          {item.dose}
                        </span>
                        <span className="text-gray-600">
                          {item.clicks || item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {step.table.phases && (
                  <div className="bg-gray-50 rounded p-3 space-y-2">
                    {step.table.phases.map((item, tIndex) => (
                      <div
                        key={tIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700">
                          {item.phase}
                        </span>
                        <span className="text-gray-600">{item.dose}</span>
                      </div>
                    ))}
                  </div>
                )}
                {step.table.dosing && (
                  <div className="bg-gray-50 rounded p-3 space-y-2">
                    {step.table.dosing.map((item, tIndex) => (
                      <div
                        key={tIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-gray-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step.perClick && (
              <div className="bg-gray-50 rounded p-3 mb-3 space-y-1">
                {step.perClick.map((item, pIndex) => (
                  <p key={pIndex} className="text-gray-700">
                    {item}
                  </p>
                ))}
              </div>
            )}

            {step.titration && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Month 1 Pen (6 mg · 0.03 mg/click)
                  </h4>
                  <div className="bg-gray-50 rounded p-3 space-y-2">
                    {step.titration.month1.map((item, tIndex) => (
                      <div
                        key={tIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700">
                          {item.week}
                        </span>
                        <span className="text-gray-600">
                          {item.dose} = {item.clicks}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Month 2 Pen (18 mg · 0.09 mg/click)
                  </h4>
                  <div className="bg-blue-50 rounded p-3 space-y-2">
                    {step.titration.month2.map((item, tIndex) => (
                      <div key={tIndex}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">
                            {item.week}
                          </span>
                          <span className="text-gray-600">
                            {item.dose} = {item.clicks}
                          </span>
                        </div>
                        {item.note && (
                          <p className="text-sm text-green-600 mt-1">
                            {item.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Month 3+ Pen (32 mg · 0.16 mg/click)
                  </h4>
                  <div className="bg-green-50 rounded p-3 space-y-2">
                    {step.titration.month3.map((item, tIndex) => (
                      <div
                        key={tIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700">
                          {item.week}
                        </span>
                        <span className="text-gray-600">
                          {item.dose} = {item.clicks}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step.note && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mt-3">
                <p className="text-gray-800 text-sm font-medium">{step.note}</p>
              </div>
            )}
          </div>
        ))}

        {/* Important Notes */}
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-red-800 flex items-center">
            <span className="mr-2">⚠️</span>
            Important Notes for {activeContent.title.split(" ")[1]} Users
          </h3>
          <ul className="space-y-2">
            {activeContent.importantNotes.map((note, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-gray-800">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TabswithInfo;
