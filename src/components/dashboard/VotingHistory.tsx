import { Box, Text, VStack, HStack, Badge, useColorModeValue } from '@chakra-ui/react'

type Vote = {
  id: number
  title: string
  date: string
  result: 'favor' | 'contra' | 'abstencao'
}

const mockVotes: Vote[] = [
  { id: 1, title: 'PL 123/2023 - Reforma Tributária', date: '2023-08-15', result: 'favor' },
  { id: 2, title: 'PEC 45/2023 - Reforma Administrativa', date: '2023-08-10', result: 'contra' },
  { id: 3, title: 'PL 789/2023 - Lei de Diretrizes Orçamentárias', date: '2023-08-05', result: 'favor' },
]

export function VotingHistory() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const getVoteBadgeColor = (result: Vote['result']) => {
    const colors = {
      favor: 'green',
      contra: 'red',
      abstencao: 'gray'
    }
    return colors[result]
  }

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={bgColor}
      p={6}
      mb={6}
      shadow="sm"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>Histórico de Votações</Text>
      <VStack spacing={4} align="stretch">
        {mockVotes.map(vote => (
          <Box key={vote.id} p={4} borderWidth="1px" borderRadius="md">
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="medium">{vote.title}</Text>
              <Badge colorScheme={getVoteBadgeColor(vote.result)}>
                {vote.result.toUpperCase()}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {new Date(vote.date).toLocaleDateString('pt-BR')}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}