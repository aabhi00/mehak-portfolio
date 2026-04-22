"use client";

import { profile } from "../data";
import IconRenderer from "../components/icons/IconRenderer";

export default function Footer() {
  const links = [
    { icon: "email", label: "Email", href: `mailto:${profile.email}` },
    { icon: "linkedin", label: "LinkedIn", href: profile.linkedin },
    { icon: "scholar", label: "Google Scholar", href: profile.scholar },
    { icon: "researchgate", label: "ResearchGate", href: profile.researchgate },
  ];

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
         padding: "0px 0px 0px", // 🔥 reduced
        marginTop: "0",
      }}
    >
      <div
        
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
         
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          M. Khurana
          <span style={{ color: "var(--accent-terracotta)" }}>.</span>
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {links.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.85rem",
              }}
            >
              <IconRenderer name={icon} size={14} />
              {label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "48px",
            height: "2px",
            background: "var(--accent-terracotta)",
            borderRadius: "2px",
          }}
        />

        {/* Credit lines */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            textAlign: "center",
            lineHeight: "1.7",
          }}
        >
          {profile.name} · PhD Researcher · University of Delhi
        </p>

        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}