import { 
  Box, 
  Grid, 
  Flex, 
  Text, 
  Badge, 
  useColorModeValue,
  Icon,
  Divider,
  VStack,
  HStack
} from '@chakra-ui/react'
import { FaCalendarDay, FaVoteYea, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

export function VotingCalendar() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const todayBg = useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.15)')
  const todayBorder = useColorModeValue('blue.500', 'blue.300')
  
  // Dados mockados de votações agendadas
  const mockVotings = [
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
  
  // Função para obter a cor do badge com base na importância
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'alta': return 'red';
      case 'média': return 'orange';
      case 'baixa': return 'blue';
      default: return 'gray';
    }
  };
  
  // Função para obter a cor do badge com base no tipo
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'votação': return 'green';
      case 'discussão': return 'purple';
      case 'audiência': return 'teal';
      default: return 'gray';
    }
  };
  
  return (
    <VStack spacing={6} align="stretch">
      {mockVotings.map((day) => (
        <Box 
          key={day.id}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={day.isToday ? todayBorder : borderColor}
          bg={day.isToday ? todayBg : cardBg}
          overflow="hidden"
          boxShadow="sm"
        >
          <Flex 
            p={4} 
            bg={day.isToday ? 'blue.500' : 'gray.100'} 
            color={day.isToday ? 'white' : textColor}
            align="center"
          >
            <Icon as={FaCalendarDay} mr={2} />
            <Text fontWeight="bold">{day.dayOfWeek}</Text>
            <Text ml={2}>{day.formattedDate}</Text>
            {day.isToday && (
              <Badge ml={2} colorScheme="blue" variant="solid">
                Hoje
              </Badge>
            )}
          </Flex>
          
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            {day.events.map((event) => (
              <Box key={event.id} p={4} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="medium" color={textColor}>
                    {event.title}
                  </Text>
                  <HStack>
                    <Badge colorScheme={getTypeColor(event.type)}>
                      {event.type.toUpperCase()}
                    </Badge>
                    <Badge colorScheme={getImportanceColor(event.importance)}>
                      {event.importance.toUpperCase()}
                    </Badge>
                  </HStack>
                </Flex>
                
                <HStack spacing={4} color={mutedColor} fontSize="sm">
                  <Flex align="center">
                    <Icon as={FaClock} mr={1} />
                    <Text>{event.time}</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FaMapMarkerAlt} mr={1} />
                    <Text>{event.location}</Text>
                  </Flex>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  )
}
