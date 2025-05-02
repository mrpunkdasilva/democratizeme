import { Box, Text, VStack, Progress, HStack, useColorModeValue, Flex, Icon } from '@chakra-ui/react'
import { FaCalendarCheck, FaCalendarAlt, FaUsers } from 'react-icons/fa'

export function AttendanceStats() {
  const isDark = useColorModeValue(false, true)
  const cardBg = useColorModeValue('white', 'rgba(10, 25, 41, 0.8)')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const titleColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const iconColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const labelColor = useColorModeValue('gray.600', 'gray.300')
  const valueColor = useColorModeValue('gray.800', 'white')

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={cardBg}
      p={6}
      shadow="sm"
    >
      <VStack align="stretch" spacing={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" color={titleColor}>Presença em Assembleias</Text>
          <Icon as={FaCalendarCheck} color={iconColor} boxSize={5} />
        </Flex>
        
        <VStack align="stretch" spacing={3}>
          <Box>
            <HStack justify="space-between" mb={1}>
              <HStack spacing={2}>
                <Icon as={FaCalendarAlt} color={iconColor} boxSize={3} opacity={0.8} />
                <Text fontSize="sm" color={labelColor}>Sessões Ordinárias</Text>
              </HStack>
              <Text fontSize="sm" fontWeight="bold" color={valueColor}>85%</Text>
            </HStack>
            <Progress value={85} colorScheme="green" borderRadius="full" size="sm" variant={isDark ? "cyberpunk" : "default"} />
          </Box>

          <Box>
            <HStack justify="space-between" mb={1}>
              <HStack spacing={2}>
                <Icon as={FaCalendarAlt} color={iconColor} boxSize={3} opacity={0.8} />
                <Text fontSize="sm" color={labelColor}>Sessões Extraordinárias</Text>
              </HStack>
              <Text fontSize="sm" fontWeight="bold" color={valueColor}>72%</Text>
            </HStack>
            <Progress value={72} colorScheme="blue" borderRadius="full" size="sm" variant={isDark ? "cyberpunk" : "default"} />
          </Box>

          <Box>
            <HStack justify="space-between" mb={1}>
              <HStack spacing={2}>
                <Icon as={FaUsers} color={iconColor} boxSize={3} opacity={0.8} />
                <Text fontSize="sm" color={labelColor}>Comissões</Text>
              </HStack>
              <Text fontSize="sm" fontWeight="bold" color={valueColor}>93%</Text>
            </HStack>
            <Progress value={93} colorScheme="purple" borderRadius="full" size="sm" variant={isDark ? "cyberpunk" : "default"} />
          </Box>
        </VStack>

        <Text fontSize="sm" color={labelColor} opacity={0.8}>
          Total de sessões: 127
        </Text>
      </VStack>
    </Box>
  )
}