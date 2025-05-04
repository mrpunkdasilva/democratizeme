import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Flex, 
  Icon, 
  Progress, 
  Divider,
  useColorModeValue,
  Tooltip,
  Avatar,
  AvatarGroup
} from '@chakra-ui/react'
import { FaCheckCircle, FaTimesCircle, FaUserAlt, FaCalendarAlt, FaBuilding } from 'react-icons/fa'
import { recentVotings } from '../../mocks/recentVotings'

export function RecentVotings() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const headerBg = useColorModeValue('gray.100', 'gray.700')
  
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
  }
  
  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'green';
      case 'rejeitado': return 'red';
      case 'adiado': return 'orange';
      case 'em andamento': return 'blue';
      default: return 'gray';
    }
  }
  
  return (
    <VStack spacing={6} align="stretch">
      {recentVotings.length === 0 ? (
        <Box p={4} textAlign="center" color={mutedColor}>
          Nenhuma votação recente encontrada.
        </Box>
      ) : (
        recentVotings.map((voting) => (
          <Box 
            key={voting.id}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            bg={cardBg}
            overflow="hidden"
            boxShadow="sm"
          >
            <Flex 
              p={4} 
              bg={headerBg}
              color={textColor}
              align="center"
              justify="space-between"
            >
              <HStack>
                <Icon as={FaBuilding} mr={2} />
                <Text fontWeight="bold">{voting.house}</Text>
              </HStack>
              <Badge colorScheme={getStatusColor(voting.status)}>
                {voting.status.toUpperCase()}
              </Badge>
            </Flex>
            
            <Box p={4}>
              <Text fontWeight="medium" fontSize="lg" mb={2}>
                {voting.title}
              </Text>
              
              <Text fontSize="sm" color={mutedColor} mb={4}>
                {voting.description}
              </Text>
              
              <HStack spacing={4} mb={4} color={mutedColor} fontSize="sm">
                <Flex align="center">
                  <Icon as={FaCalendarAlt} mr={1} />
                  <Text>{formatDate(voting.date)}</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaUserAlt} mr={1} />
                  <Text>{voting.author}</Text>
                </Flex>
              </HStack>
              
              <Divider mb={4} />
              
              <Box mb={4}>
                <Flex justify="space-between" mb={1}>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" />
                    <Text fontWeight="medium">A favor: {voting.votesInFavor}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="medium">Contra: {voting.votesAgainst}</Text>
                    <Icon as={FaTimesCircle} color="red.500" />
                  </HStack>
                </Flex>
                
                <Progress 
                  value={(voting.votesInFavor / (voting.votesInFavor + voting.votesAgainst)) * 100} 
                  colorScheme="green" 
                  bg="red.100"
                  borderRadius="full"
                  size="sm"
                  mb={2}
                />
                
                <Text fontSize="xs" color={mutedColor} textAlign="right">
                  Abstenções: {voting.abstentions}
                </Text>
              </Box>
              
              {voting.keyVoters && (
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Principais votantes:
                  </Text>
                  <AvatarGroup size="sm" max={5}>
                    {voting.keyVoters.map((voter, index) => (
                      <Tooltip key={index} label={voter.name}>
                        <Avatar 
                          name={voter.name} 
                          src={voter.avatar} 
                          borderColor={voter.vote === 'favor' ? 'green.500' : 'red.500'}
                          borderWidth="2px"
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
              )}
            </Box>
          </Box>
        ))
      )}
    </VStack>
  )
}