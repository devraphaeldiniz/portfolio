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
  architectureDiagram: string;
  architecture: string[];
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
  challenges: { problem: string; solution: string }[];
}

export const projectsData: DetailedProject[] = [
  {
    slug: "ecommerce-supabase",
    title: "E-commerce Backend & Infra",
    category: "Back-end & Arquitetura de Dados",
    shortDescription: "Infraestrutura de banco e APIs para e-commerce corporativo com foco em segurança granular e performance analítica.",
    fullDescription: "Solução de infraestrutura completa para comércio eletrônico utilizando PostgreSQL e Supabase. Projetado para alta integridade relacional, isolamento de privilégios e auditoria em tempo real.",
    tags: ["PostgreSQL", "Supabase", "Row Level Security", "RBAC", "Docker", "CI/CD"],
    github: "https://github.com/devraphaeldiniz/ecommerce-supabase",
    highlights: [
      "Controle de acesso granular (RBAC) em 4 níveis estritos",
      "Políticas de Row Level Security (RLS) aplicadas a 100% das tabelas",
      "35+ índices estratégicos (B-Tree, GIN) para otimização de queries",
      "6 views operacionais e 3 materialized views para agregação contínua",
      "27 testes automatizados cobrindo segurança, integridade e concorrência"
    ],
    architectureDiagram: `[Client Request]
       │
       ▼
[Supabase API / PostgREST]
       │
       ├──► [JWT Auth Validation]
       │
       ▼
[PostgreSQL Database Engine]
       ├──► [RLS Policies: auth.uid() = customer_id]
       ├──► [RBAC Role Verification]
       └──► [Triggers: Audit Logs & Materialized Views]`,
    architecture: [
      "Database: PostgreSQL com schemas isolados e triggers de auditoria",
      "Segurança: Políticas RLS vinculadas a claims do JWT para isolamento por tenant/usuário",
      "Pipeline: GitHub Actions validando migrações SQL e suíte de testes de integridade"
    ],
    codeSnippet: {
      title: "Política RLS Granular com Validação RBAC",
      language: "sql",
      code: `CREATE POLICY "admin_and_staff_access_orders"
ON orders
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'staff')
  )
  OR auth.uid() = customer_id
);`
    },
    challenges: [
      {
        problem: "Garantir isolamento total de dados entre clientes e operadores no acesso direto ao banco via PostgREST.",
        solution: "Configuração de Row Level Security (RLS) restritiva combinando checagens de roles e tokens autenticados."
      },
      {
        problem: "Lentidão nas consultas de relatórios operacionais consolidados.",
        solution: "Criação de Materialized Views com rotina de atualização assíncrona para cálculos pesados de RFM e receita."
      }
    ]
  },
  {
    slug: "plano-aula-ia",
    title: "Gerador de Planos de Aula com IA",
    category: "Full Stack & IA Generativa",
    shortDescription: "Plataforma de criação automatizada de planos pedagógicos alinhados à BNCC, utilizando LLMs com validação de esquema rígida em runtime.",
    fullDescription: "Aplicação full stack moderna que conecta o ecossistema educacional às capacidades de IA generativa do Google Gemini 2.5 Flash, gerando planos estruturados conforme diretrizes da Base Nacional Comum Curricular (BNCC).",
    tags: ["Next.js 14", "TypeScript", "Google Gemini API", "Tailwind CSS", "Zod", "Supabase"],
    github: "https://github.com/devraphaeldiniz/plano-aula-ia",
    demo: "https://plano-aula-4i0xhojbb-raphaels-projects-004b90a9.vercel.app",
    highlights: [
      "Integração direta com Google Gemini 2.5 Flash via Server Actions",
      "Validação ponta a ponta com schemas Zod garantindo tipagem forte em runtime",
      "Estratégia de retries automatizados com ajuste adaptativo de temperatura",
      "Persistência estruturada em PostgreSQL com suporte a campos JSONB",
      "Interface responsiva e minimalista construída com Tailwind CSS"
    ],
    architectureDiagram: `[Next.js Client] ──► [Server Action] ──► [Zod Input Validation]
                                               │
                                               ▼
                                      [Gemini 2.5 Flash API]
                                               │
                                               ▼
[PostgreSQL Database] ◄── [Safe Parsing] ◄── [Response Normalizer]`,
    architecture: [
      "Frontend: Next.js 14 (App Router) com React Hook Form",
      "Validação: Zod garantindo imunidade a payloads malformados ou incompletos da LLM",
      "Serviço de IA: SDK Gemini com pipeline de sanitização de blocos markdown e regex"
    ],
    codeSnippet: {
      title: "Pipeline de Validação e Sanitização de LLM com Zod",
      language: "typescript",
      code: `const PlanSchema = z.object({
  tema: z.string().min(3),
  habilidadesBNCC: z.array(z.string()),
  metodologia: z.string().min(20),
  recursos: z.array(z.string())
});

export async function parseGeminiResponse(rawText: string) {
  const sanitized = rawText.replace(/\`\`\`json|\`\`\`/g, "").trim();
  const parsedJson = JSON.parse(sanitized);
  return PlanSchema.parse(parsedJson);
}`
    },
    challenges: [
      {
        problem: "Variação na estrutura JSON devolvida pelo modelo de linguagem em requisições consecutivas.",
        solution: "Criação de parser intermediário com sanitização de formatação e fallback automático com temperatura restritiva."
      },
      {
        problem: "Falhas de tipagem estrita no processo de build em produção.",
        solution: "Refatoração dos blocos de captura de erro do Zod para runtime typesafe defensivo."
      }
    ]
  },
  {
    slug: "rentalcar",
    title: "RentalCar - Locação Enterprise",
    category: "Full Stack & Segurança Corporativa",
    shortDescription: "Sistema web escalável para gestão de frota e locações com camadas avançadas de autenticação multifator e monitoramento em tempo real.",
    fullDescription: "Plataforma corporativa de locação de veículos desenhada com arquitetura de alta segurança, cobrindo autenticação multifator (2FA), auditoria de acessos e painel analítico administrativo.",
    tags: ["Next.js 15", "TypeScript", "Nhost", "GraphQL", "Shadcn/ui", "PostgreSQL"],
    github: "https://github.com/devraphaeldiniz/rentalcar",
    highlights: [
      "Autenticação de dois fatores (2FA / TOTP) compatível com autenticadores padrão",
      "Proteção contra força bruta com Rate Limiting granular em rotas sensíveis",
      "Sistema de auditoria (Audit Logs) rastreando IP, User-Agent e timestamps",
      "Painel administrativo executivo com dashboards em tempo real",
      "Gerenciamento e revogação remota de sessões ativas"
    ],
    architectureDiagram: `[Next.js App Router] ──► [Auth Middleware (Rate Limit)]
                                │
                                ▼
                       [Hasura GraphQL Engine]
                                │
                                ├──► [JWT Validation & 2FA State]
                                │
                                ▼
                       [PostgreSQL 15 Cluster]
                                └──► [Audit Logs Table (Triggers)]`,
    architecture: [
      "Framework: Next.js 15 com TypeScript e Tailwind CSS",
      "Dados & BaaS: Hasura GraphQL conectado ao PostgreSQL 15 via Nhost",
      "Criptografia: bcryptjs com salt rounds configurados e TOTP baseado em chaves temporais"
    ],
    codeSnippet: {
      title: "Middleware de Verificação de 2FA e Sessão",
      language: "typescript",
      code: `export async function verifyUserSession(session: UserSession) {
  if (!session.isValid) throw new Error("Sessão expirada");
  if (session.requires2FA && !session.is2FAVerified) {
    return { status: "REQUIRES_MFA", redirect: "/auth/verify-mfa" };
  }
  return { status: "AUTHORIZED", user: session.user };
}`
    },
    challenges: [
      {
        problem: "Mitigar ataques automatizados de força bruta em endpoints de login.",
        solution: "Middleware com limitação de requisições persistido em banco para bloquear origens abusivas."
      },
      {
        problem: "Sincronização de estados em dashboards com alta frequência de atualizações.",
        solution: "Implementação de queries GraphQL otimizadas associadas a Server Components do Next.js."
      }
    ]
  },
  {
    slug: "whatsapp-disparador",
    title: "WhatsApp Disparador & Worker",
    category: "Back-end & Processamento Assíncrono",
    shortDescription: "Motor de mensageria com fila assíncrona desacoplada e persistida em banco, garantindo tolerância a falhas sem dependência de memória volátil.",
    fullDescription: "Motor de mensageria assíncrono para envios em escala. Toda a lógica de filas opera de forma desacoplada do ciclo de vida das rotas HTTP, suportando reinicializações sem perda de tarefas.",
    tags: ["Node.js", "Express", "SQLite", "Workers", "WPPConnect", "REST API"],
    github: "https://github.com/devraphaeldiniz/whatsapp-disparador",
    highlights: [
      "Fila assíncrona 100% persistida em disco através de SQLite",
      "Worker em background desacoplado da camada de controllers da API",
      "Algoritmo de concorrência com jitter aleatório para prevenção de bans",
      "Mecanismo automático de retentativas para mensagens rejeitadas",
      "Modo mock nativo para baterias de testes em ambientes de CI"
    ],
    architectureDiagram: `[HTTP Requests] ──► [Express Controller] ──► [Insert Job: PENDING]
                                                        │
                                                        ▼
                                              [SQLite Queue Table]
                                                        │
                                                        ▼
                                              [Background Worker Loop]
                                                        │
                                                        ├──► [Random Delay Jitter]
                                                        ▼
                                              [WPPConnect WhatsApp API]`,
    architecture: [
      "Backend: Node.js e Express expondo rotas REST",
      "Banco: SQLite com driver nativo operando em transações atômicas",
      "Fila: Scheduler baseado em timestamps e estados ('pending', 'processing', 'completed')"
    ],
    codeSnippet: {
      title: "Worker Contínuo com Transação Atômica",
      language: "typescript",
      code: `async function processNextJob() {
  const job = db.prepare(\`
    UPDATE queue 
    SET status = 'processing', updated_at = ? 
    WHERE id = (SELECT id FROM queue WHERE status = 'pending' LIMIT 1)
    RETURNING *
  \`).get(Date.now());

  if (!job) return;
  await dispatchMessage(job);
}`
    },
    challenges: [
      {
        problem: "Garantir integridade da fila de envios mesmo se o container cair.",
        solution: "Toda alteração de estado é persistida atomicamente no SQLite, permitindo retomada imediata pós-crash."
      },
      {
        problem: "Evitar bloqueios na plataforma de mensageria provocados por envios rítmicos.",
        solution: "Algoritmo de cálculo de delay não linear e distribuição randômica de intervalos."
      }
    ]
  }
];
