"use client";

import { motion } from "framer-motion";
import { cardEntry } from "@/motion";
import SkillCard from "./SkillCard";

// Dynamically assign col-span for long labels
const spanClass = (label: string) => (label.length > 70 ? "sm:col-span-2" : "");

export default function Certifications() {
  const certs: { iconSrc: null; label: string; credentialUrl: string | null }[] = [
    { iconSrc: null, label: "Anthropic: Claude 101", credentialUrl: null },
    { iconSrc: null, label: "Anthropic: AI Fluency Framework & Foundations", credentialUrl: null },
    { iconSrc: null, label: "University of Texas at Austin: Postgraduate Certification, Artificial Intelligence and Machine Learning", credentialUrl: null },
    { iconSrc: null, label: "DeepLearning.AI: Generative AI for Software Development", credentialUrl: null },
    { iconSrc: null, label: "AWS Certified Cloud Practitioner", credentialUrl: null },
    { iconSrc: null, label: "WGU Backend Developer", credentialUrl: null },
    { iconSrc: null, label: "Google IT Support", credentialUrl: null },
    { iconSrc: null, label: "CompTIA Project+", credentialUrl: null },
    { iconSrc: null, label: "CompTIA A+", credentialUrl: null },
    { iconSrc: null, label: "Microsoft MTA: Python", credentialUrl: null },
    { iconSrc: null, label: "Microsoft MTA: Java", credentialUrl: null },
    { iconSrc: null, label: "Microsoft MTA: JavaScript", credentialUrl: null },
    { iconSrc: null, label: "Microsoft MTA: HTML/CSS", credentialUrl: null },
    { iconSrc: null, label: "Microsoft MTA: Windows OS Fundamentals", credentialUrl: null },
    { iconSrc: null, label: "Git Essential Training (LinkedIn)", credentialUrl: null },
    { iconSrc: null, label: "Git for Teams (LinkedIn + NASBA)", credentialUrl: null },
    { iconSrc: null, label: "Git Branches, Merges, Remotes (LinkedIn + NASBA)", credentialUrl: null },
  ];

  return (
    <motion.section
      id="certifications"
      aria-label="Certifications"
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
          {certs.map(({ iconSrc, label, credentialUrl }, i) => (
            <motion.span
              key={label}
              className={spanClass(label)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={cardEntry(i)}
              viewport={{ once: true }}
            >
              <SkillCard iconSrc={iconSrc} label={label} credentialUrl={credentialUrl} />
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}