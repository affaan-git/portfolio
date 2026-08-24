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
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

export default function About() {
  const focusAreas = [
    "Applied Machine Learning",
    "Data Modeling",
    "REST APIs",
    "AI-Assisted Development",
    "Containerized Deployment",
  ];

  const paragraphs = [
    "A Software Engineering graduate in Austin, TX with hands-on experience building full-stack Python, Java, and mobile applications.",
    "I organize, prioritize, adapt under high-stress time constraints, and collaborate across teams.",
  ];

  return (
    <motion.section
      {...fadeInUp()}
      id="about"
      aria-label="About"
      className="py-20 px-6 max-w-6xl mx-auto text-gray-800 dark:text-gray-300"
    >
      <h2 className="text-4xl font-bold text-ink dark:text-white text-center mb-12">
        About Me
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN */}
        <div>
          <h3 className="text-2xl font-bold text-ink dark:text-white mb-4">
            Hi, I&rsquo;m Affaan Memon,
          </h3>

          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              {...fadeInUp(0.2 + i * 0.1)}
              className="text-base leading-relaxed mb-4"
            >
              {text}
            </motion.p>
          ))}

          <div className="mt-6 flex flex-wrap gap-3">
            {focusAreas.map((skill, i) => (
              <motion.span
                key={skill}
                {...fadeInUp(0.4 + i * 0.1)}
                className="inline-flex"
              >
                <span className="bg-gray-200 dark:bg-gray-700 text-sm text-ink dark:text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-150">
                  {skill}
                </span>
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
                "I design, develop, administer, test, and support multi-architecture full-stack business applications and infrastructure.",
              delay: 0.3,
            },
            {
              title: "Why I do it",
              content:
                "I'm always looking to innovate and build the things that should be built.",
              delay: 0.6,
            },
          ].map(({ title, content, delay }) => (
            <motion.div
              key={title}
              {...fadeInRight(delay)}
              className="bg-light-muted dark:bg-dark-muted rounded-xl p-6 shadow-md transition-colors"
            >
              <h4 className="text-xl font-semibold text-ink dark:text-white mb-2">
                {title}
              </h4>
              <p className="text-base leading-relaxed">{content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
