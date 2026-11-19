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
  cover?: string;
  metrics?: { value: string; label: string }[];
  gallery?: { src: string; caption: string; width: number; height: number }[];
}

export const projectsData: DetailedProject[] = [
  {
    slug: "fintech-core-engine",
    title: "Fintech Core Engine (estudo em Go)",
    category: "Estudo · Go, Concorrência & Transações",
    shortDescription: "Projeto de estudo em Go: livro-razão de partidas dobradas que mantém os saldos corretos em transferências simultâneas, com lock no Redis, transações no PostgreSQL e métricas no Prometheus.",
    fullDescription: "Projeto de estudo que fiz para aprender Go aplicando conceitos de sistemas financeiros: partidas dobradas, idempotência, controle de concorrência e o padrão Transactional Outbox. Validado com uma suíte de estresse de 50 transferências simultâneas, em que a soma dos saldos se manteve exata no centavo. Próximos passos: ampliar os testes automatizados e medir a latência com k6.",
    tags: ["Go", "PostgreSQL", "Redis", "Docker", "Prometheus", "Grafana"],
    github: "https://github.com/devraphaeldiniz/fintech-core-engine",
    highlights: [
      "Livro-razão por partidas dobradas (double-entry), só com inserções",
      "Tabela de saldo atualizada na mesma transação, sem precisar somar o histórico a cada consulta",
      "Lock no Redis com retry e SELECT ... FOR UPDATE em ordem fixa de UUID no PostgreSQL para evitar deadlock entre transferências cruzadas",
      "Transactional Outbox Pattern desacoplando disparo de eventos sem risco de dual-write",
      "Rotina de reconciliação que compara o saldo com a soma do livro-razão",
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
    shortDescription: "Banco e APIs de um e-commerce com Row-Level Security em todas as tabelas, 4 papéis de acesso, triggers de auditoria e 27 testes automatizados.",
    fullDescription: "Solução de infraestrutura completa para comércio eletrônico utilizando PostgreSQL e Supabase. Projetado para alta integridade relacional, isolamento de privilégios e auditoria em tempo real.",
    tags: ["PostgreSQL", "Supabase", "Row Level Security", "RBAC", "Docker", "CI/CD"],
    github: "https://github.com/devraphaeldiniz/ecommerce-supabase",
    highlights: [
      "Controle de acesso granular (RBAC) em 4 níveis estritos",
      "Row Level Security ativado em todas as tabelas, com políticas por papel",
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
    shortDescription: "Gera planos de aula alinhados à BNCC com a API do Gemini. A resposta do modelo passa por validação de esquema com Zod antes de chegar ao professor.",
    fullDescription: "Aplicação full stack moderna que conecta o ecossistema educacional às capacidades de IA generativa do Google Gemini 2.5 Flash, gerando planos estruturados conforme diretrizes da Base Nacional Comum Curricular (BNCC).",
    tags: ["Next.js 14", "TypeScript", "Google Gemini API", "Tailwind CSS", "Zod", "Supabase"],
    github: "https://github.com/devraphaeldiniz/plano-aula-ia",
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
    title: "AstaCar — Locadora de Veículos",
    category: "Produto Full Stack em Produção",
    shortDescription: "Locadora completa no ar: reserva com preço calculado no servidor, pagamento pelo Mercado Pago, CNH conferida, contrato em PDF, vistoria na retirada e na devolução e painel admin com agenda, funil e monitoramento. Dá para testar como cliente ou como admin, sem cadastro.",
    fullDescription: "O AstaCar é uma aplicação real de locação de veículos, publicada na Vercel e pensada como produto: o cliente escolhe o carro, monta a reserva com proteções e opcionais e vê exatamente quanto vai pagar; o time interno acompanha a frota, ajusta preços por temporada, cria cupons e mede onde os clientes desistem do funil. Todo valor é recalculado no servidor, o banco impede reservas sobrepostas e bloqueios de manutenção, a CNH é conferida antes da reserva e a vistoria registra km, combustível e avarias. Quem visita o portfólio entra como cliente ou no painel do admin em modo demonstração, só leitura e com os dados pessoais mascarados.",
    tags: ["Next.js 15", "TypeScript", "Nhost", "Hasura GraphQL", "PostgreSQL", "Mercado Pago", "Tailwind", "Zod", "Vitest", "Playwright", "Vercel"],
    github: "https://github.com/devraphaeldiniz/rentalcar",
    demo: "https://rentalcar-eight.vercel.app",
    cover: "/projetos/astacar/01-home.jpg",
    metrics: [
      { value: "34", label: "carros na frota" },
      { value: "101", label: "testes + E2E no CI" },
      { value: "100", label: "Lighthouse (acessib. e SEO)" },
      { value: "0", label: "vulnerabilidades (npm audit)" }
    ],
    gallery: [
      { src: "/projetos/astacar/01-home.jpg", caption: "Home: o cliente escolhe as datas e vê o valor total antes de reservar", width: 800, height: 500 },
      { src: "/projetos/astacar/03-detalhe.jpg", caption: "Página do veículo com cotação em tempo real", width: 800, height: 500 },
      { src: "/projetos/astacar/04-checkout.jpg", caption: "Checkout com proteções, opcionais, cupom e resumo linha a linha", width: 800, height: 500 },
      { src: "/projetos/astacar/08-admin-funil.jpg", caption: "Funil de conversão e motivos de desistência", width: 800, height: 500 },
      { src: "/projetos/astacar/10-admin-agenda.jpg", caption: "Agenda da frota: retiradas, devoluções e ocupação", width: 800, height: 500 },
      { src: "/projetos/astacar/11-admin-precos.jpg", caption: "Preços inteligentes: temporadas, descontos por duração e cupons", width: 800, height: 500 },
      { src: "/projetos/astacar/13-admin-demo-vistoria.jpg", caption: "Vistoria na devolução: km rodados, combustível que faltou, avarias novas e cobrança sugerida (painel em modo demonstração)", width: 1280, height: 1180 },
      { src: "/projetos/astacar/12-login-demo.jpg", caption: "Login com as contas de demonstração: cliente ou painel do admin, sem cadastro", width: 1280, height: 800 },
      { src: "/projetos/astacar/14-contrato-pdf.jpg", caption: "Contrato de locação em PDF gerado no servidor com as linhas de preço da reserva (exemplo com dados fictícios)", width: 910, height: 1287 },
      { src: "/projetos/astacar/06-celular.jpg", caption: "Experiência responsiva no celular", width: 804, height: 780 }
    ],
    highlights: [
      "Preço calculado só no servidor: diárias → temporada → desconto por duração → cupom → proteções e opcionais, com cada linha registrada na reserva",
      "Constraint EXCLUDE (GiST) no PostgreSQL impede duas reservas do mesmo carro no mesmo período, mesmo com requisições simultâneas",
      "Cupons com consumo atômico e CHECK no banco (uses <= max_uses): não há como estourar o limite",
      "Funil de conversão próprio (busca → veículo → checkout → reserva) com consentimento LGPD, cookies httpOnly e sem guardar IP",
      "Bloqueio de carro para manutenção e vistoria com km, combustível e avarias: gatilhos no PostgreSQL recusam reserva em período bloqueado e devolução com km menor",
      "CNH conferida no servidor antes de cada reserva (dígitos verificadores, categoria, validade na retirada e 2 anos de habilitação)",
      "Pagamento online com Mercado Pago (Payment Brick) e webhook com assinatura validada; estorno automático ao cancelar",
      "Painel admin com agenda da frota, gestão de preços e cupons, banners, contrato em PDF, avaliações e trilha de auditoria",
      "Painel em modo demonstração para recrutadores: só leitura por construção e com nomes, e-mails, telefones e CPFs mascarados",
      "Monitoramento próprio: erros do servidor (instrumentation.ts) e do navegador agrupados no painel, sem dados pessoais, e /api/health",
      "Sessão em cookies httpOnly, rate limit nas rotas sensíveis, CSP e validação de entrada com Zod",
      "SEO: páginas por categoria, sitemap, robots e imagem Open Graph gerada dinamicamente",
      "101 testes com Vitest, testes de ponta a ponta com Playwright a cada deploy, Lighthouse 100 em acessibilidade e SEO e 0 vulnerabilidades no npm audit"
    ],
    architectureDiagram: `[Navegador] ──► [Next.js 15 App Router · Vercel]
                     │
                     ├── Server Components (catálogo, área do cliente, admin)
                     ├── Route Handlers /api/* ── Zod + rate limit + sessão httpOnly
                     │        │
                     │        └── lib/pricing.ts ── computeQuote() (preço no servidor)
                     │
                     ▼
            [Nhost · Hasura GraphQL + Auth]
                     │
                     ▼
            [PostgreSQL]
              ├── bookings  ── EXCLUDE USING gist (sem sobreposição)
              ├── coupons   ── CHECK uses <= max_uses
              ├── vehicle_blocks ── gatilhos (manutenção x reservas)
              ├── booking_inspections ── gatilho (km da devolução)
              ├── pricing_rules · rental_extras · price_lines
              └── analytics_events · app_errors · audit_logs · banners

[Mercado Pago] ──webhook assinado──► /api/webhooks/mercadopago
[GitHub Actions] ── lint · tipos · testes · build · audit · E2E (Playwright)`,
    architecture: [
      "Front e back no mesmo projeto Next.js 15 (App Router) com TypeScript estrito e Tailwind; deploy contínuo na Vercel",
      "Nhost fornece Auth e Hasura GraphQL sobre PostgreSQL; regras críticas (integridade, limites, sobreposição) ficam no banco",
      "Migrations versionadas e idempotentes aplicadas por script (npm run db:setup), com tabela de controle schema_migrations",
      "Rotas de admin protegidas no layout e de novo em cada página/rota, porque a navegação no cliente pode pular o layout",
      "CI no GitHub Actions a cada PR e testes de ponta a ponta contra cada deploy de preview da Vercel"
    ],
    codeSnippet: {
      title: "nhost/migrations/002_booking_integrity.sql — o banco garante que não existe overbooking",
      language: "sql",
      code: `ALTER TABLE bookings
  ADD CONSTRAINT bookings_no_overlap
  EXCLUDE USING gist (
    vehicle_id WITH =,
    daterange(start_date, end_date, '[)') WITH &&
  )
  WHERE (status IN ('pending', 'confirmed', 'active'));

-- Duas reservas ativas do mesmo carro com períodos que se cruzam
-- são rejeitadas pelo próprio PostgreSQL, sem depender da aplicação.`
    },
    challenges: [
      {
        problem: "O valor mostrado ao cliente não pode ser manipulado pelo navegador, e precisa combinar temporada, desconto por duração, cupom e proteções sem erro de arredondamento.",
        solution: "Uma função pura (computeQuote) roda no servidor em centavos, aplica as regras em ordem fixa, nunca deixa o valor negativo e devolve as linhas do orçamento, que ficam salvas na reserva. A mesma função alimenta a cotação e a criação da reserva."
      },
      {
        problem: "Dois clientes reservando o mesmo carro ao mesmo tempo poderiam gerar overbooking.",
        solution: "Constraint EXCLUDE com GiST sobre (vehicle_id, daterange) no PostgreSQL: o banco rejeita a segunda reserva de forma atômica e a API devolve uma mensagem clara."
      },
      {
        problem: "Medir onde o cliente desiste da reserva sem usar ferramentas de terceiros nem desrespeitar a LGPD.",
        solution: "Tracking próprio que só grava eventos após consentimento, usa identificadores anônimos em cookies httpOnly, não armazena IP e pergunta o motivo quando o cliente abandona o checkout."
      },
      {
        problem: "Datas calculadas em UTC faziam a reserva 'de hoje' virar 'ontem' depois das 21h no horário de Brasília.",
        solution: "Data de referência calculada com Intl.DateTimeFormat no fuso America/Sao_Paulo e coberta por teste automatizado."
      },
      {
        problem: "Deixar quem avalia o projeto ver o painel do admin funcionando, sem expor dados de clientes nem permitir alterações.",
        solution: "Conta de demonstração com papel de cliente no banco: as rotas que alteram algo continuam recusando por construção. Uma checagem só de leitura libera o painel, e as respostas passam por uma função que mascara nomes, e-mails, telefones, CPFs e IPs."
      },
      {
        problem: "Na limpeza do código antigo, os relatórios somavam valores do banco como texto (\"100\" + \"50\" virava \"10050\").",
        solution: "Tipar as respostas do banco no lugar de any: o TypeScript passou a apontar as somas erradas. Conversão explícita com Number() e teste cobrindo valores que chegam como texto."
      }
    ]
  },
  {
    slug: "whatsapp-disparador",
    title: "WhatsApp Disparador & Worker",
    category: "Back-end & Processamento Assíncrono",
    shortDescription: "Disparador de mensagens com fila persistida em SQLite e worker contínuo: se o processo cair, nenhuma mensagem se perde.",
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
    title: "Jitterbit Orders API",
    category: "Integrações & APIs Empresariais",
    shortDescription: "API que recebe, valida e sincroniza pedidos entre sistemas, integrada ao Supabase.",
    fullDescription: "Serviço focado na integração de pedidos, com contratos HTTP claros, validação de payloads e processamento orientado a confiabilidade para conectar sistemas distintos.",
    tags: ["JavaScript", "Node.js", "REST API", "Integrações"],
    github: "https://github.com/devraphaeldiniz/jitterbit-orders-api",
    highlights: ["Integração de pedidos entre plataformas", "Contratos REST para comunicação entre sistemas", "Tratamento de erros e respostas previsíveis"],
    architectureDiagram: `[Cliente / Sistema Origem] ──► [Orders API] ──► [Validação e Regras] ──► [Sistema Destino]`,
    architecture: ["API REST para integração de pedidos", "Camada de validação e normalização de dados", "Fluxo preparado para observabilidade e retentativas"],
    codeSnippet: { title: "Endpoint de pedidos", language: "javascript", code: `app.post(\"/orders\", async (req, res) => {\n  const order = validateOrder(req.body);\n  const result = await processOrder(order);\n  return res.status(201).json(result);\n});` },
    challenges: [{ problem: "Manter consistência ao integrar payloads de origens diferentes.", solution: "Normalização e validação antes do processamento do pedido." }]
  },
  {
    slug: "nexus-shop",
    title: "Nexus Shop — E-commerce de Smartphones",
    category: "E-commerce & Segurança de Aplicações",
    shortDescription: "E-commerce de smartphones com checkout via Stripe e Mercado Pago, JWT com refresh token rotativo e frontend separado da API.",
    fullDescription: "Plataforma de e-commerce especializada em smartphones, construída com Next.js e TypeScript no frontend, Fastify e Prisma no backend, PostgreSQL para dados relacionais e Redis para cache e sessões. O projeto combina pagamentos com Stripe e Mercado Pago, autenticação com tokens rotativos e práticas de segurança para uma operação de comércio digital.",
    tags: ["Next.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Redis", "Stripe", "Mercado Pago", "Docker"],
    github: "https://github.com/devraphaeldiniz/nexus-shop",
    highlights: ["Frontend e API organizados como aplicações independentes", "Integração com Stripe e Mercado Pago", "JWT com refresh token rotativo e RBAC", "Validação com Zod, rate limiting e headers de segurança", "Testes unitários, integração e E2E com CI/CD"],
    architectureDiagram: `[Next.js Storefront] ──► [Fastify REST API] ──► [Prisma ORM]
          │                         │                  │
          ▼                         ▼                  ▼
      [Zustand]              [JWT / RBAC]       [PostgreSQL]
                                    │                  │
                              [Redis Cache]      [Orders / Products]
                                    │
                         [Stripe / Mercado Pago]`,
    architecture: ["Frontend: Next.js App Router, TypeScript, Tailwind, Zustand e componentes acessíveis", "Backend: Fastify com Prisma, autenticação JWT e documentação de API", "Dados: PostgreSQL para catálogo e pedidos, Redis para cache e sessões", "Operação: Docker Compose e pipeline de CI/CD com testes automatizados"],
    codeSnippet: { title: "Validação de pedido com Zod", language: "typescript", code: `const OrderSchema = z.object({\n  items: z.array(z.object({\n    productId: z.string().uuid(),\n    quantity: z.number().int().positive(),\n  })).min(1),\n  paymentMethod: z.enum([\"stripe\", \"mercado_pago\"]),\n});` },
    challenges: [{ problem: "Integrar pagamentos diferentes sem acoplar o checkout a um único provedor.", solution: "Separação da regra de pedido da implementação dos gateways, com contratos comuns para criação e confirmação de pagamentos." }, { problem: "Proteger operações sensíveis de autenticação e checkout.", solution: "Combinação de validação de entrada, rate limiting, CSRF, headers de segurança e rotação de refresh tokens." }]
  }
];
