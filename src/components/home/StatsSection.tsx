import { Box, Container, Flex, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Text, useColorModeValue, Icon } from '@chakra-ui/react'
import { FaUsers, FaVoteYea, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa'

export function StatsSection() {
  const bgColor = useColorModeValue('white', 'rgba(10, 25, 41, 0.7)')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.1)')
  const statBg = useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')
  const isDark = useColorModeValue(false, true)
  const iconColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const labelColor = useColorModeValue('gray.600', 'gray.400')
  const numberColor = useColorModeValue('gray.800', 'cyberpunk.text')

  const stats = [
    { 
      label: 'Políticos Monitorados', 
      value: '594', 
      icon: FaUsers,
      description: 'Deputados federais e senadores'
    },
    { 
      label: 'Votações Analisadas', 
      value: '3.782', 
      icon: FaVoteYea,
      description: 'Desde o início da legislatura'
    },
    { 
      label: 'Projetos de Lei', 
      value: '12.456', 
      icon: FaFileAlt,
      description: 'Propostos e em tramitação'
    },
    { 
      label: 'Gastos Públicos', 
      value: 'R$ 4,2 bi', 
      icon: FaMoneyBillWave,
      description: 'Monitorados em tempo real'
    }
  ]

  return (
    <Box 
      py={16} 
      bg={bgColor}
      borderTop="1px"
      borderBottom="1px"
      borderColor={borderColor}
      position="relative"
    >
      <Container maxW="container.xl">
        <Flex 
          direction="column" 
          align="center" 
          mb={12}
        >
          <Heading 
            as="h2" 
            size="xl" 
            textAlign="center"
            mb={4}
            bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : undefined}
            bgClip={isDark ? "text" : undefined}
            color={isDark ? "transparent" : "gray.800"}
          >
            Transparência em Números
          </Heading>
          <Text 
            fontSize="lg" 
            color={labelColor}
            textAlign="center"
            maxW="container.md"
          >
            Acompanhamos e analisamos dados de todos os representantes políticos para 
            facilitar o controle social e a participação cidadã.
          </Text>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {stats.map((stat, index) => (
            <Box 
              key={index}
              bg={statBg}
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
            >
              <Flex mb={4} align="center">
                <Icon 
                  as={stat.icon} 
                  boxSize={10} 
                  color={iconColor} 
                  mr={3}
                  opacity={0.9}
                />
                <Stat>
                  <StatLabel fontSize="md" color={labelColor}>{stat.label}</StatLabel>
                  <StatNumber 
                    fontSize="3xl" 
                    fontWeight="bold" 
                    color={numberColor}
                    bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : undefined}
                    bgClip={isDark ? "text" : undefined}
                  >
                    {stat.value}
                  </StatNumber>
                </Stat>
              </Flex>
              <Text fontSize="sm" color={labelColor}>{stat.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}