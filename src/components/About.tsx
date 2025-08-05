"use client";

import { motion } from "framer-motion";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const fadeInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  transition: { delay },
  viewport: { once: true },
});

export default function About() {
  const skills = [
    "Agile Collaboration",
    "Full-Stack Architecture",
    "Backend APIs",
    "Frontend Design",
    "Infrastructure Automation",
    "Problem Solving",
  ];

  return (
    <motion.section
      {...fadeInUp()}
      id="about"
      className="py-20 px-6 max-w-6xl mx-auto text-gray-800 dark:text-gray-300"
    >
      <h2 className="text-4xl font-bold text-black dark:text-white text-center mb-12">
        About Me
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN */}
        <div>
          <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
            Hi, I&rsquo;m Affaan Memon,
          </h3>

          {[
            "A software engineering graduate that builds full-stack,\nmulti-architecture applications that scale.",
            "I specialize in the entire software development lifecycle - from architecting scalable back-end systems to crafting clean, responsive \nfront-end interfaces.",
            "I'm always looking for opportunities to grow and collaborate. Let's work together and bring ideas to life.",
          ].map((text, i) => (
            <motion.p
              key={i}
              {...fadeInUp(0.2 + i * 0.1)}
              className="text-md leading-relaxed mb-4"
            >
              {text.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.p>
          ))}

          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                {...fadeInUp(0.4 + i * 0.1)}
                className="bg-gray-200 dark:bg-gray-700 text-sm text-black dark:text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {[
            {
              title: "What I do",
              content:
                "I design, develop, test, deploy, and maintain business applications and infrastructure. I'm skilled in agile collaboration, prioritization, and adapting whenever needed, with a focus on clean code, scalability, and real-world problem solving.",
              delay: 0.3,
            },
            {
              title: "Why I do it",
              content:
                "Whether launching new products, improving existing systems, or learning the latest tech - I'm always seeking to utilize my drive for innovation and problem-solving to grow as a developer and create solutions.",
              delay: 0.6,
            },
          ].map(({ title, content, delay }) => (
            <motion.div
              key={title}
              {...fadeInRight(delay)}
              className="bg-gray-100 dark:bg-dark-muted rounded-xl p-6 shadow-md transition-colors"
            >
              <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
                {title}
              </h4>
              <p className="text-md leading-relaxed">{content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}