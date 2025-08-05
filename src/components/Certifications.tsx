"use client";

import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

// Dynamically assign col-span for long labels
const spanClass = (label: string) => (label.length > 70 ? "sm:col-span-2" : "");

export default function Certifications() {
  const certs = [
    { iconSrc: null, label: "University of Texas at Austin: Postgraduate Certification, Artificial Intelligence and Machine Learning" },
    { iconSrc: null, label: "DeepLean.AI: Generative AI for Software Development" },
    { iconSrc: null, label: "Microsoft MTA: Python" },
    { iconSrc: null, label: "Microsoft MTA: Java" },
    { iconSrc: null, label: "Microsoft MTA: JavaScript" },
    { iconSrc: null, label: "Microsoft MTA: HTML/CSS" },
    { iconSrc: null, label: "Microsoft MTA: Windows OS Fundamentals" },
    { iconSrc: null, label: "AWS Certified Cloud Practitioner" },
    { iconSrc: null, label: "WGU Backend Developer" },
    { iconSrc: null, label: "Git Essential Training (LinkedIn)" },
    { iconSrc: null, label: "Git for Teams (LinkedIn + NASBA)" },
    { iconSrc: null, label: "Git Branches, Merges, Remotes (LinkedIn + NASBA)" },
    { iconSrc: null, label: "Google IT Support" },
    { iconSrc: null, label: "CompTIA Project+" },
    { iconSrc: null, label: "CompTIA A+" },
  ];

  return (
    <motion.section
      id="certifications"
      className="px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-3xl mx-auto text-left mb-8">
        <h2 className="text-3xl font-semibold mb-2">Certifications</h2>
        <p className="text-base opacity-80">
          I have a multitude of technical certifications from a variety of issuers ranging from
          Operating System to Development to the Cloud.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-flow-dense auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {certs.map(({ iconSrc, label }, i) => (
            <motion.span
              key={label}
              className={spanClass(label)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <SkillCard iconSrc={iconSrc} label={label} />
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}