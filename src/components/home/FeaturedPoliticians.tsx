import { Box, Container, Heading, Text, SimpleGrid, Avatar, Flex, Badge, useColorModeValue, Button, Icon } from '@chakra-ui/react'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import NextLink from 'next/link'

// Dados mockados para demonstração
const featuredPoliticians = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Deputada Federal',
    party: 'PSD',
    state: 'SP',
    image: '/placeholder1.jpg',
    stats: { presence: 92, projects: 34 }
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    role: 'Senador',
    party: 'MDB',
    state: 'RJ',
    image: '/placeholder2.jpg',
    stats: { presence: 88, projects: 27 }
  },
  {
    id: 3,
    name: 'Mariana Costa',
    role: 'Deputada Federal',
    party: 'PSOL',
    state: 'MG',
    image: '/placeholder3.jpg',
    stats: { presence: 95, projects: 42 }
  },
  {
    id: 4,
    name: 'Roberto Almeida',
    role: 'Deputado Federal',
    party: 'NOVO',
    state: 'RS',
    image: '/placeholder4.jpg',
    stats: { presence: 90, projects: 31 }
  }
]

export function FeaturedPoliticians() {
  const bgColor = useColorModeValue('gray.50', 'rgba(10, 25, 41, 0.5)')
  const cardBg = useColorModeValue('white', 'rgba(10, 25, 41, 0.8)')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const isDark = useColorModeValue(false, true)
  const headingColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const statBg = useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')

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
            Políticos em Destaque
          </Heading>
          <Text 
            fontSize="lg" 
            color={textColor}
            textAlign="center"
            maxW="container.md"
            mb={8}
          >
            Conheça os representantes mais ativos e acompanhe seu desempenho no parlamento
          </Text>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {featuredPoliticians.map((politician) => (
            <Box 
              key={politician.id}
              bg={cardBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
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
                  height="3px"
                  bgGradient="linear(to-r, primary.400, cyberpunk.accent)"
                />
              )}
              
              <Flex direction="column" height="100%">
                <Flex p={6} align="center">
                  <Avatar 
                    size="lg" 
                    name={politician.name} 
                    src={politician.image}
                    mr={4}
                    border="2px solid"
                    borderColor={isDark ? "cyberpunk.accent" : "primary.500"}
                  />
                  <Box>
                    <Heading as="h3" size="md" mb={1} color={headingColor}>
                      {politician.name}
                    </Heading>
                    <Text fontSize="sm" color={textColor} mb={2}>
                      {politician.role} • {politician.state}
                    </Text>
                    <Badge colorScheme={isDark ? "cyan" : "blue"}>
                      {politician.party}
                    </Badge>
                  </Box>
                </Flex>
                
                <Flex 
                  bg={statBg} 
                  p={4} 
                  justify="space-between"
                  borderTop="1px"
                  borderColor={borderColor}
                  mt="auto"
                >
                  <Box>
                    <Text fontSize="xs" color={textColor}>Presença</Text>
                    <Text fontWeight="bold" color={headingColor}>
                      {politician.stats.presence}%
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color={textColor}>Projetos</Text>
                    <Text fontWeight="bold" color={headingColor}>
                      {politician.stats.projects}
                    </Text>
                  </Box>
                  <NextLink href={`/politico/${politician.id}`} passHref>
                    <Button 
                      as="a"
                      size="sm"
                      variant={isDark ? "cyberpunk" : "ghost"}
                      colorScheme="primary"
                      rightIcon={<Icon as={FaExternalLinkAlt} boxSize={3} />}
                    >
                      Ver
                    </Button>
                  </NextLink>
                </Flex>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
        
        <Flex justify="center" mt={10}>
          <NextLink href="/politicos" passHref>
            <Button 
              as="a"
              rightIcon={<Icon as={FaArrowRight} />}
              variant={isDark ? "cyberpunk" : "outline"}
              colorScheme="primary"
              size="lg"
            >
              Ver Todos os Políticos
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  )
}