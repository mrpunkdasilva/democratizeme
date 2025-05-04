// Tipos para o calendário de votações
export type VotingEvent = {
  id: number;
  title: string;
  time: string;
  location: string;
  type: 'votação' | 'discussão' | 'audiência';
  importance: 'alta' | 'média' | 'baixa';
};

export type VotingDay = {
  id: number;
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  isToday: boolean;
  events: VotingEvent[];
};

// Dados mockados de votações agendadas
export const mockVotingCalendar: VotingDay[] = [
  {
    id: 1,
    date: '2023-08-15',
    formattedDate: '15/08/2023',
    dayOfWeek: 'Terça-feira',
    isToday: true,
    events: [
      {
        id: 101,
        title: 'PL 123/2023 - Reforma Tributária',
        time: '14:30',
        location: 'Plenário Principal',
        type: 'votação',
        importance: 'alta'
      },
      {
        id: 102,
        title: 'PEC 45/2023 - Reforma Administrativa',
        time: '16:00',
        location: 'Plenário Principal',
        type: 'discussão',
        importance: 'média'
      }
    ]
  },
  {
    id: 2,
    date: '2023-08-16',
    formattedDate: '16/08/2023',
    dayOfWeek: 'Quarta-feira',
    isToday: false,
    events: [
      {
        id: 103,
        title: 'PL 789/2023 - Lei de Diretrizes Orçamentárias',
        time: '10:00',
        location: 'Comissão de Orçamento',
        type: 'votação',
        importance: 'alta'
      }
    ]
  },
  {
    id: 3,
    date: '2023-08-17',
    formattedDate: '17/08/2023',
    dayOfWeek: 'Quinta-feira',
    isToday: false,
    events: [
      {
        id: 104,
        title: 'PDL 56/2023 - Acordos Internacionais',
        time: '09:30',
        location: 'Comissão de Relações Exteriores',
        type: 'votação',
        importance: 'média'
      },
      {
        id: 105,
        title: 'PL 432/2023 - Incentivos à Energia Renovável',
        time: '14:00',
        location: 'Comissão de Meio Ambiente',
        type: 'audiência',
        importance: 'baixa'
      }
    ]
  }
];

// Funções utilitárias para o calendário de votações
export const getImportanceColor = (importance: string): string => {
  switch (importance) {
    case 'alta': return 'red';
    case 'média': return 'orange';
    case 'baixa': return 'blue';
    default: return 'gray';
  }
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'votação': return 'green';
    case 'discussão': return 'purple';
    case 'audiência': return 'teal';
    default: return 'gray';
  }
};

// Função para gerar dados de calendário atualizados com base na data atual
export const generateCurrentVotingCalendar = (): VotingDay[] => {
  const today = new Date();
  const calendar = [...mockVotingCalendar];
  
  // Atualizar quais dias são "hoje"
  return calendar.map((day, index) => {
    // Para fins de demonstração, consideramos o primeiro dia como "hoje"
    const isToday = index === 0;
    
    // Atualizar datas para refletir dias consecutivos a partir de hoje
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + index);
    
    const formattedDate = currentDate.toLocaleDateString('pt-BR');
    const dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(currentDate);
    
    return {
      ...day,
      date: currentDate.toISOString().split('T')[0],
      formattedDate,
      dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
      isToday
    };
  });
};