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
  HStack,
  Tooltip,
  IconButton
} from '@chakra-ui/react'
import { FaCalendarDay, FaVoteYea, FaClock, FaMapMarkerAlt, FaBell } from 'react-icons/fa'
import { useNotifications } from '../../contexts/NotificationContext'
import { 
  VotingDay, 
  VotingEvent, 
  getImportanceColor, 
  getTypeColor, 
  generateCurrentVotingCalendar 
} from '../../mocks/votingCalendar'
import { useState, useEffect } from 'react'

export function VotingCalendar() {
  const [votingDays, setVotingDays] = useState<VotingDay[]>([])
  
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const todayBg = useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.15)')
  const todayBorder = useColorModeValue('blue.500', 'blue.300')
  const headerBg = useColorModeValue('gray.100', 'gray.700')
  const todayHeaderBg = useColorModeValue('blue.500', 'blue.600')
  const { addNotification } = useNotifications()
  
  // Carregar dados do calendário
  useEffect(() => {
    // Em um cenário real, isso poderia ser uma chamada de API
    const calendar = generateCurrentVotingCalendar()
    setVotingDays(calendar)
  }, [])
  
  // Função para criar uma notificação para um evento
  const createEventNotification = (event: VotingEvent, day: VotingDay) => {
    addNotification({
      title: `Lembrete: ${event.title}`,
      message: `Votação agendada para ${day.formattedDate} às ${event.time} em ${event.location}`,
      type: 'info',
      link: '/monitor'
    })
  }
  
  if (votingDays.length === 0) {
    return (
      <Box p={4} textAlign="center" color={mutedColor}>
        Carregando calendário de votações...
      </Box>
    )
  }
  
  return (
    <VStack spacing={6} align="stretch">
      {votingDays.map((day) => (
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
            bg={day.isToday ? todayHeaderBg : headerBg} 
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
            {day.events.length > 0 ? (
              day.events.map((event) => (
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
                    <Tooltip label="Receber notificação">
                      <IconButton
                        aria-label="Ativar notificação"
                        icon={<Icon as={FaBell} />}
                        size="xs"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          createEventNotification(event, day);
                        }}
                      />
                    </Tooltip>
                  </HStack>
                </Box>
              ))
            ) : (
              <Box p={4} textAlign="center" color={mutedColor}>
                Nenhum evento agendado para este dia.
              </Box>
            )}
          </VStack>
        </Box>
      ))}
    </VStack>
  )
}