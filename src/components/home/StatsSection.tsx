import { Box, Container, Flex, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Icon, Text, useColorModeValue, Image } from '@chakra-ui/react'
import { FaUsers, FaVoteYea, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa'

export function StatsSection() {
  const bgColor = useColorModeValue('gray.50', 'rgba(10, 25, 41, 0.7)')
  const cardBg = useColorModeValue('white', 'rgba(0, 0, 0, 0.2)')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const isDark = useColorModeValue(false, true)
  const headingColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')

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
      position="relative"
      overflow="hidden"
    >
      {/* Mapa de fundo para o modo escuro */}
      {isDark && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.1"
          pointerEvents="none"
          backgroundImage="url('/images/politicians-map.svg')"
          backgroundSize="cover"
          backgroundPosition="center"
        />
      )}
      
      <Container maxW="container.xl" position="relative" zIndex="1">
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
            color={isDark ? "transparent" : headingColor}
          >
            Transparência em Números
          </Heading>
          <Text 
            fontSize="lg" 
            color={textColor}
            textAlign="center"
            maxW="container.md"
          >
            Acompanhamos e analisamos dados de todos os representantes políticos para facilitar o controle social e a participação cidadã.
          </Text>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
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
            >
              {/* Borda superior com efeito de gradiente no modo escuro */}
              {isDark && (
                <Box 
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  height="2px"
                  bgGradient="linear(to-r, transparent, cyberpunk.accent, transparent)"
                />
              )}
              
              <Flex mb={4} align="center">
                <Box
                  borderRadius="full"
                  bg={isDark ? "rgba(0, 255, 255, 0.1)" : "primary.50"}
                  p={3}
                  mr={4}
                >
                  <Icon 
                    as={stat.icon} 
                    boxSize={6} 
                    color={accentColor} 
                  />
                </Box>
                <Heading as="h3" size="md" color={headingColor}>
                  {stat.label}
                </Heading>
              </Flex>
              
              <Stat>
                <StatNumber fontSize="3xl" fontWeight="bold" color={accentColor}>
                  {stat.value}
                </StatNumber>
                <StatHelpText color={textColor}>
                  {stat.description}
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}