import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Raphael Diniz | Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#38bdf8",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Desenvolvedor Full Stack
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 24,
            lineHeight: 1.1,
          }}
        >
          Raphael Diniz
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Next.js • TypeScript • PostgreSQL & Supabase • Workers & Filas • Segurança de Dados
        </div>
      </div>
    ),
    { ...size }
  );
}
