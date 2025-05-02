import { Box, Text, VStack, HStack, Avatar, Badge, useColorModeValue } from '@chakra-ui/react'

type Alliance = {
  id: number
  party: string
  type: 'aliado' | 'oposição' | 'neutro'
  representatives: { name: string, image: string }[]
}

const mockAlliances: Alliance[] = [
  {
    id: 1,
    party: 'Partido A',
    type: 'aliado',
    representatives: [
      { name: 'João Silva', image: '/placeholder1.jpg' },
      { name: 'Maria Santos', image: '/placeholder2.jpg' }
    ]
  },
  {
    id: 2,
    party: 'Partido B',
    type: 'oposição',
    representatives: [
      { name: 'Pedro Souza', image: '/placeholder3.jpg' }
    ]
  }
]

export function PartyAlliances() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const getAllianceColor = (type: Alliance['type']) => {
    const colors = {
      aliado: 'green',
      oposição: 'red',
      neutro: 'gray'
    }
    return colors[type]
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
      <Text fontSize="lg" fontWeight="bold" mb={4}>Alianças Partidárias</Text>
      <VStack spacing={4} align="stretch">
        {mockAlliances.map(alliance => (
          <Box key={alliance.id} p={4} borderWidth="1px" borderRadius="md">
            <HStack justify="space-between" mb={3}>
              <Text fontWeight="medium">{alliance.party}</Text>
              <Badge colorScheme={getAllianceColor(alliance.type)}>
                {alliance.type.toUpperCase()}
              </Badge>
            </HStack>
            <HStack spacing={2}>
              {alliance.representatives.map((rep, index) => (
                <Avatar 
                  key={index}
                  name={rep.name}
                  src={rep.image}
                  size="sm"
                  title={rep.name}
                />
              ))}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}