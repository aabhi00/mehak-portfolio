"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { papers } from "../data";

function PublicationItem({ paper, index }) {
  const [ref, inView] = useInView({
    threshold: 0.3,      
    triggerOnce: true,   
  });

  const isLeft = index % 2 === 0; 

  // Cycle through your 3 accent themes based on the card's index
  const themes = [
    { main: "var(--accent-terracotta)", light: "var(--accent-terracotta-light)", border: "var(--accent-terracotta-border)" },
    { main: "var(--accent-sage)", light: "var(--accent-sage-light)", border: "var(--accent-sage-border)" },
    { main: "var(--accent-blue)", light: "var(--accent-blue-light)", border: "var(--accent-blue-border)" }
  ];
  const theme = themes[index % themes.length];

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        marginBottom: "3rem",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Thin dashed line connecting the center axis to the card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: "50%", 
          width: "5%", 
          borderTop: `1.5px dashed ${theme.border}`, // Matches the card's theme
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      {/* The circular node on the center line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "var(--bg-primary)",
          border: `3px solid ${theme.main}`,
          zIndex: 2,
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          width: "45%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1.5rem",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* colored top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: theme.main,
            borderRadius: "12px 12px 0 0",
          }}
        />

        {/* year badge */}
        <span
          style={{
            display: "inline-block",
            padding: "0.2rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            background: theme.light,
            color: theme.main,
            marginBottom: "0.75rem",
            border: `1px solid ${theme.border}`,
          }}
        >
          {paper.year}
        </span>

        {/* venue label - NOW WITH ITALICS */}
        <div
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "0.4rem",
            fontWeight: 600,
            fontStyle: "italic", // <--- Added here
          }}
        >
          {paper.venue}
        </div>

        {/* title */}
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            lineHeight: 1.4,
          }}
        >
          {paper.title}
        </h3>
      </motion.div>
    </div>
  );
}

export default function PublicationsTimeline() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const sortedPapers = [...papers].sort((a, b) => b.year - a.year);

  return (
    <section id="pub-timeline" className="section-padding">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="section-label" style={{ marginBottom: "1rem", display: "inline-block" }}>
            Publications
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Research Timeline
          </h2>
          <div className="divider mx-auto" />
        </motion.div>

        {/* timeline */}
        <div style={{ position: "relative" }}>

          {/* Fading, Bold Center Vertical Line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "-20px",    // Start slightly above the first item
              bottom: "-20px", // End slightly below the last item
              width: "4px",    // Bolder width
              borderRadius: "4px", // Rounded edges
              background: "linear-gradient(to bottom, transparent 0%, var(--border) 10%, var(--border) 90%, transparent 100%)",
              transform: "translateX(-50%)",
            }}
          />

          {sortedPapers.map((paper, index) => (
            <PublicationItem key={paper.id || index} paper={paper} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}