export interface DetailedProject {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  github: string;
  demo?: string;
  highlights: string[];
  architecture: string[];
  challenges: { problem: string; solution: string }[];
}

export const projectsData: DetailedProject[] = [
  {
    slug: "ecommerce-supabase",
    title: "E-commerce Backend & Infra",
    category: "Back-end & Arquitetura de Dados",
    shortDescription: "Infraestrutura completa de banco de dados e APIs para e-commerce corporativo com foco em segurança granular e performance analítica.",
    fullDescription: "Solução de infraestrutura completa para comércio eletrônico utilizando PostgreSQL e recursos de ponta do Supabase. O projeto foi projetado com foco em alta disponibilidade, integridade relacional, segurança de dados em nível de linha e conformidade com padrões de auditoria corporativa.",
    tags: ["PostgreSQL", "Supabase", "Row Level Security", "RBAC", "Docker", "CI/CD"],
    github: "https://github.com/devraphaeldiniz/ecommerce-supabase",
    highlights: [
      "Controle de acesso granular (RBAC) em 4 níveis (Customer, Staff, Admin, Super Admin)",
      "Políticas de Row Level Security (RLS) implementadas em 100% das tabelas",
      "35+ índices estratégicos para otimização de leitura e escrita",
      "6 views operacionais e 3 materialized views para analytics em tempo real",
      "27 testes automatizados cobrindo segurança, integridade e regras de negócio"
    ],
    architecture: [
      "Database: PostgreSQL com schemas relacionais estritos e triggers de auditoria",
      "Edge Functions: Processamento de webhooks e geração/exportação assíncrona de relatórios",
      "CI/CD: Pipeline no GitHub Actions executando migrations e suíte de testes a cada push"
    ],
    challenges: [
      {
        problem: "Garantir isolamento absoluto de dados entre clientes e administradores em consultas diretas.",
        solution: "Configuração de políticas RLS restritivas vinculadas ao auth_uid e tabela de roles de usuários."
      },
      {
        problem: "Quedas de performance em consultas consolidadas para relatórios gerenciais.",
        solution: "Criação de Materialized Views com rotina de atualização automática para métricas diárias e RFM."
      }
    ]
  },
  {
    slug: "plano-aula-ia",
    title: "Gerador de Planos de Aula com IA",
    category: "Full Stack & IA Generativa",
    shortDescription: "Plataforma de criação automatizada de planos pedagógicos alinhados à BNCC, utilizando LLMs com validação de esquema rígida em runtime.",
    fullDescription: "Aplicação full stack moderna que conecta o ecossistema educacional às capacidades de IA generativa do Google Gemini 2.5 Flash. Permite a educadores gerar planos de aula estruturados e prontos para sala de aula conforme diretrizes da Base Nacional Comum Curricular (BNCC).",
    tags: ["Next.js 14", "TypeScript", "Google Gemini API", "Tailwind CSS", "Zod", "Supabase"],
    github: "https://github.com/devraphaeldiniz/plano-aula-ia",
    demo: "https://plano-aula-4i0xhojbb-raphaels-projects-004b90a9.vercel.app",
    highlights: [
      "Integração de baixa latência com Google Gemini 2.5 Flash",
      "Validação ponta a ponta com schemas Zod garantindo JSON uniforme",
      "Estratégia de retries automatizados com variação de temperatura de amostragem",
      "Persistência estruturada em PostgreSQL com colunas JSONB indexadas",
      "Interface responsiva, acessível e otimizada via Tailwind CSS"
    ],
    architecture: [
      "Frontend & Backend: Next.js 14 utilizando App Router e Route Handlers nativos",
      "Validação de Dados: Zod tanto no cliente (React Hook Form) quanto nas APIs de servidor",
      "Inteligência Artificial: Gemini SDK com sanitização contra delimitações indesejadas de markdown"
    ],
    challenges: [
      {
        problem: "Variação na estrutura JSON devolvida pelo modelo de linguagem em requisições consecutivas.",
        solution: "Criação de pipeline de parsing com sanitização regex e fallback de retry com temperatura mais restritiva."
      },
      {
        problem: "Falhas de tipagem estrita no processo de build em produção.",
        solution: "Refatoração dos blocos de captura de erro do Zod para runtime typesafe."
      }
    ]
  },
  {
    slug: "rentalcar",
    title: "RentalCar - Locação Enterprise",
    category: "Full Stack & Segurança Corporativa",
    shortDescription: "Sistema web escalável para gestão de frota e locações com camadas avançadas de autenticação multifator e monitoramento em tempo real.",
    fullDescription: "Plataforma corporativa de gestão de frotas, reservas e pagamentos construída sob as mais rigorosas diretrizes de segurança de software corporativo. Oferece desde catálogo dinâmico de veículos até controle administrativo com auditoria de eventos em tempo real.",
    tags: ["Next.js 15", "TypeScript", "Nhost", "GraphQL", "Shadcn/ui", "PostgreSQL"],
    github: "https://github.com/devraphaeldiniz/rentalcar",
    highlights: [
      "Autenticação de dois fatores (2FA/TOTP) compatível com Google Authenticator",
      "Proteção contra força bruta com Rate Limiting (5 tentativas a cada 15 minutos)",
      "Sistema de auditoria (Audit Logs) com retenção e rastreamento de IP e User-Agent",
      "Painel administrativo executivo com métricas financeiras e de frota em tempo real",
      "Gerenciamento de sessões ativas simultâneas com revogação remota"
    ],
    architecture: [
      "Stack Web: Next.js 15 com App Router, TypeScript e Tailwind CSS",
      "BaaS & Dados: Nhost integrando Hasura GraphQL Engine e PostgreSQL 15",
      "Segurança Criptográfica: bcryptjs com 10 salt rounds e tokens JWT com rotação automática"
    ],
    challenges: [
      {
        problem: "Mitigação de tentativas automatizadas de invasão de credenciais.",
        solution: "Implementação de middleware de rate limiting com persistência de tentativas em tabela relacional."
      },
      {
        problem: "Manter sincronia de estados em um painel administrativo com alto fluxo de dados.",
        solution: "Uso de queries GraphQL otimizadas e Server Components com renderização sob demanda."
      }
    ]
  },
  {
    slug: "whatsapp-disparador",
    title: "WhatsApp Disparador & Worker",
    category: "Back-end & Processamento Assíncrono",
    shortDescription: "Motor de mensageria com fila assíncrona desacoplada e persistida em banco, garantindo tolerância a falhas sem dependência de memória volátil.",
    fullDescription: "Sistema de backend voltado para automação e sequenciamento de mensagens em massa. Toda a arquitetura foi desenhada para operar de maneira desacoplada de conexões HTTP e do ciclo de vida da interface, garantindo que reinicializações do servidor não interrompam filas.",
    tags: ["Node.js", "Express", "SQLite", "Workers", "WPPConnect", "REST API"],
    github: "https://github.com/devraphaeldiniz/whatsapp-disparador",
    highlights: [
      "Fila assíncrona 100% persistida em disco através de SQLite",
      "Worker em background desacoplado da camada de controllers da API",
      "Controle de concorrência com delays randômicos para evitar bloqueios",
      "Rotina automática de retentativas para mensagens não entregues",
      "Modo mock nativo para execução em ambientes de CI e testes locais"
    ],
    architecture: [
      "Servidor: Node.js e Express expondo rotas REST para campanhas e importação CSV",
      "Banco de Dados: better-sqlite3 operando em modo síncrono e de alta velocidade",
      "Mecanismo de Fila: Scheduler baseado em datas futuras sem consumo volátil de memória"
    ],
    challenges: [
      {
        problem: "Risco de perda de fila de mensagens em caso de queda do container ou processo.",
        solution: "Persistência do status da fila e controle da próxima execução exclusivamente via timestamps em banco."
      },
      {
        problem: "Bloqueios decorrentes de envios em intervalos rígidos.",
        solution: "Algoritmo de delay aleatório distribuído entre o limite mínimo e máximo configurado."
      }
    ]
  }
];
