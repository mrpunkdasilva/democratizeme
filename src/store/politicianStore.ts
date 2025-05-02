import { create } from 'zustand'
import { api } from '../services/api'
import type { Politician } from '../mocks/types'

type PoliticianStore = {
  selectedPolitician: Politician | null
  isLoading: boolean
  error: string | null
  setSelectedPolitician: (politician: Politician) => void
  fetchPoliticianData: (id: number) => Promise<void>
}

export const usePoliticianStore = create<PoliticianStore>((set) => ({
  selectedPolitician: null,
  isLoading: false,
  error: null,
  
  setSelectedPolitician: (politician) => set({ selectedPolitician: politician }),
  
  fetchPoliticianData: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const politician = await api.politicians.getById(id)
      set({ selectedPolitician: politician, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao carregar dados do político',
        isLoading: false 
      })
    }
  }
}))