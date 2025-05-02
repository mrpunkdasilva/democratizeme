import { Politician, VoteResult, LawStatus, AllianceType } from './types'

export const mockPoliticians: Politician[] = [
  {
    id: 1,
    name: "Maria Silva",
    party: "PDB",
    role: "Deputada Federal",
    image: "https://ui-avatars.com/api/?name=Maria+Silva&background=random",
    status: "active",
    expenses: {
      total: 234567.89,
      monthly: [
        { month: "Jan", amount: 19500 },
        { month: "Fev", amount: 21000 },
        { month: "Mar", amount: 18900 },
        { month: "Abr", amount: 22100 },
        { month: "Mai", amount: 20500 },
        { month: "Jun", amount: 19800 }
      ]
    },
    votes: [
      { id: 1, title: "PL 123/2023 - Reforma Tributária", date: "2023-08-15", result: "favor" as VoteResult },
      { id: 2, title: "PEC 45/2023 - Reforma Administrativa", date: "2023-08-10", result: "contra" as VoteResult },
      { id: 3, title: "PL 789/2023 - Lei de Diretrizes Orçamentárias", date: "2023-08-05", result: "favor" as VoteResult }
    ],
    laws: [
      { id: 1, title: "PL 456/2023 - Incentivos à Energia Solar", status: "tramitando" as LawStatus, progress: 45, date: "2023-07-20" },
      { id: 2, title: "PL 789/2023 - Mobilidade Urbana", status: "aprovado" as LawStatus, progress: 100, date: "2023-06-15" },
      { id: 3, title: "PL 012/2023 - Reforma Educacional", status: "arquivado" as LawStatus, progress: 30, date: "2023-05-10" }
    ],
    bio: {
      education: "Direito - Universidade Federal",
      experience: [
        "Vereadora (2016-2020)",
        "Deputada Federal (2020-atual)",
        "Presidente da Comissão de Direitos Humanos (2021-2022)"
      ],
      achievements: [
        "Lei de Transparência Municipal",
        "Programa de Modernização Escolar",
        "Projeto Cidade Sustentável"
      ]
    },
    alliances: [
      {
        id: 1,
        party: "Partido A",
        type: "aliado" as AllianceType,
        representatives: [
          { name: "João Silva", image: "https://ui-avatars.com/api/?name=Joao+Silva&background=random" },
          { name: "Pedro Santos", image: "https://ui-avatars.com/api/?name=Pedro+Santos&background=random" }
        ]
      },
      {
        id: 2,
        party: "Partido B",
        type: "oposição" as AllianceType,
        representatives: [
          { name: "Ana Oliveira", image: "https://ui-avatars.com/api/?name=Ana+Oliveira&background=random" },
          { name: "Carlos Souza", image: "https://ui-avatars.com/api/?name=Carlos+Souza&background=random" }
        ]
      },
      {
        id: 3,
        party: "Partido C",
        type: "neutro" as AllianceType,
        representatives: [
          { name: "Paula Costa", image: "https://ui-avatars.com/api/?name=Paula+Costa&background=random" }
        ]
      }
    ]
  }
]