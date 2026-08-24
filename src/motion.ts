// Entry transition for grid items (skills, certifications, projects).
export const cardEntry = (index: number) => {
  const delay = Math.min(index * 0.03, 0.3);
  return {
    y: { duration: 0.4, delay },
    opacity: { duration: 0.7, delay },
  };
};
