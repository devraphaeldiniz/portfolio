import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devraphaeldiniz.com.br"),
  title: {
    default: "Raphael Diniz | Desenvolvedor Backend/Fullstack",
    template: "%s | Raphael Diniz",
  },
  description:
    "Portfólio de Raphael Diniz, desenvolvedor backend/fullstack com Node.js, TypeScript e PostgreSQL. Criador do AstaCar, plataforma de aluguel de carros em produção.",
  keywords: [
    "Raphael Diniz",
    "desenvolvedor backend júnior",
    "Node.js",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "arquitetura de software",
  ],
  authors: [{ name: "Raphael Diniz", url: "https://github.com/devraphaeldiniz" }],
  creator: "Raphael Diniz",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.devraphaeldiniz.com.br",
    siteName: "Raphael Diniz",
    title: "Raphael Diniz | Desenvolvedor Backend/Fullstack",
    description:
      "Portfólio de Raphael Diniz, desenvolvedor backend/fullstack com Node.js, TypeScript e PostgreSQL. Criador do AstaCar, plataforma de aluguel de carros em produção.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Diniz | Desenvolvedor Backend/Fullstack",
    description: "Portfólio de Raphael Diniz, desenvolvedor backend/fullstack. Criador do AstaCar, plataforma de aluguel de carros em produção.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
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
