"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ExternalLink, ArrowRight, MessageCircle } from "lucide-react";
import { projectsData } from "@/lib/projects";

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
  const whatsappUrl = "https://wa.me/5531994402252?text=Ol%C3%A1%20Raphael,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans relative">
      {/* Botão Flutuante do WhatsApp */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-xl shadow-emerald-900/30 hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <section className="space-y-6 pb-20 border-b border-slate-800">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Disponível para novas oportunidades
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
            <span className="text-white font-medium">Desenvolvedor Full Stack</span> especializado em arquitetura de dados relacional, aplicações modernas em Next.js, autenticação de alta segurança e microsserviços assíncronos.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-all shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" /> Chamar no WhatsApp
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
              href="https://github.com/devraphaeldiniz" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white text-sm font-medium transition-all"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a 
              href="mailto:raphaelaloisiodiniz@gmail.com" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4" /> E-mail
            </a>
          </motion.div>
        </section>

        {/* Tecnologias */}
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

        {/* Projetos com link para página detalhada */}
        <section className="py-20 space-y-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Projetos em Destaque</h2>
            <p className="text-slate-400 text-sm mt-1">Clique em qualquer projeto para conferir arquitetura, decisões técnicas e métricas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((proj, idx) => (
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

                  <Link href={`/projetos/${proj.slug}`}>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {proj.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {proj.shortDescription}
                  </p>

                  <ul className="space-y-2 py-2 border-y border-slate-800/60 my-4">
                    {proj.highlights.slice(0, 3).map((highlight, hIdx) => (
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
                  <Link 
                    href={`/projetos/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Ver Estudo de Caso Completo →
                  </Link>
                  {proj.demo && (
                    <a 
                      href={proj.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors ml-auto"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Raphael Diniz. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp</a>
            <a href="https://github.com/devraphaeldiniz" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/devraphaeldiniz" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
