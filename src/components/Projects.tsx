"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const projectList = [
    {
      title: "SuperKart",
      imageSrcLight: "/images/superkart-light.png",
      imageSrcDark: "/images/superkart-dark.png",
      description:
        "Deployed a retail sales revenue forecasting pipeline with a full-stack front-end and back-end REST API, allowing operationalized insights and predictive sales management.\n* Frontend: https://huggingface.co/spaces/UTAIML/SalesTotalPredictionFrontend\n* Backend: https://huggingface.co/spaces/UTAIML/SalesTotalPredictionBackend",
      tags: [
        "Predictive Analytics",
        "APIs",
        "Machine Learning",
        "Scikit-Learn",
        "Tensorflow",
        "Data Science",
        "Data Preperation",
        "Pandas",
        "NumPy",
        "Python"
      ]
    },
    {
      title: "Bank Customer Churn Prediction (Apr 2025)",
      imageSrc: "/images/bank-customer-churn-prediction-visualizer.png",
      description:
        "Customer churn predictor using neural networks trained on balanced and imbalanced datasets, delivering insights to improve retention.",
      tags: [
        "Data Analysis",
        "Data Science",
        "Tensorflow",
        "Machine Learning",
        "Performance Tuning",
        "Budgeting",
        "Python",
      ],
    },
    {
      title: "Restaurant Turnover Prediction Hackathon (Feb 2025)",
      imageSrc: "/images/restaurant-turnover-prediction-evaluation.png",
      description:
        "Turnover prediction system for 20K+ restaurants using social media, surveys, and ratings; built with clustering, boosting, and ensemble models.",
      tags: ["Machine Learning", "Tensorflow", "SciKit-Learn", "Python"],
    },
    {
      title: "Vacation Manager Android Application (Dec 2023 - Feb 2024)",
      imageSrc: "/images/vacations-manager-android-application.png",
      description:
        "Android app with multi-screen UI, real-time scheduling, notifications, and adaptive backend - published on Google Play.",
      tags: [
        "Mobile App Development",
        "Cybersecurity",
        "Data Storage & Recovery",
        "UI Design",
        "Android Development (Studio, SDK, Testing)",
        "Risk & Stakeholder Management",
        "Procurement & Budgeting",
      ],
    },
    {
      title: "Stock Calculation Server",
      imageSrc: "/images/stock-calculation-server-placeholder.png",
      description:
        "AI-driven stock trading server with self-correcting logic, paper trading, and distributed backup - in active development (rev 10).",
      tags: [
        "Machine Learning",
        "Tensorflow",
        "Scikit-Learn",
        "XGBoost",
        "APIs",
        "Python",
        "Algorithms",
        "Stock Market Analysis",
        "Stock Management",
      ],
    },
    {
      title: "Portfolio Website",
      imageSrcLight: "/images/portfolio-website-light.png",
      imageSrcDark: "/images/portfolio-website-dark.png",
      description:
        "This portfolio website. Built with Next.js + Tailwind showcasing projects, certifications, and skills.",
      tags: [
        "Next.js",
        "React",
        "Node.js",
        "REST APIs",
        "TypeScript",
        "Tailwind CSS",
        "Vercel (Deployment)",
      ],
    },
  ];

  return (
    <motion.section
      id="projects"
      className="px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-3xl mx-auto text-left mb-8">
        <h2 className="text-3xl font-semibold mb-2">Top Projects</h2>
        <p className="text-base opacity-80">
          I have a long list of projects over years of work; here are the top ones.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectList.map((project, index) => (
          <motion.span
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard {...project} />
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
}