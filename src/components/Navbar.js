"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Research", href: "#research" },
    { label: "Publications", href: "#publications" },
    { label: "Timeline", href: "#pub-timeline" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(250,247,242,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      {/* logo */}
      <a href="#" className="link" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
        M<span style={{ color: "var(--accent-terracotta)" }}>.</span>Khurana
      </a>

      {/* desktop links */}
      <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map((link) => (
          <a key={link.label} href={link.href} className="link">
            {link.label}
          </a>
        ))}
        <a
          href={profile.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-btn"
        >
          Google Scholar
        </a>
      </div>

      {/* mobile button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn">
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}