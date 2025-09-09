"use client";

import { motion } from "framer-motion";
import EducationItem from "./EducationItem";

export default function Education() {
  const educationList = [
    {
      iconSrc: null,
      institution: "University of Texas at Austin",
      program: "Postgraduate Certification, Artificial Intelligence and Machine Learning",
      dateRange: "October 2024 - August 2025",
    },
    {
      iconSrc: null,
      institution: "Western Governors University",
      program: "Bachelor of Science, Software Engineering",
      dateRange: "September 2022 - March 2024",
    },
  ];

  return (
    <motion.section
      id="education"
      className="px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col space-y-6">
        {educationList.map((edu) => (
          <EducationItem key={edu.institution} {...edu} />
        ))}
      </div>
    </motion.section>
  );
}
