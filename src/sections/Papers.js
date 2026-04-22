"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, ChevronDown, ChevronUp, Quote } from "lucide-react";
import { papers } from "../data";

const FILTERS = [
  { label: "All Papers", value: "all" },
  { label: "Featured", value: "featured" },
  { label: "MOF", value: "mof" },
  { label: "Graphene Oxide", value: "graphene oxide" },
  { label: "Catalysis", value: "catalysis" },
  { label: "Review", value: "review" },
  { label: "Green Chemistry", value: "green chemistry" },
  { label: "Energy Storage", value: "energy storage" },
];

const tagColorMap = (tag) => {
  if (["mof", "cof", "energy storage", "materials science"].includes(tag)) return "tag-blue";
  if (["graphene oxide", "nitro reduction", "c-c bond"].includes(tag)) return "tag";
  return "tag-sage";
};

export default function Papers() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered =
    activeFilter === "all"
      ? papers
      : activeFilter === "featured"
      ? papers.filter((p) => p.highlight)
      : papers.filter((p) => p.tags?.includes(activeFilter));

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section
      id="publications"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--bg-secondary)" }}
    >
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span className="section-label">Research Output</span>
          <h2 className="section-title" style={{ marginTop: "12px" }}>
            Publications
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "520px", margin: "16px auto 0" }}>
            Peer-reviewed research spanning materials synthesis, catalytic mechanisms,
            and sustainable methodologies.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1px solid var(--accent-terracotta-border)",
                background:
                  activeFilter === f.value ? "var(--accent-terracotta)" : "var(--bg-card)",
                color:
                  activeFilter === f.value ? "#fff" : "var(--text-secondary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "40px",
          }}
        >
          Showing {filtered.length} of {papers.length} papers
        </p>

        {/* Paper cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <AnimatePresence>
            {filtered.map((paper, i) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="card"
                style={{ padding: "32px" }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        background: "var(--accent-terracotta)",
                        color: "#fff",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {paper.year}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                      }}
                    >
                      {paper.venue}
                    </span>
                    {paper.highlight && (
                      <span
                        style={{
                          background: "var(--accent-sage-light)",
                          color: "var(--accent-sage)",
                          border: "1px solid var(--accent-sage-border)",
                          borderRadius: "999px",
                          padding: "2px 10px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {paper.citations != null && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Quote size={13} />
                        {paper.citations} citations
                      </span>
                    )}
                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--accent-blue)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <ExternalLink size={14} />
                        View
                      </a>
                    )}
                  </div>
                </div>

                {/* Authors */}
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    marginBottom: "10px",
                  }}
                >
                  {paper.authors}
                </p>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: "1.5",
                    marginBottom: "14px",
                  }}
                >
                  {paper.title}
                </h3>

                {/* Tags */}
                {paper.tags?.length > 0 && (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}
                  >
                    {paper.tags.map((tag) => (
                      <span key={tag} className={tagColorMap(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Summary */}
                <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: "1.7" }}>
                  {paper.summary}
                </p>

                {/* Expand toggle */}
                {(paper.problem || paper.method || paper.impact) && (
                  <>
                    <button
                      onClick={() => toggleExpand(paper.id)}
                      style={{
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "none",
                        border: "none",
                        color: "var(--accent-terracotta)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "0",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {expanded[paper.id] ? (
                        <>
                          <ChevronUp size={15} /> Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={15} /> Problem → Method → Impact
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {expanded[paper.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "16px",
                              marginTop: "20px",
                            }}
                            className="expand-grid"
                          >
                            {[
                              { label: "Problem", text: paper.problem, color: "terracotta" },
                              { label: "Method", text: paper.method, color: "sage" },
                              { label: "Impact", text: paper.impact, color: "blue" },
                            ].map(({ label, text, color }) => (
                              <div
                                key={label}
                                style={{
                                  background: `var(--accent-${color}-light)`,
                                  border: `1px solid var(--accent-${color}-border)`,
                                  borderRadius: "12px",
                                  padding: "18px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "0.68rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    color: `var(--accent-${color})`,
                                    fontWeight: 700,
                                    marginBottom: "8px",
                                  }}
                                >
                                  {label}
                                </p>
                                <p
                                  style={{
                                    fontSize: "0.88rem",
                                    color: "var(--text-secondary)",
                                    lineHeight: "1.6",
                                  }}
                                >
                                  {text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .expand-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}