"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { profile } from "../data";

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const researchInterests = [
    "Metal-Organic Frameworks",
    "Heterogeneous Catalysis",
    "Green Organic Synthesis",
    "Functionalized Graphene Oxide",
  ];

  return (
    <section id="about" ref={ref} style={{ background: "var(--bg-primary)", padding: "100px 0" }}>
      <div className="section-padding">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* LEFT — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
          >
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                style={{
                  width: "320px",
                  height: "320px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid var(--accent-terracotta)",
                  boxShadow: "0 20px 60px rgba(201,149,106,0.2)",
                }}
              />
            ) : (
              <div
                className="photo-placeholder"
                style={{ width: "320px", height: "320px", fontSize: "5rem" }}
              >
                MK
              </div>
            )}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                {profile.name}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{profile.title}</p>
            </div>
          </motion.div>

          {/* RIGHT — Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title" style={{ marginTop: "12px", marginBottom: "0" }}>
              Chemist. Researcher.
              <br />
              <span style={{ color: "var(--accent-terracotta)" }}>Problem Solver.</span>
            </h2>
            <div className="divider" style={{ margin: "24px 0" }} />
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                fontSize: "1.05rem",
                marginBottom: "32px",
              }}
            >
              {profile.about}
            </p>

            <p
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--accent-terracotta)",
                fontWeight: 600,
                marginBottom: "14px",
              }}
            >
              Research Interests
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {researchInterests.map((interest) => (
                <span key={interest} className="tag-sage">
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}