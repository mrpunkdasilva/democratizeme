export type PoliticianStatus = 'active' | 'inactive'
export type VoteResult = 'favor' | 'contra' | 'abstencao'
export type LawStatus = 'tramitando' | 'aprovado' | 'arquivado'
export type AllianceType = 'aliado' | 'oposição' | 'neutro'

export interface Politician {
  id: number
  name: string
  party: string
  role: string
  image: string
  status: PoliticianStatus
  expenses: {
    total: number
    monthly: Array<{
      month: string
      amount: number
    }>
  }
  votes: Array<{
    id: number
    title: string
    date: string
    result: VoteResult
  }>
  laws: Array<{
    id: number
    title: string
    status: LawStatus
    progress: number
    date: string
  }>
  bio: {
    education: string
    experience: string[]
    achievements: string[]
  }
  alliances: Array<{
    id: number
    party: string
    type: AllianceType
    representatives: Array<{
      name: string
      image: string
    }>
  }>
}