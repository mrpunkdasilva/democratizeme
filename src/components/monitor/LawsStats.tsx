import { 
  SimpleGrid, 
  Box, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Icon, 
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import { FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export function LawsStats() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const isDark = useColorModeValue(false, true)
  
  const stats = [
    {
      label: 'Projetos em Tramitação',
      value: '1.245',
      icon: FaFileAlt,
      color: 'blue.500',
      change: '+12 esta semana'
    },
    {
      label: 'Projetos Aprovados',
      value: '328',
      icon: FaCheckCircle,
      color: 'green.500',
      change: '+3 este mês'
    },
    {
      label: 'Projetos Arquivados',
      value: '567',
      icon: FaTimesCircle,
      color: 'red.500',
      change: '+8 este mês'
    }
  ]
  
  return (
    <>
      {stats.map((stat, index) => (
        <Box
          key={index}
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow={isDark ? "0 4px 20px rgba(0, 255, 255, 0.05)" : "sm"}
          transition="all 0.3s"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: isDark ? "0 8px 30px rgba(0, 255, 255, 0.1)" : "md"
          }}
          position="relative"
          overflow="hidden"
        >
          {isDark && (
            <Box 
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="3px"
              bgGradient="linear(to-r, primary.400, cyberpunk.accent)"
            />
          )}
          
          <Flex justify="space-between" align="flex-start">
            <Stat>
              <StatLabel color={mutedColor} fontSize="md">{stat.label}</StatLabel>
              <StatNumber fontSize="3xl" fontWeight="bold" color={textColor} my={2}>
                {stat.value}
              </StatNumber>
              <StatHelpText color={mutedColor} m={0}>
                {stat.change}
              </StatHelpText>
            </Stat>
            <Box
              p={2}
              bg={isDark ? `rgba(${stat.color === 'blue.500' ? '33, 150, 243' : stat.color === 'green.500' ? '76, 175, 80' : '244, 67, 54'}, 0.1)` : `${stat.color.split('.')[0]}.50`}
              borderRadius="full"
              color={stat.color}
            >
              <Icon as={stat.icon} boxSize={6} />
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  )
}