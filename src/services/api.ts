import { Politician } from '../mocks/types'
import { mockPoliticians } from '../mocks/politicians'

// Simulando delays de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  politicians: {
    async getById(id: number): Promise<Politician> {
      await delay(800) // Simula delay de rede
      const politician = mockPoliticians.find(p => p.id === id)
      if (!politician) {
        throw new Error('Político não encontrado')
      }
      return politician
    },

    async list(): Promise<Politician[]> {
      await delay(800)
      return mockPoliticians
    }
  }
}