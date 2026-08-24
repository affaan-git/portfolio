"use client";

import { motion } from "framer-motion";
import { cardEntry } from "@/motion";
import SkillCard from "./SkillCard";

export default function Skills() {
  const skillGroups = [
    {
      title: "Languages and Frameworks",
      skills: [
        "Python", "Java", "Spring", "JavaScript", "React", "Angular",
        "Node.js", "SQL", "Postgres", "MongoDB", "HTML/CSS",
      ].map((label) => ({ iconSrc: null, label })),
    },
    {
      title: "Tools and Platforms",
      skills: [
        "Docker", "AWS", "Linux", "macOS", "Git", "GitHub", "GitLab",
        "VS Code", "IntelliJ", "Android Studio", "Xcode", "Google Play",
      ].map((label) => ({ iconSrc: null, label })),
    },
    {
      title: "AI Tooling",
      skills: [
        "Claude Code", "Codex", "Copilot", "Cursor", "Scikit-Learn",
        "TensorFlow", "Prompt Engineering", "AI-Assisted Debugging", "Refactoring",
      ].map((label) => ({ iconSrc: null, label })),
    },
    {
      title: "Development Practices",
      skills: [
        "ML Engineering and Pipelines", "Agile", "CI/CD", "QA",
        "UI/UX Design", "Multi-platform Development",
      ].map((label) => ({ iconSrc: null, label })),
    },
  ];

  return (
    <motion.section
      id="skills"
      aria-label="Skills"
      className="px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">Skills</h2>
        <p className="text-base opacity-80">
          I&rsquo;m proficient in a range of modern skills and technologies. These are some of my main ones.
        </p>
      </div>

      {skillGroups.map(({ title, skills }) => (
        <div key={title} className="max-w-5xl mx-auto mt-12 first:mt-10">
          <h3 className="text-2xl font-medium text-center mb-6">{title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={cardEntry(i)}
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