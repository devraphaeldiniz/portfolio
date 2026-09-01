"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

// Ícones SVG Inline para evitar problemas de compatibilidade de pacotes
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "E-commerce Backend & Infra",
    category: "Back-end & Arquitetura de Dados",
    description: "Infraestrutura completa de banco de dados e APIs para e-commerce corporativo com foco em segurança granular e performance analítica.",
    tags: ["PostgreSQL", "Supabase", "Row Level Security", "RBAC", "Docker", "CI/CD"],
    github: "https://github.com/devraphaeldiniz/ecommerce-supabase",
    highlights: [
      "Controle de acesso granular (RBAC) em 4 níveis e políticas RLS completas",
      "35+ índices estratégicos, 6 views e 3 materialized views para analytics",
      "27 testes automatizados e pipeline integrado com GitHub Actions"
    ]
  },
  {
    title: "Gerador de Planos de Aula com IA",
    category: "Full Stack & IA Generativa",
    description: "Plataforma de criação automatizada de planos pedagógicos alinhados à BNCC, utilizando LLMs com validação de esquema rígida em runtime.",
    tags: ["Next.js 14", "TypeScript", "Google Gemini API", "Tailwind CSS", "Zod", "Supabase"],
    github: "https://github.com/devraphaeldiniz/plano-aula-ia",
    demo: "https://plano-aula-4i0xhojbb-raphaels-projects-004b90a9.vercel.app",
    highlights: [
      "Integração com Gemini 2.5 Flash para geração contextual em tempo real",
      "Validação robusta com schemas Zod e estratégia de retry inteligente",
      "Persistência em PostgreSQL estruturado com suporte a JSONB"
    ]
  },
  {
    title: "RentalCar - Locação Enterprise",
    category: "Full Stack & Segurança Corporativa",
    description: "Sistema web escalável para gestão de frota e locações com camadas avançadas de autenticação multifator e monitoramento em tempo real.",
    tags: ["Next.js 15", "TypeScript", "Nhost", "GraphQL", "Shadcn/ui", "PostgreSQL"],
    github: "https://github.com/devraphaeldiniz/rentalcar",
    highlights: [
      "Autenticação de 2 fatores (2FA / TOTP) com suporte a QR Code e backup keys",
      "Auditoria completa de logs (Audit Trail) e proteção contra brute force (Rate Limiting)",
      "Painel administrativo executivo com dashboards de métricas em tempo real"
    ]
  },
  {
    title: "WhatsApp Disparador & Worker",
    category: "Back-end & Processamento Assíncrono",
    description: "Motor de mensageria com fila assíncrona desacoplada e persistida em banco, garantindo tolerância a falhas sem dependência de memória volátil.",
    tags: ["Node.js", "Express", "SQLite", "Workers", "WPPConnect", "REST API"],
    github: "https://github.com/devraphaeldiniz/whatsapp-disparador",
    highlights: [
      "Arquitetura baseada em worker contínuo e fila persistida em SQLite",
      "Controle de concorrência com retries automáticos e cálculo de delays",
      "Modo mock nativo para execução e testes de integração sem instâncias ativas"
    ]
  }
];

const skills = [
  { name: "TypeScript / JavaScript", category: "Linguagens" },
  { name: "Next.js 14 / 15 (App Router)", category: "Front-end" },
  { name: "React & Tailwind CSS", category: "Front-end" },
  { name: "Node.js & Express", category: "Back-end" },
  { name: "PostgreSQL & Supabase", category: "Banco de Dados" },
  { name: "Row Level Security (RLS) & RBAC", category: "Segurança" },
  { name: "Docker & CI/CD", category: "DevOps" },
  { name: "Arquitetura com Workers & Filas", category: "Engenharia" }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <section className="space-y-6 pb-20 border-b border-slate-800">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Disponível para novos projetos e oportunidades
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Raphael Diniz
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-slate-400 max-w-3xl font-light leading-relaxed"
          >
            <span className="text-white font-medium">Desenvolvedor Full Stack</span> especializado em arquitetura de dados relacional, aplicações modernas em Next.js, autenticação de alta segurança e processamento assíncrono.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a 
              href="https://github.com/devraphaeldiniz" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white text-sm font-medium transition-all"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a 
              href="https://linkedin.com/in/devraphaeldiniz" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-600/20"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
            <a 
              href="mailto:raphaelaloisiodiniz@gmail.com" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4" /> Contato Direto
            </a>
          </motion.div>
        </section>

        <section className="py-16 border-b border-slate-800">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-8">
            Domínio Técnico & Tecnologias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="text-xs text-blue-400 font-medium mb-1">{skill.category}</div>
                <div className="text-sm font-semibold text-slate-200">{skill.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 space-y-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Projetos em Destaque</h2>
            <p className="text-slate-400 text-sm mt-1">Aplicações reais com foco em engenharia, segurança e dados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-400 font-semibold uppercase tracking-wider">{proj.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>

                  <ul className="space-y-2 py-2 border-y border-slate-800/60 my-4">
                    {proj.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-blue-500 font-bold mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-slate-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-800/60">
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" /> Código Fonte
                  </a>
                  {proj.demo && (
                    <a 
                      href={proj.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors ml-auto"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="pt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Raphael Diniz. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="https://github.com/devraphaeldiniz" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/devraphaeldiniz" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="mailto:raphaelaloisiodiniz@gmail.com" className="hover:text-slate-400 transition-colors">E-mail</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
