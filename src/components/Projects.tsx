"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cardEntry } from "@/motion";
import ProjectCard, { type ProjectLink } from "./ProjectCard";

interface Project {
  title: string;
  imageSrc?: string;
  imageSrcLight?: string;
  imageSrcDark?: string;
  description: string;
  tags: string[];
  dateRange?: string;
  links?: ProjectLink[];
}

const projectList: Project[] = [
  {
    title: "dotfiles",
    imageSrc: "/images/dotfiles-terminal.png",
    description:
      "Published a macOS terminal configuration installable through a single Make target.",
    tags: [
      "Bash",
      "macOS",
      "Windows",
      "Zsh",
      "Shell Scripting",
      "Automation",
    ],
    dateRange: "Jun 2026 - Jul 2026",
    links: [{ label: "GitHub", href: "https://github.com/affaan-git/dotfiles" }],
  },
  {
    title: "agency",
    imageSrc: "/images/agency-icon.png",
    description:
      "Developed a Claude Code plugin managing session state for multi-agent teams, improving the sub-agent build experience.",
    tags: [
      "Software Architecture",
      "Developer Tools",
      "AI",
      "LLMs",
    ],
    dateRange: "Jun 2026",
    links: [{ label: "GitHub", href: "https://github.com/affaan-git/agency" }],
  },
  {
    title: "Joblio - Local Job Application Tracker",
    imageSrc: "/images/joblio-application-tracker.png",
    description:
      "Developed a self-hosted job application tracking application in Node.js with Docker deployment and a modular front end. Includes authentication, session management, request throttling, and tamper audit logging.",
    tags: [
      "Application Security",
      "Web Development",
      "Docker",
      "JavaScript",
      "Node.js",
    ],
    dateRange: "Mar 2026 - Apr 2026",
    links: [{ label: "GitHub", href: "https://github.com/affaan-git/joblio" }],
  },
  {
    title: "Stock Calculation Server",
    imageSrc: "/images/stock-calculation-server-placeholder.png",
    description:
      "Python trading system built on three custom models with a voting pipeline and volatility tuning, reaching 86% precision. Adds paper trading, backtesting, multi-network failover, capital allocation, and crypto data across 13+ revisions. Actively maintained.",
    tags: [
      "Machine Learning",
      "TensorFlow",
      "Scikit-Learn",
      "XGBoost",
      "APIs",
      "Python",
      "Algorithms",
      "Stock Market Analysis",
      "Stock Management",
    ],
    dateRange: "Dec 2019 - Present",
  },
  {
    title: "SuperKart - Retail Sales Revenue Forecaster",
    imageSrcLight: "/images/superkart-light.png",
    imageSrcDark: "/images/superkart-dark.png",
    description:
      "Dockerized Flask REST API using Random Forest and XGBoost trained on 8,763 transactions, paired with an interactive front end for single and batch revenue forecasts across product, location, and type filters.\nLaunch the back-end before the front-end.",
    tags: [
      "APIs",
      "Python",
      "Pandas",
      "Data Preparation",
      "NumPy",
      "REST APIs",
      "Data Science",
      "Scikit-Learn",
      "TensorFlow",
      "Machine Learning",
      "Predictive Analytics",
    ],
    dateRange: "Jul 2025",
    links: [
      {
        label: "Back-end",
        href: "https://huggingface.co/spaces/UTAIML/SalesTotalPredictionBackend",
      },
      {
        label: "Front-end",
        href: "https://huggingface.co/spaces/UTAIML/SalesTotalPredictionFrontend",
      },
    ],
  },
  {
    title: "HelmNet - Workplace Safety Classifier",
    description:
      "Image classification models using transfer learning and CNNs to categorize workers wearing and not wearing helmets, supporting stronger operational safety practices.",
    tags: [
      "Python",
      "Neural Networks",
      "Pandas",
      "Data Preparation",
      "Transfer Learning",
      "NumPy",
      "Data Science",
      "TensorFlow",
      "CNNs",
    ],
    dateRange: "Jun 2025",
  },
  {
    title: "NBFC Loan Default Hackathon",
    description:
      "Placed 2nd by training a GPU-accelerated LightGBM and stacking ensemble on 93k+ loans, achieving 0.91 AUC. Improved performance through class weighting, an engineered income-to-loan ratio, and threshold tuning against PR curves.",
    tags: [
      "Python",
      "Pandas",
      "Data Preparation",
      "NumPy",
      "Data Science",
      "TensorFlow",
      "Predictive Analytics",
    ],
    dateRange: "Jun 2025",
  },
  {
    title: "Medical Assistant",
    description:
      "* Developed an AI-powered RAG medical solution automating the use of medical manuals\n* Enhanced diagnostic accuracy and treatment efficiency of illnesses\n* Employed standardized care practice and decision making\n* Reduced overload in healthcare settings",
    tags: [
      "Python",
      "Pandas",
      "Data Preparation",
      "NumPy",
      "RAG",
      "TensorFlow",
      "LLMs",
    ],
    dateRange: "May 2025",
  },
  {
    title: "Vacation Manager Android Application",
    imageSrc: "/images/vacations-manager-android-application.png",
    description:
      "• Built and published a JUnit-tested Android app in Java with a multi-screen UI, scheduling, and push notifications.\n• Implemented date-conflict and edge-case validation with persistent storage using the Room database.\n• Shipped to the Google Play Store against security, backward-compatibility, and universal device standards.",
    tags: [
      "Risk Management",
      "Mobile Device Data Storage",
      "Procurement",
      "Android Testing",
      "Budgeting",
      "Android SDK",
      "Cybersecurity",
      "Android Studio",
      "Backup & Recovery Systems",
      "Software Deployment",
      "Stakeholder Management",
      "UI Design",
      "Android Development",
    ],
    dateRange: "Dec 2023 - Feb 2024",
  },
  {
    title: "DVD Rental Multi-Store Inventory Tracker",
    description:
      "• Built a PostgreSQL-backed inventory system for a multi-location rental company with tiered roles and web tools.\n• Designed reporting with triggers, procedures, and pgAgent to track stock and turnover, finding two issues.",
    tags: [
      "Risk Management",
      "Procurement",
      "Business Process Improvement",
      "Budgeting",
      "PostgreSQL",
      "SQL",
      "Data Analysis",
      "Physical Security",
      "Cybersecurity",
      "Backup & Recovery Systems",
      "Stakeholder Management",
    ],
    dateRange: "Nov 2023",
  },
  {
    title: "Web-Based Spring Inventory Management Application",
    description:
      "• Deployed a Java Spring MVC application for inventory tracking with CRUD operations backed by H2 and MySQL.\n• Wrote custom controllers and five bean validators to enforce business rules on counts, pricing, and associations.",
    tags: [
      "Risk Management",
      "Spring Framework",
      "Spring DAO",
      "Java Software Development",
      "Networking",
      "Physical Security",
      "Cybersecurity",
      "Backup & Recovery Systems",
      "Procurement",
      "Budgeting",
      "Stakeholder Management",
    ],
    dateRange: "Jul 2023 - Aug 2023",
  },
];

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const getMetrics = () => {
      const styles = window.getComputedStyle(grid);
      const rowHeight = parseFloat(styles.getPropertyValue("grid-auto-rows")) || 8;
      const rowGap =
        parseFloat(styles.getPropertyValue("row-gap")) ||
        parseFloat(styles.getPropertyValue("grid-row-gap")) ||
        0;
      return { rowHeight, rowGap };
    };

    const items = Array.from(
      grid.querySelectorAll<HTMLElement>("[data-masonry-item]")
    );

    let frame = 0;

    const update = () => {
      frame = 0;
      const { rowHeight, rowGap } = getMetrics();
      // Reset every item first, then read every height, then write every span, preventing reflow per item
      items.forEach((item) => {
        item.style.gridRowEnd = "span 1";
      });
      const spans = items.map((item) => {
        const content =
          item.querySelector<HTMLElement>("[data-masonry-content]") ?? item;
        const h = content.getBoundingClientRect().height;
        return Math.ceil((h + rowGap) / (rowHeight + rowGap));
      });
      items.forEach((item, i) => {
        item.style.gridRowEnd = `span ${spans[i]}`;
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(grid);
    items.forEach((el) => {
      // Observe the content box, not the grid item
      ro.observe(el.querySelector<HTMLElement>("[data-masonry-content]") ?? el);
      // Recalculate when images load (Next/Image still fires on the <img>)
      el.querySelectorAll("img").forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", schedule, { once: true });
        img.addEventListener("error", schedule, { once: true });
      });
    });

    update();
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <motion.section
      id="projects"
      aria-label="Projects"
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

      <div
        ref={gridRef}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 [grid-auto-rows:8px]"
      >
        {projectList.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={cardEntry(index)}
            viewport={{ once: true }}
            data-masonry-item
          >
            <div data-masonry-content>
              <ProjectCard {...project} priority={index < 2} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
