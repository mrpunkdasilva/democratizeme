import { Politician } from '../mocks/types'
import { mockPoliticians, PoliticianStats } from '../mocks/politicians'

// Simulando delays de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Função para converter PoliticianStats para Politician
const convertToPolitician = (stats: PoliticianStats): Politician => {
  return {
    id: stats.id,
    name: stats.name,
    party: stats.party,
    role: stats.role,
    image: stats.avatar,
    status: 'active',
    expenses: {
      total: stats.stats.expenses * 1000, // Valor fictício
      monthly: [
        { month: 'Janeiro', amount: stats.stats.expenses * 100 },
        { month: 'Fevereiro', amount: stats.stats.expenses * 90 },
        { month: 'Março', amount: stats.stats.expenses * 110 }
      ]
    },
    votes: [],
    laws: [],
    bio: {
      education: 'Formação acadêmica',
      experience: ['Experiência 1', 'Experiência 2'],
      achievements: ['Conquista 1', 'Conquista 2']
    },
    alliances: []
  };
};

export const api = {
  politicians: {
    async getById(id: number): Promise<Politician> {
      await delay(800) // Simula delay de rede
      const politician = mockPoliticians.find(p => p.id === id)
      if (!politician) {
        throw new Error('Político não encontrado')
      }
      return convertToPolitician(politician);
    },

    async list(): Promise<Politician[]> {
      await delay(800)
      return mockPoliticians.map(convertToPolitician);
    }
  }
}