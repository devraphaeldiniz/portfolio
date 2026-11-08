"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { projectsData } from "@/lib/projects";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const points = [
  "Preço calculado no servidor e pagamento pelo Mercado Pago",
  "PostgreSQL impede overbooking com constraint EXCLUDE",
  "CNH conferida, contrato em PDF e vistoria na devolução",
  "Painel admin com agenda, funil, preços e monitoramento",
];

const thumbs = [
  { src: "/projetos/astacar/04-checkout.jpg", label: "Checkout" },
  { src: "/projetos/astacar/08-admin-funil.jpg", label: "Funil" },
  { src: "/projetos/astacar/10-admin-agenda.jpg", label: "Agenda" },
];

export default function AstaCarSpotlight() {
  const project = projectsData.find((p) => p.slug === "rentalcar");
  if (!project) return null;

  return (
    <section id="astacar" aria-labelledby="astacar-title" className="py-20 border-b border-slate-800 scroll-mt-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-px bg-gradient-to-br from-blue-500/70 via-cyan-400/30 to-slate-800"
      >
        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent blur-3xl" aria-hidden="true" />

        <div className="relative overflow-hidden rounded-3xl bg-slate-950/95 p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            {/* Texto */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" /> Projeto principal
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> No ar
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Image src="/projetos/astacar/logo.svg" alt="" width={56} height={56} className="h-14 w-14 rounded-2xl shadow-lg shadow-blue-600/30" />
                <div>
                  <h2 id="astacar-title" className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                    AstaCar
                  </h2>
                  <p className="text-sm text-slate-400">Locadora de veículos full stack, do catálogo ao painel admin</p>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed">
                Um produto completo e publicado: o cliente reserva com proteções, opcionais e cupom, paga online e vê cada centavo do preço;
                o admin gerencia frota, temporadas, vistorias e bloqueios de manutenção e acompanha o funil e os erros do site.
              </p>

              <ul className="grid gap-2 sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {project.metrics && (
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="text-2xl font-bold text-white">{m.value}</dd>
                      <dd className="text-[11px] leading-tight text-slate-400">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.03] hover:shadow-cyan-500/30"
                  >
                    <ExternalLink className="h-4 w-4" /> Testar o AstaCar ao vivo
                  </a>
                )}
                <Link
                  href={`/projetos/${project.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-blue-500/60 hover:bg-slate-800"
                >
                  Estudo de caso <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  <GithubIcon /> Código
                </a>
              </div>
              {project.demo && (
                <p className="text-xs text-slate-400">
                  Sem cadastro:{" "}
                  <a href={`${project.demo}/auth/signin`} target="_blank" rel="noreferrer" className="font-semibold text-cyan-300 underline-offset-2 hover:underline">
                    entre como cliente ou veja o painel do admin
                  </a>{" "}
                  em modo demonstração (só leitura, dados pessoais mascarados).
                </p>
              )}
            </div>

            {/* Prints */}
            <div className="relative">
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir o AstaCar em uma nova aba"
                className="group block overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-blue-950/60 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 truncate rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                    rentalcar-eight.vercel.app
                  </span>
                </div>
                <Image
                  src="/projetos/astacar/01-home.jpg"
                  alt="Página inicial do AstaCar com busca de veículos por categoria"
                  width={800}
                  height={500}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>

              <div className="pointer-events-none absolute -bottom-8 -right-3 hidden w-32 overflow-hidden rounded-2xl border-4 border-slate-800 shadow-2xl shadow-black/60 sm:block lg:-right-6 lg:w-36">
                <Image
                  src="/projetos/astacar/06-celular.jpg"
                  alt="AstaCar no celular"
                  width={804}
                  height={780}
                  sizes="144px"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 sm:pr-32 lg:pr-36">
                {thumbs.map((t) => (
                  <Link
                    key={t.src}
                    href={`/projetos/${project.slug}#galeria`}
                    className="group overflow-hidden rounded-lg border border-slate-800 bg-slate-900 transition-colors hover:border-blue-500/50"
                  >
                    <Image src={t.src} alt={`AstaCar: ${t.label}`} width={800} height={500} sizes="160px" className="h-auto w-full opacity-80 transition-opacity group-hover:opacity-100" />
                    <span className="block px-2 py-1 text-[11px] text-slate-400 group-hover:text-white">{t.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
