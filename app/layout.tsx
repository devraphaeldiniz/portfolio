import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devraphaeldiniz.com.br"),
  title: {
    default: "Raphael Diniz | Desenvolvedor Full Stack",
    template: "%s | Raphael Diniz",
  },
  description:
    "Portfólio de Raphael Diniz — Desenvolvedor Full Stack especializado em Next.js, TypeScript, arquitetura de dados e sistemas distribuídos.",
  keywords: [
    "Raphael Diniz",
    "desenvolvedor full stack",
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
    title: "Raphael Diniz | Desenvolvedor Full Stack",
    description:
      "Portfólio de Raphael Diniz — Engenharia de software, arquitetura de dados e sistemas confiáveis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Diniz | Desenvolvedor Full Stack",
    description: "Portfólio profissional de Raphael Diniz.",
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
