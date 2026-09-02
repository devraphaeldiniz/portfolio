import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/lib/projects";
import { ArrowLeft, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Code } from "lucide-react";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navegação Voltar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o início
        </Link>

        {/* Cabeçalho */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {project.fullDescription}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-sm font-medium transition-all"
            >
              Ver Repositório no GitHub
            </a>
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-600/20"
              >
                <ExternalLink className="w-4 h-4" /> Acessar Aplicação (Live Demo)
              </a>
            )}
          </div>
        </header>

        {/* Destaques Técnicos */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-blue-500" /> Destaques de Engenharia
          </h2>
          <div className="grid gap-3">
            {project.highlights.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-sm text-slate-300 flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Diagrama e Arquitetura */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-blue-500" /> Fluxo de Arquitetura
          </h2>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-blue-400 leading-relaxed">
              {project.architectureDiagram}
            </pre>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            {project.architecture.map((arch, idx) => (
              <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                • {arch}
              </p>
            ))}
          </div>
        </section>

        {/* Snippet de Código */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-500" /> Implementação em Código
          </h2>
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{project.codeSnippet.title}</span>
              <span className="uppercase text-blue-400">{project.codeSnippet.language}</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Desafios e Soluções */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-500" /> Desafios Técnicos Resolvidos
          </h2>
          <div className="space-y-4">
            {project.challenges.map((c, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                <h3 className="text-sm font-semibold text-red-400">Desafio:</h3>
                <p className="text-sm text-slate-300">{c.problem}</p>
                <h3 className="text-sm font-semibold text-emerald-400 pt-2">Resolução Implementada:</h3>
                <p className="text-sm text-slate-300">{c.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ação de Contato no Rodapé */}
        <div className="pt-12 border-t border-slate-800 text-center space-y-4">
          <p className="text-sm text-slate-400">Tem interesse em detalhes da arquitetura ou código deste projeto?</p>
          <a 
            href="https://wa.me/5531994402252?text=Ol%C3%A1%20Raphael,%20vi%20seu%20projeto%20no%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-900/20"
          >
            Conversar no WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
