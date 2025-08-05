export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Affaan Memon",
    url: "https://affaanm.com",
    sameAs: [
        "https://github.com/affaan-git",
        "https://www.linkedin.com/in/affaanm"
    ],
    jobTitle: "Software Engineer",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}