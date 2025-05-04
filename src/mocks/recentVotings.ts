// Tipos para votações recentes
export type KeyVoter = {
  name: string;
  avatar: string;
  vote: 'favor' | 'contra' | 'abstenção';
};

export type RecentVoting = {
  id: number;
  title: string;
  description: string;
  date: string;
  house: 'Câmara dos Deputados' | 'Senado Federal' | 'Congresso Nacional';
  author: string;
  status: 'aprovado' | 'rejeitado' | 'adiado' | 'em andamento';
  votesInFavor: number;
  votesAgainst: number;
  abstentions: number;
  keyVoters?: KeyVoter[];
};

// Dados mockados de votações recentes
export const recentVotings: RecentVoting[] = [
  {
    id: 1,
    title: 'PL 123/2023 - Reforma Tributária',
    description: 'Projeto de lei que altera o sistema tributário nacional, simplificando impostos e contribuições.',
    date: '2023-08-15T14:30:00',
    house: 'Câmara dos Deputados',
    author: 'Dep. Carlos Silva',
    status: 'aprovado',
    votesInFavor: 312,
    votesAgainst: 158,
    abstentions: 43,
    keyVoters: [
      {
        name: 'Carlos Silva',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        vote: 'favor'
      },
      {
        name: 'Ana Oliveira',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        vote: 'favor'
      },
      {
        name: 'Roberto Santos',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        vote: 'contra'
      },
      {
        name: 'Juliana Costa',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        vote: 'favor'
      },
      {
        name: 'Marcos Pereira',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        vote: 'contra'
      },
      {
        name: 'Fernanda Lima',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        vote: 'favor'
      }
    ]
  },
  {
    id: 2,
    title: 'PEC 45/2023 - Reforma Administrativa',
    description: 'Proposta de emenda constitucional que modifica a estrutura administrativa do Estado brasileiro.',
    date: '2023-08-10T16:00:00',
    house: 'Senado Federal',
    author: 'Sen. Marcos Oliveira',
    status: 'rejeitado',
    votesInFavor: 31,
    votesAgainst: 45,
    abstentions: 5,
    keyVoters: [
      {
        name: 'Marcos Oliveira',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        vote: 'favor'
      },
      {
        name: 'Patrícia Alves',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
        vote: 'contra'
      },
      {
        name: 'José Cardoso',
        avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
        vote: 'contra'
      }
    ]
  },
  {
    id: 3,
    title: 'PL 789/2023 - Lei de Diretrizes Orçamentárias',
    description: 'Estabelece as metas e prioridades para o orçamento do próximo ano fiscal.',
    date: '2023-08-05T10:00:00',
    house: 'Congresso Nacional',
    author: 'Comissão de Orçamento',
    status: 'em andamento',
    votesInFavor: 245,
    votesAgainst: 198,
    abstentions: 67
  },
  {
    id: 4,
    title: 'PL 456/2023 - Proteção de Dados Pessoais',
    description: 'Regulamenta o uso e proteção de dados pessoais por empresas e órgãos públicos.',
    date: '2023-07-28T09:15:00',
    house: 'Câmara dos Deputados',
    author: 'Dep. Marina Santos',
    status: 'aprovado',
    votesInFavor: 289,
    votesAgainst: 112,
    abstentions: 31,
    keyVoters: [
      {
        name: 'Marina Santos',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        vote: 'favor'
      },
      {
        name: 'Paulo Mendes',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        vote: 'favor'
      },
      {
        name: 'Carla Ferreira',
        avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
        vote: 'contra'
      }
    ]
  },
  {
    id: 5,
    title: 'PL 321/2023 - Incentivos à Energia Renovável',
    description: 'Estabelece incentivos fiscais para empresas que investem em energia renovável.',
    date: '2023-07-20T13:45:00',
    house: 'Senado Federal',
    author: 'Sen. Ricardo Almeida',
    status: 'adiado',
    votesInFavor: 38,
    votesAgainst: 32,
    abstentions: 11,
    keyVoters: [
      {
        name: 'Ricardo Almeida',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        vote: 'favor'
      },
      {
        name: 'Luciana Costa',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        vote: 'favor'
      }
    ]
  }
];