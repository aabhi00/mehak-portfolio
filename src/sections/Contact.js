"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Mail, Link, BookOpen, FlaskConical, Send, CheckCircle, AlertCircle } from "lucide-react";
import { profile } from "../data";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "terracotta",
  },
  {
    icon: <Link />,
    label: "LinkedIn",
    value: "dr-mehak-khurana",
    href: profile.linkedin,
    color: "blue",
  },
  {
    icon: BookOpen,
    label: "Google Scholar",
    value: "Scholar Profile",
    href: profile.scholar,
    color: "sage",
  },
  {
    icon: FlaskConical,
    label: "ResearchGate",
    value: "ResearchGate Profile",
    href: profile.researchgate,
    color: "terracotta",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("subject", form.subject);
    formData.append("message", form.message);

    const res = await fetch(profile.formspree, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch (err) {
    setStatus("error");
  }
};

  return (
    <section id="contact" ref={ref} style={{ padding: "100px 0", background: "var(--bg-secondary)" }}>
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title" style={{ marginTop: "12px" }}>
            Contact
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "500px", margin: "16px auto 0" }}>
            Interested in collaborations, questions about my research, or academic inquiries?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div
          // Changed grid to 1fr 1fr to perfectly balance the left and right sides
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start", maxWidth: "1000px", margin: "0 auto" }}
          className="contact-grid"
        >


            
          {/* LEFT — Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 style={{ fontSize: "2rem", fontWeight: 650, color: "var(--text-primary)", marginBottom: "28px" }}>
              Connect with me
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "18px 20px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: `var(--accent-${color}-light)`,
                        border: `1px solid var(--accent-${color}-border)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {/* <Icon size={18} color={`var(--accent-${color})`} /> */}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontWeight: 600, marginBottom: "2px" }}>
                        {label}
                      </p>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 500 }}>
                        {value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
            // Shrunk padding from 40px to 24px to make the form less bulky
            style={{ padding: "24px" }} 
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "28px" }}>
              Send a message
            </h3>

            {status === "success" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  padding: "40px 20px",
                  textAlign: "center",
                }}
              >
                <CheckCircle size={48} color="var(--accent-sage)" />
                <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                  Message sent!
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <button className="btn-outline" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <div>
                {/* Reset this inner row to 1fr 1fr for cleaner balance inside the smaller form */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }} className="form-row">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      className="form-input"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label className="form-label">Subject</label>
                  <input
                    className="form-input"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Research collaboration, question..."
                    required
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your inquiry..."
                    rows={4}
                    required
                    style={{ resize: "vertical", minHeight: "100px" }}
                  />
                </div>

                {status === "error" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      fontSize: "0.85rem",
                      color: "#dc2626",
                    }}
                  >
                    <AlertCircle size={15} />
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: status === "loading" ? 0.7 : 1,
                    padding: "12px",
                  }}
                >
                  {status === "loading" ? "Sending..." : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}