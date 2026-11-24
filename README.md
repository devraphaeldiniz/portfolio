# Portfólio · Raphael Diniz

Site pessoal publicado em **[devraphaeldiniz.com.br](https://www.devraphaeldiniz.com.br)**. Reúne meus projetos de backend e fullstack, com uma página de estudo de caso para cada um (arquitetura, trecho de código, desafios e links para o repositório e a demo).

## O que tem no site

- **AstaCar em destaque**: locadora de veículos no ar ([demo](https://rentalcar-eight.vercel.app) · [código](https://github.com/devraphaeldiniz/rentalcar)), com métricas de testes, Lighthouse e segurança.
- **Projetos**: Nexus Shop, E-commerce Backend com Supabase, Fintech Core Engine, Gerador de Planos de Aula com IA, WhatsApp Disparador e Jitterbit Orders API.
- **Experiência e Sobre mim**: a transição de compras e logística para o desenvolvimento.
- **Contato**: WhatsApp, e-mail, LinkedIn e currículo em PDF.

## Stack

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Deploy na Vercel

## Decisões técnicas

- **Páginas estáticas (SSG)**: cada estudo de caso é gerado no build com `generateStaticParams`, então o site carrega rápido e não depende de servidor.
- **Dados em um só lugar**: todos os projetos ficam em `lib/projects.ts`; a home, as páginas de detalhe e o sitemap leem dali.
- **Fonte própria**: Geist servida pelo próprio site com `next/font/local`, sem requisição a serviços externos.
- **SEO**: metadata por página, `sitemap.xml`, `robots.txt` e imagem Open Graph gerada dinamicamente.
- **Acessibilidade**: navegação por âncoras, cards de projeto como links reais (abrem em nova aba e funcionam no teclado) e textos alternativos em todas as imagens.

## Estrutura

```
app/
  page.tsx                 página inicial
  projetos/[slug]/page.tsx estudo de caso de cada projeto
  fonts/                   fontes Geist (self-hosted)
  sitemap.ts, robots.ts, opengraph-image.tsx
components/
  astacar-spotlight.tsx    destaque do projeto principal
lib/
  projects.ts              dados dos projetos
```

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Contato

[LinkedIn](https://linkedin.com/in/devraphaeldiniz) · [GitHub](https://github.com/devraphaeldiniz) · devraphaeldiniz@gmail.com
