import { Mail, BookOpen, FlaskConical } from "lucide-react";

// Custom SVG (brand icons)
export function LinkedinIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 
      5v14c0 2.761 2.239 5 5 5h14c2.761 
      0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 
      19h-3v-10h3v10zm-1.5-11.268c-.966 
      0-1.75-.79-1.75-1.764s.784-1.764 
      1.75-1.764 1.75.79 1.75 1.764-.784 
      1.764-1.75 1.764zm13.5 
      11.268h-3v-5.604c0-1.337-.027-3.061-1.865-3.061-1.865 
      0-2.151 1.455-2.151 2.963v5.702h-3v-10h2.881v1.367h.041c.401-.761 
      1.381-1.561 2.843-1.561 3.039 0 3.6 2.002 3.6 4.604v5.59z"/>
    </svg>
  );
}

// Central registry
export const Icons = {
  email: Mail,
  scholar: BookOpen,
  researchgate: FlaskConical,
  linkedin: LinkedinIcon,
};