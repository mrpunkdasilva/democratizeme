import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  HStack,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  VStack
} from '@chakra-ui/react'
import { FaSearch, FaFilter, FaPlus, FaFire, FaClock, FaThumbsUp } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { TopicsList } from '../../components/forum/TopicsList'
import { PopularTags } from '../../components/forum/PopularTags'
import { TopContributors } from '../../components/forum/TopContributors'
import { EducationBanner } from '../../components/forum/EducationBanner'

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('todos')
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const isDark = useColorModeValue(false, true)
  
  return (
    <Layout 
      title="Fórum Cidadão | Democratize"
      description="Participe de discussões sobre política, legislação e cidadania"
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          {/* Cabeçalho */}
          <Box mb={8}>
            <Heading 
              as="h1" 
              size="xl" 
              mb={4}
              bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : undefined}
              bgClip={isDark ? "text" : undefined}
              color={isDark ? "transparent" : textColor}
            >
              Fórum Cidadão
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Participe de discussões sobre política, legislação e cidadania
            </Text>
          </Box>
          
          {/* Banner de Educação */}
          <EducationBanner />
          
          {/* Barra de busca e filtros */}
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            mb={8} 
            gap={4}
            bg={cardBg}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <InputGroup maxW={{ base: '100%', md: '60%' }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="Buscar tópicos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Flex align="center" ml={{ base: 0, md: 'auto' }}>
              <Icon as={FaFilter} color="gray.400" mr={2} />
              <Text fontSize="sm" fontWeight="medium" mr={2}>Categoria:</Text>
              <Select 
                size="md" 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                w={{ base: 'full', md: '200px' }}
              >
                <option value="todos">Todas as categorias</option>
                <option value="projetos">Projetos de Lei</option>
                <option value="politicos">Políticos</option>
                <option value="eleicoes">Eleições</option>
                <option value="direitos">Direitos Cidadãos</option>
                <option value="debates">Debates</option>
              </Select>
            </Flex>
          </Flex>
          
          {/* Conteúdo principal */}
          <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={6}>
            {/* Coluna principal - Tópicos */}
            <Box gridColumn={{ lg: 'span 3' }}>
              <Tabs 
                variant="enclosed" 
                colorScheme="primary" 
                bg={cardBg} 
                borderRadius="lg" 
                boxShadow="sm"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
              >
                <TabList>
                  <Tab>
                    <Icon as={FaFire} mr={2} />
                    Populares
                  </Tab>
                  <Tab>
                    <Icon as={FaClock} mr={2} />
                    Recentes
                  </Tab>
                  <Tab>
                    <Icon as={FaThumbsUp} mr={2} />
                    Mais Votados
                  </Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel>
                    <TopicsList 
                      searchTerm={searchTerm} 
                      filterCategory={filterCategory} 
                      sortBy="popular"
                    />
                  </TabPanel>
                  <TabPanel>
                    <TopicsList 
                      searchTerm={searchTerm} 
                      filterCategory={filterCategory} 
                      sortBy="recent"
                    />
                  </TabPanel>
                  <TabPanel>
                    <TopicsList 
                      searchTerm={searchTerm} 
                      filterCategory={filterCategory} 
                      sortBy="votes"
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            
            {/* Coluna lateral - Widgets */}
            <Box>
              <VStack spacing={6} align="stretch">
                <Box
                  bg={cardBg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  overflow="hidden"
                  p={4}
                >
                  <Heading as="h3" size="md" mb={4}>
                    Tags Populares
                  </Heading>
                  <PopularTags />
                </Box>
                
                <Box
                  bg={cardBg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  overflow="hidden"
                  p={4}
                >
                  <Heading as="h3" size="md" mb={4}>
                    Top Contribuidores
                  </Heading>
                  <TopContributors />
                </Box>
                
                <Box
                  bg={cardBg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  overflow="hidden"
                  p={4}
                >
                  <Heading as="h3" size="md" mb={4}>
                    Regras do Fórum
                  </Heading>
                  <Text fontSize="sm" color={mutedColor}>
                    • Seja respeitoso com todos os participantes
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    • Não compartilhe informações falsas
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    • Mantenha o foco nos temas políticos
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    • Cite fontes confiáveis quando possível
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    • Não faça ataques pessoais
                  </Text>
                </Box>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}