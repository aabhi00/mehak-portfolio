import "./globals.css";

export const metadata = {
  title: "Mehak Khurana — Chemistry Research Portfolio",
  description:
    "PhD Research Scholar at University of Delhi specializing in Metal-Organic Frameworks, heterogeneous catalysis, and green organic synthesis.",
  keywords:
    "MOF, graphene oxide, heterogeneous catalysis, green chemistry, organic synthesis, University of Delhi",
  openGraph: {
    title: "Mehak Khurana — Chemistry Research Portfolio",
    description:
      "Designing sustainable catalytic systems — from Metal-Organic Frameworks to Green Organic Synthesis.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}