"use client";

import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

export default function Skills() {
  const skillGroups = [
    {
      title: "Languages and Frameworks",
      skills: [
        { iconSrc: null, label: "Python" },
        { iconSrc: null, label: "Java" },
        { iconSrc: null, label: "JavaScript" },
        { iconSrc: null, label: "Spring" },
        { iconSrcLight: null, iconSrcDark: null, label: "Angular" },
        { iconSrc: null, label: "Node.js" },
        { iconSrc: null, label: "SQL/MySQL" },
        { iconSrc: null, label: "NoSQL" },
        { iconSrc: null, label: "HTML/CSS" },
      ],
      baseDelay: 0.4,
    },
    {
      title: "Tools and Platforms",
      skills: [
        { iconSrc: null, label: "Docker" },
        { iconSrcLight: null, iconSrcDark: null, label: "Amazon AWS" },
        { iconSrcLight: null, iconSrcDark: null, label: "Google Play Services" },
        { iconSrcLight: null, iconSrcDark: null, label: "Visual Studio Code" },
        { iconSrcLight: null, iconSrcDark: null, label: "IntelliJ IDEA" },
        { iconSrc: null, label: "Android Studio" },
      ],
      baseDelay: 0.6,
    },
    {
      title: "Development Practices",
      skills: [
        { iconSrcLight: null, iconSrcDark: null, label: "Agile Methodology" },
        { iconSrcLight: null, iconSrcDark: null, label: "Quality Assurance" },
        { iconSrcLight: null, iconSrcDark: null, label: "UX and UI Design" },
        { iconSrcLight: null, iconSrcDark: null, label: "Multi-platform Development" },
        { iconSrc: null, label: "Docker Compose" },
        { iconSrc: null, label: "REST APIs" },
      ],
      baseDelay: 0.8,
    },
  ];

  return (
    <motion.section
      id="skills"
      className="px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">Skills</h2>
        <p className="text-base opacity-80">
          I&rsquo;m proficient in a range of modern skills and technologies. These are some of my main technologies and skills.
        </p>
      </div>

      {skillGroups.map(({ title, skills, baseDelay }) => (
        <div key={title} className="max-w-5xl mx-auto mt-12 first:mt-10">
          <h3 className="text-2xl font-medium text-center mb-6">{title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: baseDelay + i * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard {...skill} />
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </motion.section>
  );
}