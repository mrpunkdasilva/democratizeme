import { Box, Container, Flex, Heading, SimpleGrid, Text, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaChartLine, FaSearch, FaComments, FaVoteYea, FaFileAlt, FaUserShield } from 'react-icons/fa'

export function FeatureSection() {
  const bgColor = useColorModeValue('white', 'rgba(10, 25, 41, 0.7)')
  const cardBg = useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const isDark = useColorModeValue(false, true)
  const headingColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const iconColor = useColorModeValue('primary.500', 'cyberpunk.accent')

  const features = [
    {
      title: 'Dashboard Interativo',
      description: 'Visualize dados e estatísticas sobre os políticos em um painel interativo e intuitivo.',
      icon: FaChartLine
    },
    {
      title: 'Busca Avançada',
      description: 'Encontre políticos por nome, partido, estado ou posicionamento em votações específicas.',
      icon: FaSearch
    },
    {
      title: 'Histórico de Votações',
      description: 'Acompanhe como cada político votou em projetos de lei e outras proposições.',
      icon: FaVoteYea
    },
    {
      title: 'Projetos de Lei',
      description: 'Acesse os projetos de lei propostos e seu status atual de tramitação.',
      icon: FaFileAlt
    },
    {
      title: 'Fórum de Discussão',
      description: 'Participe de debates sobre propostas legislativas e atuação dos políticos.',
      icon: FaComments
    },
    {
      title: 'Alertas de Transparência',
      description: 'Receba notificações sobre irregularidades e processos envolvendo políticos.',
      icon: FaUserShield
    }
  ]

  return (
    <Box py={16} bg={bgColor}>
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
            color={isDark ? "transparent" : headingColor}
          >
            Funcionalidades da Plataforma
          </Heading>
          <Text 
            fontSize="lg" 
            color={textColor}
            textAlign="center"
            maxW="container.md"
            mb={8}
          >
            Ferramentas para acompanhar, analisar e entender a atuação dos seus representantes
          </Text>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {features.map((feature, index) => (
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
                    as={feature.icon} 
                    boxSize={6} 
                    color={iconColor} 
                  />
                </Box>
                <Heading as="h3" size="md" color={headingColor}>
                  {feature.title}
                </Heading>
              </Flex>
              
              <Text color={textColor}>
                {feature.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}