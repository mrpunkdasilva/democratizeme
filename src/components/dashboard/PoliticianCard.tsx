import { 
  Box, 
  Image, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  useColorModeValue,
  Spinner,
  VisuallyHidden,
  Tooltip
} from '@chakra-ui/react'
import { usePoliticianStore } from '../../store/politicianStore'
import { useEffect } from 'react'

export function PoliticianCard() {
  const { selectedPolitician, isLoading, error, fetchPoliticianData } = usePoliticianStore()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.200')

  useEffect(() => {
    fetchPoliticianData(1) // ID fixo para demonstração
  }, [])

  if (isLoading) {
    return (
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        borderColor={borderColor}
        bg={bgColor}
        p={6}
        shadow="sm"
        display="flex"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    )
  }

  if (error || !selectedPolitician) {
    return (
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        borderColor={borderColor}
        bg={bgColor}
        p={6}
        shadow="sm"
      >
        <Text color="red.500">{error || 'Dados não encontrados'}</Text>
      </Box>
    )
  }

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={bgColor}
      p={6}
      shadow="sm"
      role="article"
      aria-labelledby="politician-name"
    >
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Image
            borderRadius="full"
            boxSize="100px"
            src={selectedPolitician.image}
            alt={`Foto de ${selectedPolitician.name}`}
            fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPolitician.name)}&size=100`}
          />
          <VStack align="start" spacing={1}>
            <Text 
              id="politician-name"
              fontSize="xl" 
              fontWeight="bold"
              color={textColor}
            >
              {selectedPolitician.name}
            </Text>
            <HStack spacing={2}>
              <Tooltip label={`Partido: ${selectedPolitician.party}`}>
                <Badge colorScheme="blue">
                  {selectedPolitician.party}
                  <VisuallyHidden>Partido</VisuallyHidden>
                </Badge>
              </Tooltip>
              <Tooltip label={`Status: ${selectedPolitician.status === 'active' ? 'Em exercício' : 'Inativo'}`}>
                <Badge 
                  colorScheme={selectedPolitician.status === 'active' ? 'green' : 'red'}
                  aria-label={`Status: ${selectedPolitician.status === 'active' ? 'Em exercício' : 'Inativo'}`}
                >
                  {selectedPolitician.status === 'active' ? 'Em exercício' : 'Inativo'}
                </Badge>
              </Tooltip>
            </HStack>
          </VStack>
        </HStack>

        <Box>
          <Text fontSize="sm" fontWeight="bold" mb={2}>Índices de Desempenho</Text>
          <HStack justify="space-between">
            <VStack align="start">
              <Text fontSize="sm" color="gray.500">Presença</Text>
              <Text fontWeight="bold">85%</Text>
            </VStack>
            <VStack align="start">
              <Text fontSize="sm" color="gray.500">Projetos</Text>
              <Text fontWeight="bold">23</Text>
            </VStack>
            <VStack align="start">
              <Text fontSize="sm" color="gray.500">Aprovação</Text>
              <Text fontWeight="bold">76%</Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}