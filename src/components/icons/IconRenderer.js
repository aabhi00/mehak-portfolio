import { Icons } from "./index";

export default function IconRenderer({ name, size = 16 }) {
  const Icon = Icons[name];

  // Fallback if icon missing
  if (!Icon) {
    console.warn(`Icon "${name}" not found`);
    return <span style={{ width: size }} />; // empty placeholder
  }

  return <Icon size={size} />;
}