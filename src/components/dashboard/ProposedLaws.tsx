import { Box, Text, VStack, HStack, Badge, Progress, useColorModeValue } from '@chakra-ui/react'

type Law = {
  id: number
  title: string
  status: 'tramitando' | 'aprovado' | 'arquivado'
  progress: number
  date: string
}

const mockLaws: Law[] = [
  { id: 1, title: 'PL 456/2023 - Incentivos à Energia Solar', status: 'tramitando', progress: 45, date: '2023-07-20' },
  { id: 2, title: 'PL 789/2023 - Mobilidade Urbana', status: 'aprovado', progress: 100, date: '2023-06-15' },
  { id: 3, title: 'PL 012/2023 - Reforma Educacional', status: 'arquivado', progress: 30, date: '2023-05-10' },
]

export function ProposedLaws() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const getStatusColor = (status: Law['status']) => {
    const colors = {
      tramitando: 'blue',
      aprovado: 'green',
      arquivado: 'red'
    }
    return colors[status]
  }

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={bgColor}
      p={6}
      shadow="sm"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>Projetos de Lei Propostos</Text>
      <VStack spacing={4} align="stretch">
        {mockLaws.map(law => (
          <Box key={law.id} p={4} borderWidth="1px" borderRadius="md">
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="medium">{law.title}</Text>
              <Badge colorScheme={getStatusColor(law.status)}>
                {law.status.toUpperCase()}
              </Badge>
            </HStack>
            <Progress 
              value={law.progress} 
              colorScheme={getStatusColor(law.status)} 
              size="sm" 
              mb={2}
            />
            <Text fontSize="sm" color="gray.500">
              Proposto em {new Date(law.date).toLocaleDateString('pt-BR')}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}