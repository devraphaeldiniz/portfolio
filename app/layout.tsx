import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raphael Diniz | Software Developer",
  description: "Portfólio de Raphael Diniz — Desenvolvedor Full Stack focado em Next.js, TypeScript, segurança de dados e microsserviços.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
