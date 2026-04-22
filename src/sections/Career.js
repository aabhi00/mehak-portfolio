"use client";

import { useState } from "react";
import { education, experience } from "../data";
import { motion } from "framer-motion";

export default function Career() {
  const [active, setActive] = useState("education");

  const data = active === "education" ? education : experience;

  return (
    <section id="career" className="!px-[50px] !py-[50px]  bg-[var(--bg-secondary)]">
      <p className="section-label">Career</p>
      <h2 className="section-title">Academic & Professional Journey</h2>
      <div className="divider" />

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        {["education", "experience"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              border: "1px solid var(--border)",
              background:
                active === tab ? "var(--accent-terracotta)" : "transparent",
              color: active === tab ? "#fff" : "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ delay: i * 0.08 }}
            className="card"
          >
            <span className="tag-blue">{item.period}</span>

            <h3 className="mt-2 font-semibold">{item.title}</h3>

            <p className="text-sm text-[var(--text-muted)]">
              {item.institution}
            </p>

            <p className="text-sm mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}