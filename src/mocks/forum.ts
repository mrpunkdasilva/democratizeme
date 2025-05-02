// Tipos para os dados do fórum
export type ForumTopic = {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
  views: number;
  comments: number;
  isPinned: boolean;
  isLocked: boolean;
};

export type ForumTag = {
  name: string;
  count: number;
};

export type ForumContributor = {
  id: number;
  name: string;
  avatar: string;
  posts: number;
  reputation: number;
  level: 'Ouro' | 'Prata' | 'Bronze' | 'Iniciante';
};

// Dados de tópicos do fórum
export const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "PL 1234/2023: Impactos na transparência pública",
    content: "Gostaria de discutir os possíveis impactos do Projeto de Lei 1234/2023 que altera as regras de transparência pública. Quais serão as consequências práticas para o acesso à informação?",
    category: "projetos",
    tags: ["transparência", "acesso à informação", "PL 1234"],
    author: {
      id: 1,
      name: "Carolina Silva",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    createdAt: "2023-08-15T14:30:00Z",
    updatedAt: "2023-08-15T14:30:00Z",
    upvotes: 45,
    downvotes: 3,
    views: 230,
    comments: 18,
    isPinned: true,
    isLocked: false
  },
  {
    id: 2,
    title: "Análise do desempenho dos deputados na atual legislatura",
    content: "Vamos analisar o desempenho dos deputados na atual legislatura com base em métricas como presença em votações, projetos apresentados e aprovados.",
    category: "politicos",
    tags: ["deputados", "desempenho", "legislatura"],
    author: {
      id: 2,
      name: "Rafael Mendes",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    createdAt: "2023-08-10T09:15:00Z",
    updatedAt: "2023-08-12T16:45:00Z",
    upvotes: 38,
    downvotes: 5,
    views: 185,
    comments: 12,
    isPinned: false,
    isLocked: false
  },
  {
    id: 3,
    title: "Preparação para as eleições municipais de 2024",
    content: "Quais são as expectativas para as eleições municipais de 2024? Como podemos nos preparar como eleitores conscientes?",
    category: "eleicoes",
    tags: ["eleições 2024", "municípios", "voto consciente"],
    author: {
      id: 3,
      name: "Amanda Oliveira",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    createdAt: "2023-08-05T11:20:00Z",
    updatedAt: "2023-08-05T11:20:00Z",
    upvotes: 29,
    downvotes: 2,
    views: 142,
    comments: 8,
    isPinned: false,
    isLocked: false
  },
  {
    id: 4,
    title: "Direito à educação: desafios atuais",
    content: "Quais são os principais desafios para garantir o direito à educação de qualidade para todos os cidadãos brasileiros?",
    category: "direitos",
    tags: ["educação", "direitos sociais", "políticas públicas"],
    author: {
      id: 4,
      name: "Pedro Santos",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    createdAt: "2023-07-28T16:40:00Z",
    updatedAt: "2023-07-30T10:25:00Z",
    upvotes: 52,
    downvotes: 1,
    views: 210,
    comments: 23,
    isPinned: false,
    isLocked: false
  },
  {
    id: 5,
    title: "Debate: Reforma tributária - prós e contras",
    content: "Vamos debater os pontos positivos e negativos da recente proposta de reforma tributária. Quais grupos serão beneficiados e quais serão prejudicados?",
    category: "debates",
    tags: ["reforma tributária", "impostos", "economia"],
    author: {
      id: 5,
      name: "Juliana Costa",
      avatar: "https://randomuser.me/api/portraits/women/62.jpg"
    },
    createdAt: "2023-07-20T13:10:00Z",
    updatedAt: "2023-07-25T09:30:00Z",
    upvotes: 67,
    downvotes: 8,
    views: 320,
    comments: 35,
    isPinned: true,
    isLocked: false
  }
];

// Tags populares
export const forumTags: ForumTag[] = [
  { name: "transparência", count: 45 },
  { name: "orçamento público", count: 38 },
  { name: "reforma tributária", count: 36 },
  { name: "eleições 2024", count: 32 },
  { name: "educação", count: 29 },
  { name: "PEC", count: 27 },
  { name: "participação popular", count: 25 },
  { name: "saúde pública", count: 23 },
  { name: "meio ambiente", count: 21 },
  { name: "segurança pública", count: 19 },
  { name: "direitos humanos", count: 17 },
  { name: "infraestrutura", count: 15 }
];

// Top contribuidores
export const forumContributors: ForumContributor[] = [
  {
    id: 1,
    name: "Carolina Silva",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    posts: 87,
    reputation: 1250,
    level: "Ouro"
  },
  {
    id: 3,
    name: "Amanda Oliveira",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    posts: 65,
    reputation: 980,
    level: "Ouro"
  },
  {
    id: 6,
    name: "Marcos Almeida",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    posts: 52,
    reputation: 720,
    level: "Prata"
  },
  {
    id: 2,
    name: "Rafael Mendes",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    posts: 43,
    reputation: 650,
    level: "Prata"
  },
  {
    id: 5,
    name: "Juliana Costa",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    posts: 31,
    reputation: 480,
    level: "Bronze"
  }
];
