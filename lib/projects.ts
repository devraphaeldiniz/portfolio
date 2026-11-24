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
                             ▼ leitura periódica (FOR UPDATE SKIP LOCKED)
                     [Outbox Worker] ──► [Processamento dos eventos]`,
    architecture: [
      "Linguagem & Runtime: Go 1.25 com pgxpool (PostgreSQL nativo) e cliente Redis v9",
      "Isolamento Transacional: Lock pessimista léxico em nível SQL somado a Redis Mutex para contenção inicial",
      "Banco de Dados: PostgreSQL 16 com particionamento declarativo mensal por data (RANGE)",
      "Observabilidade: Instrumentação oficial do Prometheus coletando latência transacional (p95/p99) e vazão contábil"
    ],
    codeSnippet: {
      title: "internal/repository/ledger_repository.go: locks em ordem fixa (trecho)",
      language: "go",
      code: `// Prevenção de Deadlock: ordenação léxica dos IDs para lock pessimista
firstID, secondID := fromID, toID
if fromID.String() > toID.String() {
    firstID, secondID = toID, fromID
}

var dummy int
err = tx.QueryRow(ctx, \`SELECT 1 FROM account_balances WHERE account_id = $1 FOR UPDATE\`, firstID).Scan(&dummy)
if err != nil {
    return nil, err
}
err = tx.QueryRow(ctx, \`SELECT 1 FROM account_balances WHERE account_id = $1 FOR UPDATE\`, secondID).Scan(&dummy)
if err != nil {
    return nil, err
}`
    },
    challenges: [
      {
        problem: "Evitar saldo negativo quando dezenas de transferências simultâneas atingem a mesma conta.",
        solution: "Spin-lock com jitter no Redis na entrada da requisição e SELECT ... FOR UPDATE em ordem fixa de UUID no banco, exercitado por um programa de estresse com 50 transferências simultâneas (cmd/stress)."
      },
      {
        problem: "Evitar que a tabela de lançamentos cresça sem limite numa partição só.",
        solution: "Tabela particionada por mês (RANGE), com um worker que cria as partições dos meses seguintes."
      }
    ]
  },
  {
    slug: "ecommerce-supabase",
    title: "E-commerce Backend & Infra",
    category: "Back-end & Arquitetura de Dados",
    shortDescription: "Banco e APIs de um e-commerce com Row-Level Security em todas as tabelas, 4 papéis de acesso, triggers de auditoria e 27 testes automatizados.",
    fullDescription: "Banco de um e-commerce feito como desafio técnico para uma vaga de backend, com PostgreSQL e Supabase: regras de acesso no próprio banco, triggers de auditoria, views para relatórios e Edge Functions.",
    tags: ["PostgreSQL", "Supabase", "Row Level Security", "RBAC", "Edge Functions", "GitHub Actions"],
    github: "https://github.com/devraphaeldiniz/ecommerce-supabase",
    highlights: [
      "Controle de acesso (RBAC) com 4 papéis: cliente, staff, admin e super admin",
      "Row Level Security ativado nas 8 tabelas, com políticas por papel",
      "Índices B-Tree e GIN para as consultas mais usadas",
      "14 views e 3 materialized views para relatórios",
      "27 testes automatizados de integração, que rodam com um projeto Supabase configurado"
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
      "Banco: PostgreSQL com migrations versionadas e triggers de auditoria",
      "Segurança: políticas RLS que usam auth.uid() para separar os dados de cada usuário",
      "CI: GitHub Actions instala as dependências e procura segredos com Gitleaks"
    ],
    codeSnippet: {
      title: "supabase/migrations: políticas RLS de pedidos (trecho)",
      language: "sql",
      code: `CREATE POLICY "orders_select_own" ON orders
    FOR SELECT USING (customer_id IN (SELECT id FROM profiles WHERE auth_uid = auth.uid()));

CREATE POLICY "admin_orders_select_all" ON orders
    FOR SELECT TO authenticated
    USING (is_staff_or_admin());`
    },
    challenges: [
      {
        problem: "Fazer cada cliente ver só os próprios pedidos, mesmo acessando o banco direto pela API do Supabase.",
        solution: "Row Level Security com políticas por dono do pedido e por papel, definidas no próprio banco."
      },
      {
        problem: "Evitar recalcular a cada consulta os relatórios de vendas e de segmentação de clientes (RFM).",
        solution: "Materialized views, com uma função que atualiza as três."
      }
    ]
  },
  {
    slug: "plano-aula-ia",
    title: "Gerador de Planos de Aula com IA",
    category: "Full Stack & IA Generativa",
    shortDescription: "Gera planos de aula alinhados à BNCC com a API do Gemini. A resposta do modelo passa por validação de esquema com Zod antes de chegar ao professor.",
    fullDescription: "Aplicação full stack que usa o Google Gemini 2.5 Flash para gerar planos de aula estruturados, com base nos objetivos da BNCC informados no formulário.",
    tags: ["Next.js 15", "TypeScript", "Google Gemini API", "Tailwind CSS", "Zod", "Supabase"],
    github: "https://github.com/devraphaeldiniz/plano-aula-ia",
    highlights: [
      "Chamada à API do Google Gemini 2.5 Flash em uma rota do Next.js",
      "Entrada e resposta validadas com Zod",
      "Uma nova tentativa com temperatura menor quando a resposta não é um JSON válido",
      "Plano salvo no Supabase (PostgreSQL) em colunas JSONB",
      "Interface com Tailwind CSS"
    ],
    architectureDiagram: `[Next.js Client] ──► [Route Handler] ──► [Zod Input Validation]
                                               │
                                               ▼
                                      [Gemini 2.5 Flash API]
                                               │
                                               ▼
[PostgreSQL Database] ◄── [Safe Parsing] ◄── [Response Normalizer]`,
    architecture: [
      "Frontend: Next.js 15 (App Router) e React 19",
      "Validação: Zod recusa respostas do modelo fora da estrutura esperada",
      "Serviço de IA: API REST do Gemini, com remoção das marcas de markdown antes do JSON.parse"
    ],
    codeSnippet: {
      title: "lib/gemini.ts: nova tentativa e validação (trecho)",
      language: "typescript",
      code: `try {
  text = await callGemini(prompt);
  text = cleanJsonResponse(text);
  parsed = JSON.parse(text);
} catch (error) {
  text = await callGemini(prompt, true);
  text = cleanJsonResponse(text);
  parsed = JSON.parse(text);
}

return PlanoAulaOutputSchema.parse(parsed);`
    },
    challenges: [
      {
        problem: "O modelo nem sempre devolve um JSON válido.",
        solution: "Limpeza das marcas de markdown e, se o JSON falhar, uma segunda chamada com instrução mais rígida e temperatura menor (0,3). A resposta final ainda passa pelo Zod."
      }
    ]
  },
  {
    slug: "rentalcar",
    title: "AstaCar — Locadora de Veículos",
    category: "Projeto Full Stack no ar",
    shortDescription: "Locadora completa no ar: reserva com preço calculado no servidor, pagamento pelo Mercado Pago, CNH conferida, contrato em PDF, vistoria na retirada e na devolução e painel admin com agenda, funil e monitoramento. Dá para testar como cliente ou como admin, sem cadastro.",
    fullDescription: "O AstaCar é um projeto autoral de locação de veículos, publicado na Vercel e pensado como produto, com reservas de demonstração e pagamento em modo de teste: o cliente escolhe o carro, monta a reserva com proteções e opcionais e vê exatamente quanto vai pagar; o admin acompanha a frota, ajusta preços por temporada, cria cupons e mede onde os clientes desistem do funil. Todo valor é recalculado no servidor, o banco impede reservas sobrepostas e bloqueios de manutenção, a CNH é conferida antes da reserva e a vistoria registra km, combustível e avarias. Quem visita o portfólio entra como cliente ou no painel do admin em modo demonstração, só leitura e com os dados pessoais mascarados.",
    tags: ["Next.js 15", "TypeScript", "Nhost", "Hasura GraphQL", "PostgreSQL", "Mercado Pago", "Tailwind", "Zod", "Vitest", "Playwright", "Vercel"],
    github: "https://github.com/devraphaeldiniz/rentalcar",
    demo: "https://rentalcar-eight.vercel.app",
    cover: "/projetos/astacar/01-home.jpg",
    metrics: [
      { value: "34", label: "carros na frota" },
      { value: "105", label: "testes de unidade + E2E" },
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
      "Pagamento online com Mercado Pago (Payment Brick, em modo de teste) e webhook com assinatura validada; estorno automático ao cancelar",
      "Painel admin com agenda da frota, gestão de preços e cupons, banners, contrato em PDF, avaliações e trilha de auditoria",
      "Painel em modo demonstração para recrutadores: só leitura por construção e com nomes, e-mails, telefones e CPFs mascarados",
      "Monitoramento próprio: erros do servidor (instrumentation.ts) e do navegador agrupados no painel, sem dados pessoais, e /api/health",
      "Sessão em cookies httpOnly, rate limit nas rotas sensíveis, CSP e validação de entrada com Zod",
      "SEO: páginas por categoria, sitemap, robots e imagem Open Graph gerada dinamicamente",
      "105 testes de unidade com Vitest, testes de ponta a ponta com Playwright a cada deploy, Lighthouse 100 em acessibilidade e SEO e 0 vulnerabilidades no npm audit"
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
    shortDescription: "Disparador de mensagens com fila salva em SQLite e worker contínuo: se o processo cair, o que estava pendente continua na fila e é retomado ao reiniciar.",
    fullDescription: "Disparador de mensagens em Node.js e Express. A rota só grava na fila; um worker separado envia as mensagens no horário agendado, com até 3 tentativas por mensagem.",
    tags: ["Node.js", "Express", "SQLite", "Workers", "WPPConnect", "REST API"],
    github: "https://github.com/devraphaeldiniz/whatsapp-disparador",
    highlights: [
      "Fila gravada em disco com SQLite",
      "Worker em segundo plano, separado das rotas da API",
      "Intervalo aleatório entre os envios",
      "Até 3 tentativas por mensagem, com 60 segundos entre elas; depois disso, fica marcada como falha",
      "Modo mock, que simula os envios e 5% de falhas"
    ],
    architectureDiagram: `[HTTP Requests] ──► [Express Controller] ──► [Insert: pendente]
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
      "Banco: SQLite, com os envios de uma campanha agendados em uma transação",
      "Fila: horário agendado e estados 'pendente', 'enviado' e 'falhou'"
    ],
    codeSnippet: {
      title: "src/workers/messageWorker.js: processamento da fila (trecho)",
      language: "javascript",
      code: `const itens = buscarPendentes(5);

for (const item of itens) {
  try {
    // Envia via WhatsApp (real ou mock)
    await sendMessage(item.telefone, item.mensagem);

    // Marca como enviado no banco — persiste o resultado
    marcarComoEnviado(item.id);
  } catch (err) {
    // Em caso de falha, incrementa tentativas e reagenda ou marca como falhou
    marcarComoErro(item.id, err.message, item.tentativas);
  }
}`
    },
    challenges: [
      {
        problem: "Não perder os envios pendentes se o processo cair.",
        solution: "A fila fica no SQLite, então o worker volta a buscar os pendentes ao reiniciar. Limite conhecido: se a queda acontecer entre o envio e a gravação, a mensagem pode ser enviada de novo."
      },
      {
        problem: "Evitar que todas as mensagens saiam no mesmo instante.",
        solution: "Cada contato recebe um intervalo aleatório, somado ao anterior, e o worker processa no máximo 5 mensagens por ciclo."
      }
    ]
  },
  {
    slug: "jitterbit-orders-api",
    title: "Jitterbit Orders API",
    category: "Teste técnico · API REST",
    shortDescription: "API REST de pedidos feita como teste técnico: CRUD de pedidos e itens com JWT, validação com Zod e Supabase.",
    fullDescription: "API REST de gerenciamento de pedidos feita como teste técnico para uma vaga de backend. Recebe o pedido, valida, converte para o formato do banco e salva no Supabase (PostgreSQL).",
    tags: ["JavaScript", "Node.js", "Express", "Zod", "JWT", "Swagger", "Supabase"],
    github: "https://github.com/devraphaeldiniz/jitterbit-orders-api",
    highlights: ["CRUD de pedidos e itens", "Autenticação JWT e rate limiting", "Validação com Zod e middleware de erros", "Documentação com Swagger e logs com Morgan e Winston"],
    architectureDiagram: `[Cliente] ──► [Express + JWT] ──► [Validação Zod] ──► [Controller] ──► [Supabase (PostgreSQL)]`,
    architecture: ["Rotas, controllers, middlewares e validators separados", "Validação com Zod antes do controller", "Conversão do JSON recebido para o formato do banco"],
    codeSnippet: { title: "src/middleware/validate.js", language: "javascript", code: `module.exports = (schema) => (req, res, next) => {\n  try {\n    req.body = schema.parse(req.body);\n    next();\n  } catch (err) {\n    return res.status(400).json({\n      message: "Erro de validação",\n      errors: err.errors\n    });\n  }\n};` },
    challenges: [{ problem: "Receber um JSON com nomes de campos diferentes dos usados no banco.", solution: "Validação com Zod e uma função que converte o pedido para o formato das tabelas." }]
  },
  {
    slug: "nexus-shop",
    title: "Nexus Shop — E-commerce de Smartphones",
    category: "E-commerce & Segurança de Aplicações",
    shortDescription: "E-commerce de smartphones com checkout via Stripe e Mercado Pago, JWT com refresh token rotativo e frontend separado da API.",
    fullDescription: "Plataforma de e-commerce especializada em smartphones, construída com Next.js e TypeScript no frontend, Fastify e Prisma no backend, PostgreSQL para dados relacionais e Redis para cache e sessões. O projeto integra Stripe e Mercado Pago (sem chaves reais na demonstração) e autenticação com tokens rotativos.",
    tags: ["Next.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Redis", "Stripe", "Mercado Pago", "Docker"],
    github: "https://github.com/devraphaeldiniz/nexus-shop",
    demo: "https://nexus-shop-raphaeldiniz.vercel.app",
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
    codeSnippet: { title: "orders.routes.ts: validação do pedido com Zod (trecho)", language: "typescript", code: `items: z\n  .array(\n    z.object({\n      productId: z.string().min(1),\n      quantity: z.number().int().positive().max(20),\n      color: z.string().max(50).optional(),\n      storage: z.string().max(50).optional(),\n    })\n  )\n  .min(1, 'O carrinho está vazio')\n  .max(50),` },
    challenges: [{ problem: "Integrar pagamentos diferentes sem acoplar o checkout a um único provedor.", solution: "Separação da regra de pedido da implementação dos gateways, com contratos comuns para criação e confirmação de pagamentos." }, { problem: "Proteger operações sensíveis de autenticação e checkout.", solution: "Combinação de validação de entrada, rate limiting, headers de segurança e rotação de refresh tokens." }]
  }
];
