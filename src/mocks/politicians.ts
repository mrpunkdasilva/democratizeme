import { Politician as PoliticianType } from './types';

export type PoliticianStats = {
  id: number;
  name: string;
  party: string;
  state: string;
  role: string;
  avatar: string;
  stats: {
    overall: number;
    presence: number;
    projects: number;
    transparency: number;
    expenses: number;
    trend: number;
  };
}

export const mockPoliticians: PoliticianStats[] = [
  {
    id: 1,
    name: "Ana Silva",
    party: "PSD",
    state: "SP",
    role: "Deputada Federal",
    avatar: "https://i.pravatar.cc/150?img=1",
    stats: {
      overall: 87,
      presence: 92,
      projects: 78,
      transparency: 85,
      expenses: 25,
      trend: 3
    }
  },
  {
    id: 2,
    name: "Carlos Pereira",
    party: "PT",
    state: "RJ",
    role: "Senador",
    avatar: "https://i.pravatar.cc/150?img=2",
    stats: {
      overall: 75,
      presence: 85,
      projects: 60,
      transparency: 70,
      expenses: 30,
      trend: -2
    }
  },
  {
    id: 3,
    name: "Fernanda Costa",
    party: "MDB",
    state: "MG",
    role: "Deputada Estadual",
    avatar: "https://i.pravatar.cc/150?img=3",
    stats: {
      overall: 90,
      presence: 95,
      projects: 80,
      transparency: 90,
      expenses: 15,
      trend: 5
    }
  },
  {
    id: 4,
    name: "João Oliveira",
    party: "PP",
    state: "BA",
    role: "Deputado Distrital",
    avatar: "https://i.pravatar.cc/150?img=4",
    stats: {
      overall: 60,
      presence: 70,
      projects: 40,
      transparency: 60,
      expenses: 40,
      trend: -1
    }
  },
  {
    id: 5,
    name: "Maria Santos",
    party: "PSOL",
    state: "RS",
    role: "Deputada Federal",
    avatar: "https://i.pravatar.cc/150?img=5",
    stats: {
      overall: 80,
      presence: 88,
      projects: 70,
      transparency: 82,
      expenses: 20,
      trend: 4
    }
  },
  {
    id: 6,
    name: "Pedro Lima",
    party: "PDT",
    state: "SC",
    role: "Deputado Estadual",
    avatar: "https://i.pravatar.cc/150?img=6",
    stats: {
      overall: 70,
      presence: 80,
      projects: 50,
      transparency: 75,
      expenses: 35,
      trend: 2
    }
  },
  {
    id: 7,
    name: "Rafaela Ferreira",
    party: "PV",
    state: "PR",
    role: "Deputada Federal",
    avatar: "https://i.pravatar.cc/150?img=7",
    stats: {
      overall: 85,
      presence: 90,
      projects: 75,
      transparency: 88,
      expenses: 10,
      trend: 6
    }
  },
  {
    id: 8,
    name: "Tiago Costa",
    party: "PMDB",
    state: "CE",
    role: "Deputado Distrital",
    avatar: "https://i.pravatar.cc/150?img=8",
    stats: {
      overall: 65,
      presence: 75,
      projects: 45,
      transparency: 65,
      expenses: 45,
      trend: -3
    }
  },
  {
    id: 9,
    name: "Vânia Souza",
    party: "PCdoB",
    state: "AM",
    role: "Deputada Federal",
    avatar: "https://i.pravatar.cc/150?img=9",
    stats: {
      overall: 95,
      presence: 100,
      projects: 85,
      transparency: 95,
      expenses: 5,
      trend: 7
    }
  },
  {
    id: 10,
    name: "Wagner Pereira",
    party: "PS",
    state: "GO",
    role: "Deputado Estadual",
    avatar: "https://i.pravatar.cc/150?img=10",
    stats: {
      overall: 78,
      presence: 85,
      projects: 65,
      transparency: 80,
      expenses: 28,
      trend: 1
    }
  }
];
