"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile, stats } from "../data";



const MOFTopologyBackground = () => {
  const [clusters, setClusters] = useState([]);

  const directions = [
    { x: 0, y: -1 },
    { x: 0.94, y: 0.33 },
    { x: -0.94, y: 0.33 },
    { x: 0, y: 1 },
  ];

  useEffect(() => {
    const generated = Array.from({ length: 12 }).map(() => ({
      centerX: Math.random() * 100,
      centerY: Math.random() * 100,
      scale: 0.6 + Math.random() * 0.8,
      duration: 40 + Math.random() * 20,
      bondDuration: 4 + Math.random() * 2,
      nodeDuration: 2 + Math.random(),
    }));

    setClusters(generated);
  }, []);

  // prevent SSR mismatch
  if (clusters.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        perspective: "1000px",
      }}
    >
      {clusters.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${c.centerX}%`,
            top: `${c.centerY}%`,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: [0, 360],
            rotateX: [20, 25, 20],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* central node */}
          <motion.div
            style={{
              position: "absolute",
              width: 8 * c.scale,
              height: 8 * c.scale,
              borderRadius: "50%",
              background: "rgba(227, 172, 127, 0.9)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* linkers */}
          {directions.map((dir, j) => {
            const length = 60 * c.scale;
            const angle = Math.atan2(dir.y, dir.x) * (180 / Math.PI);

            return (
              <div key={j}>
                {/* bond */}
                <motion.div
                  style={{
                    position: "absolute",
                    width: length,
                    height: "1.5px",
                    background: "rgba(201,149,106,0.35)",
                    transformOrigin: "0% 50%",
                    transform: `rotate(${angle}deg)`,
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: c.bondDuration,
                    repeat: Infinity,
                  }}
                />

                {/* connected node */}
                <motion.div
                  style={{
                    position: "absolute",
                    left: dir.x * length,
                    top: dir.y * length,
                    width: 5 * c.scale,
                    height: 5 * c.scale,
                    borderRadius: "50%",
                    background: "rgba(201,149,106,0.7)",
                  }}
                  animate={{
                    scale: [1, 1.6, 1],
                  }}
                  transition={{
                    duration: c.nodeDuration,
                    repeat: Infinity,
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};



const GrapheneBackground = () => {
  const hexSize = 60; // size of hexagon
  const rows = 10;
  const cols = 14;

  const hexPoints = (size) => {
    const h = size * Math.sqrt(3) / 2;
    return `
      ${size / 2},0
      ${size * 1.5},0
      ${2 * size},${h}
      ${size * 1.5},${2 * h}
      ${size / 2},${2 * h}
      0,${h}
    `;
  };

  const hexagons = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexSize * 1.5;
      const y = row * hexSize * Math.sqrt(3) + (col % 2 ? hexSize * Math.sqrt(3) / 2 : 0);

      hexagons.push(
        <motion.polygon
          key={`${row}-${col}`}
          points={hexPoints(hexSize)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: (row + col) * 0.05 }}
          style={{
            fill: "none",
            stroke: "rgba(223, 117, 25, 0.3)",
            strokeWidth: 1,
          }}
          transform={`translate(${x}, ${y})`}
        />
      );
    }
  }

  return (
    <motion.svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {hexagons}
    </motion.svg>
  );
};


export default function Hero() {
  const [currentKeyword, setCurrentKeyword] = useState(0);

  // Automatically split the name into two halves for the two-tone aesthetic
  const nameParts = profile.name ? profile.name.split(" ") : [""];
  const midPoint = Math.ceil(nameParts.length / 2);
  const namePart1 = nameParts.slice(0, midPoint).join(" ");
  const namePart2 = nameParts.slice(midPoint).join(" ");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % profile.keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 1.5rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
   
      {/* <MoleculeBackground /> */}
      <GrapheneBackground />
     
      <MOFTopologyBackground />
     
      
      <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4rem",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT — text */}
          <div style={{ flex: "1", minWidth: "300px", maxWidth: "580px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="tag" style={{ marginBottom: "1.25rem", display: "inline-block" }}>
                PhD Research Scholar · University of Delhi
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                lineHeight: 1.15,
                fontStyle:"italic",
              }}
            >
              <span style={{ color: "var(--text-primary)" }}>{namePart1}</span>{" "}
              <span style={{ color: "var(--accent-terracotta)" }}>{namePart2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              {profile.tagline}
            </motion.p>

            {/* rotating keyword */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", height: "2rem" }}
            >
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                currently researching
              </span>
              <motion.span
                key={currentKeyword}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-terracotta)" }}
              >
                {profile.keywords[currentKeyword]}
              </motion.span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}
            >
              <a href="#publications" className="btn-primary">View Publications</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </motion.div>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent-terracotta)", lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.2rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ flexShrink: 0 }}
          >
            <div
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "var(--accent-terracotta-light)",
                border: "4px solid var(--accent-terracotta-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "5rem",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(201,149,106,0.2)",
              }}
            >
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ opacity: 0.4 }}>👩‍🔬</span>
              )}
            </div>
            {/* caption under photo */}
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {profile.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Dept. of Chemistry · University of Delhi
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}