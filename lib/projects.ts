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
    slug: "fintech-core-engine",
    title: "Fintech Core Engine & Ledger",
    category: "Sistemas Distribuídos & Engenharia Financeira",
    shortDescription: "Motor bancário de alta vazão e livro-razão contábil com partidas dobradas, isolamento anti-deadlock e telemetria nativa Prometheus/Grafana.",
    fullDescription: "Core bancário de missão crítica desenvolvido em Go, PostgreSQL e Redis. Projetado para garantir conservação estrita de capital, zero race conditions sob cargas concorrentes extremas, desacoplamento assíncrono via Transactional Outbox Pattern e observabilidade operacional em tempo real.",
    tags: ["Go", "PostgreSQL", "Redis", "Docker", "Prometheus", "Grafana", "Distributed Systems"],
    github: "https://github.com/devraphaeldiniz/fintech-core-engine",
    highlights: [
      "Livro-razão contábil por partidas dobradas (Double-Entry Bookkeeping) estritamente imutável",
      "Snapshots de saldo com leituras em O(1) e liquidação atômica em milissegundos",
      "Travas distribuídas com Spin-Lock e backoff no Redis combinadas a locks léxicos no Postgres para prevenção de deadlocks (AB-BA)",
      "Transactional Outbox Pattern desacoplando disparo de eventos sem risco de dual-write",
      "Rotina autônoma de reconciliação contábil (Nightly Audit) comprovando balanços",
      "Tabela do ledger particionada mensalmente por RANGE no PostgreSQL com auto-provisionamento para 12 meses",
      "Telemetria nativa com métricas Prometheus (/metrics) e dashboard pré-provisionado no Grafana"
    ],
    architectureDiagram: `[Cliente / Gateway de Pagamento]
              │
              ▼ HTTPS (REST + SHA-256 API Key + Idempotency-Key)
    [Fintech Core API (Go)]
              │
              ├──► [Redis Spin-Lock com Jitter] (Fila e contenção distribuída)
              │
              ▼ [PostgreSQL Engine - Transação Atômica]
              ├──► 1. SELECT ... FOR UPDATE (Ordenação léxica dos UUIDs)
              ├──► 2. Inserção imutável no Ledger particionado (DEBIT + CREDIT)
              ├──► 3. Atualização atômica do snapshot de saldo O(1)
              └──► 4. Gravação do evento na tabela outbox_events
                             │
                             ▼ Change Data Capture
                     [Outbox Worker] ──► [Tópicos Assíncronos / Webhooks]`,
    architecture: [
      "Linguagem & Runtime: Go 1.23+ com pgxpool (PostgreSQL nativo) e cliente Redis v9",
      "Isolamento Transacional: Lock pessimista léxico em nível SQL somado a Redis Mutex para contenção inicial",
      "Banco de Dados: PostgreSQL 16 com particionamento declarativo mensal por data (RANGE)",
      "Observabilidade: Instrumentação oficial do Prometheus coletando latência transacional (p95/p99) e vazão contábil"
    ],
    codeSnippet: {
      title: "Transação Atômica com Ordenação Léxica Anti-Deadlock",
      language: "go",
      code: `// Ordenação léxica dos UUIDs para prevenir deadlocks cíclicos (AB-BA)
firstID, secondID := fromID, toID
if firstID.String() > secondID.String() {
    firstID, secondID = toID, fromID
}

// Bloqueio pessimista sequencial no PostgreSQL
if err := lockAccount(ctx, tx, firstID); err != nil {
    return nil, err
}
if err := lockAccount(ctx, tx, secondID); err != nil {
    return nil, err
}

// Verificação de saldo, double-entry e snapshot na mesma transação ACID
if currentBalance < amountCents {
    return nil, domain.ErrInsufficientFunds
}`
    },
    challenges: [
      {
        problem: "Eliminar concorrência destrutiva e saldo negativo quando dezenas de transferências atingem a mesma conta no mesmo milissegundo.",
        solution: "Estratégia híbrida de controle: Spin-lock adaptativo com jitter no Redis na entrada da requisição e bloqueio léxico FOR UPDATE no banco de dados, comprovado com 100% de consistência em testes de 50 requisições simultâneas."
      },
      {
        problem: "Degradação de performance em relatórios e auditorias com crescimento exponencial dos lançamentos contábeis.",
        solution: "Implementação de tabela mãe particionada por intervalo de datas (RANGE mensal) com rotina de manutenção contínua que provisiona automaticamente os próximos 12 meses."
      }
    ]
  },
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
      "59 índices (B-Tree, GIN) para otimização de queries",
      "6 views operacionais e 3 materialized views para agregação contínua",
      "27 testes automatizados cobrindo segurança e integridade"
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
    title: "RentalCar - Locação de Veículos",
    category: "Full Stack & Segurança",
    shortDescription: "Sistema de locação de veículos com catálogo, reservas validadas, painel administrativo e limite de tentativas de login. 2FA em desenvolvimento.",
    fullDescription: "Plataforma de locação de veículos em Next.js 14 e TypeScript, com backend no Nhost (Hasura GraphQL + PostgreSQL). Tem catálogo de veículos, reservas com validação de datas, painel administrativo, trilha de auditoria e limite de tentativas de login. A autenticação em duas etapas (2FA por TOTP) está em desenvolvimento.",
    tags: ["Next.js 14", "TypeScript", "Nhost", "GraphQL", "PostgreSQL", "Zod", "Vitest"],
    github: "https://github.com/devraphaeldiniz/rentalcar",
    highlights: [
      "Limite de tentativas de login: 5 falhas por e-mail em 15 minutos, contadas no banco via Hasura",
      "Validação de reservas com Zod (data final depois da inicial), coberta por testes com Vitest",
      "Painel administrativo com veículos, reservas, usuários, avaliações e relatórios",
      "Trilha de auditoria de ações e logins",
      "Exportação de relatórios em PDF com jsPDF",
      "Em desenvolvimento: 2FA por TOTP (a geração do QR Code já funciona)"
    ],
    architectureDiagram: `[Next.js App Router]
          │
          ▼ Route Handlers / Server Actions
[Validação Zod + Limite de tentativas]
          │
          ▼ GraphQL
[Hasura (Nhost)] ──► [PostgreSQL]
          │
          └──► [Nhost Auth (JWT)]`,
    architecture: [
      "Framework: Next.js 14 (App Router) com TypeScript e Tailwind CSS",
      "Dados: Hasura GraphQL sobre PostgreSQL, hospedados no Nhost",
      "Autenticação: Nhost Auth com JWT, validado no servidor antes das rotas de admin"
    ],
    codeSnippet: {
      title: "Limite de tentativas de login por e-mail (resumido)",
      language: "typescript",
      code: `export async function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMinutes: number = 15
): Promise<RateLimitResult> {
  // conta no Hasura as tentativas que falharam dentro da janela
  const timeWindow = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString()
  const attempts = result.data?.login_attempts_aggregate?.aggregate?.count || 0

  return {
    allowed: attempts < maxAttempts,
    remaining: Math.max(0, maxAttempts - attempts),
    resetAt: new Date(Date.now() + windowMinutes * 60 * 1000)
  }
}`
    },
    challenges: [
      {
        problem: "Bloquear tentativas repetidas de adivinhar a senha no login.",
        solution: "Cada tentativa é registrada no banco; antes de autenticar, uma consulta agregada no Hasura conta as falhas do e-mail nos últimos 15 minutos e bloqueia a partir da quinta."
      },
      {
        problem: "Impedir reservas com período inválido.",
        solution: "Schema Zod com regra que exige data final depois da inicial, validado no servidor e coberto por testes unitários com Vitest."
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
  },
  {
    slug: "jitterbit-orders-api",
    title: "API REST de Pedidos",
    category: "Back-end & APIs",
    shortDescription: "API REST de pedidos em Node.js e Express, com autenticação JWT, validação com Zod e documentação Swagger. Feita como teste técnico.",
    fullDescription: "API REST para criar, consultar, atualizar e remover pedidos e seus itens, desenvolvida como teste técnico para uma vaga de backend. Recebe o pedido em um formato de entrada, mapeia para o formato do banco e grava pedido e itens no Supabase (PostgreSQL).",
    tags: ["Node.js", "Express", "Supabase", "PostgreSQL", "JWT", "Zod", "Swagger"],
    github: "https://github.com/devraphaeldiniz/jitterbit-orders-api",
    highlights: [
      "CRUD completo de pedidos e itens com relacionamento (um pedido, vários itens)",
      "Mapeamento do formato de entrada (numeroPedido, idItem) para o formato do banco",
      "Autenticação JWT nas rotas de pedidos",
      "Validação de entrada com Zod e middleware global de erros",
      "Rate limiting (100 requisições por minuto) e logs com Morgan e Winston",
      "Documentação interativa com Swagger"
    ],
    architectureDiagram: `[Cliente HTTP]
      │
      ▼
[Express Router] ──► [Rate limit] ──► [JWT middleware]
      │
      ▼
[Validação Zod] ──► [Controller] ──► [Supabase / PostgreSQL]
      │                (mapeia entrada)     orders ◄── items
      ▼
[Error handler]`,
    architecture: [
      "Rotas, controllers, middlewares e validators em camadas separadas",
      "Banco: tabelas orders e items no Supabase, com itens removidos em cascata",
      "Observabilidade: logs de requisição com Morgan e logs da aplicação com Winston"
    ],
    codeSnippet: {
      title: "Validação do pedido com Zod",
      language: "javascript",
      code: `exports.orderSchema = z.object({
  numeroPedido: z.string().min(1),
  valorTotal: z.number().positive(),
  dataCriacao: z.string().min(1),
  items: z.array(
    z.object({
      idItem: z.string().min(1),
      quantidadeItem: z.number().positive(),
      valorItem: z.number().positive()
    })
  )
});`
    },
    challenges: [
      {
        problem: "O pedido chega num formato (numeroPedido, idItem) diferente do usado no banco (orderid, productid).",
        solution: "O controller faz o mapeamento explícito antes de gravar, então a API aceita o formato do cliente sem mudar o modelo de dados."
      },
      {
        problem: "Evitar que dados inválidos cheguem ao banco.",
        solution: "Middleware de validação com Zod nas rotas de escrita e um middleware global que transforma erros em respostas padronizadas."
      }
    ]
  },
  {
    slug: "nexus",
    title: "Nexus - Gestão de Associados",
    category: "Full Stack & Segurança",
    shortDescription: "Sistema web para gestão de associados, mensalidades e carteirinha digital com QR Code assinado.",
    fullDescription: "Plataforma em PHP e MySQL para associações: cadastro e consulta de associados, controle de mensalidades, carteirinha digital e validação de acesso por QR Code. Tem perfis de administrador e associado, proteção CSRF e trilha de auditoria.",
    tags: ["PHP", "MySQL", "Docker", "Render"],
    github: "https://github.com/devraphaeldiniz/nexus",
    highlights: [
      "Perfis ADMIN e ASSOCIADO com login unificado",
      "Senhas com Argon2id e proteção CSRF nos formulários",
      "QR Code da carteirinha assinado com HMAC-SHA256 e com validade",
      "Trilha de auditoria que oculta senhas e tokens nos registros",
      "Controle de mensalidades e situação financeira do associado"
    ],
    architectureDiagram: `[Navegador] ──► [PHP (páginas admin / associado)] ──► [MySQL]
                       │
                       └──► [Validação do QR Code (HMAC)]`,
    architecture: [
      "Backend: PHP com PDO e sessões com cookies HttpOnly",
      "Banco: MySQL com tabelas de usuários, mensalidades, auditoria e tentativas de login",
      "Deploy: Docker no Render"
    ],
    codeSnippet: {
      title: "QR Code assinado com HMAC",
      language: "php",
      code: `function qr_payload(int $id, int $version, string $validUntil): string {
    $data = $id.'|'.$version.'|'.$validUntil;
    return base64url_encode($data.'|'.hash_hmac('sha256', $data, qr_secret()));
}`
    },
    challenges: [
      {
        problem: "Impedir que alguém falsifique a carteirinha gerando o próprio QR Code.",
        solution: "O conteúdo do QR Code é assinado com HMAC-SHA256 usando um segredo do servidor; na leitura, a assinatura, a versão e a validade são conferidas."
      }
    ]
  }
];
