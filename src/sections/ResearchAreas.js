"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Hexagon, Layers, Zap, Leaf } from "lucide-react";
import { researchAreas } from "../data";

const iconMap = {
  hexagon: Hexagon,
  layers: Layers,
  zap: Zap,
  leaf: Leaf,
};

const colorMap = {
  sage: {
    accent: "var(--accent-sage)",
    light: "var(--accent-sage-light)",
    border: "var(--accent-sage-border)",
  },
  terracotta: {
    accent: "var(--accent-terracotta)",
    light: "var(--accent-terracotta-light)",
    border: "var(--accent-terracotta-border)",
  },
  blue: {
    accent: "var(--accent-blue)",
    light: "var(--accent-blue-light)",
    border: "var(--accent-blue-border)",
  },
};

export default function ResearchAreas() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" ref={ref} style={{ padding: "100px 0", background: "var(--bg-primary)" }}>
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span className="section-label">Focus Areas</span>
          <h2 className="section-title" style={{ marginTop: "12px" }}>
            Research Areas
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "560px", margin: "16px auto 0" }}>
            Exploring the intersection of materials science, catalysis, and sustainable chemistry
            to design next-generation functional materials.
          </p>
        </motion.div>

        {/* 2×2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px",
          }}
          className="research-grid"
        >
          {researchAreas.map((area, i) => {
            const Icon = iconMap[area.icon] || Hexagon;
            const colors = colorMap[area.color] || colorMap.sage;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card"
                style={{
                  borderTop: `4px solid ${colors.accent}`,
                  padding: "36px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background watermark icon */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    right: "-12px",
                    opacity: 0.04,
                  }}
                >
                  <Icon size={120} color={colors.accent} />
                </div>

                {/* Icon badge */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: colors.light,
                    border: `1px solid ${colors.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Icon size={24} color={colors.accent} />
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  {area.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.7",
                    fontSize: "0.95rem",
                  }}
                >
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .research-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}