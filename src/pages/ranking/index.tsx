import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel, 
  useColorModeValue,
  Flex,
  Icon,
  Select,
  HStack,
  InputGroup,
  Input,
  InputLeftElement
} from '@chakra-ui/react'
import { FaTrophy, FaSearch, FaFilter } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { RankingTable } from '../../components/ranking/RankingTable'
import { RankingCards } from '../../components/ranking/RankingCards'
import { RankingTierList } from '../../components/ranking/RankingTierList'
import { useState } from 'react'

export default function RankingPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'tierlist'>('table')
  const [filterState, setFilterState] = useState<string>('todos')
  const [filterParty, setFilterParty] = useState<string>('todos')
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headingColor = useColorModeValue('gray.800', 'white')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const tabBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const isDark = useColorModeValue(false, true)
  
  return (
    <Layout>
      <Box 
        minH="100vh" 
        bg={bgColor}
        position="relative"
        pb={16}
      >
        {/* Background para o modo escuro */}
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
            filter="blur(5px)"
          />
        )}
        
        <Container maxW="container.xl" pt={8} position="relative" zIndex="1">
          <Flex 
            direction="column" 
            mb={8}
          >
            <Flex 
              align="center" 
              mb={2}
            >
              <Heading 
                as="h1" 
                size="xl" 
                color={headingColor}
                fontFamily="heading"
                letterSpacing="tight"
                bgGradient={isDark ? "linear(to-r, #2196F3, #00FFFF)" : undefined}
                bgClip={isDark ? "text" : undefined}
                mr={3}
              >
                Ranking de Políticos
              </Heading>
              <Icon 
                as={FaTrophy} 
                color={accentColor} 
                w={6} 
                h={6} 
              />
            </Flex>
            <Text 
              fontSize="md" 
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW="container.md"
              mb={6}
            >
              Classificação dos representantes políticos com base em critérios de transparência, 
              presença, projetos aprovados e outros indicadores de desempenho.
            </Text>
            
            {/* Filtros */}
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              gap={4} 
              mb={6}
              p={4}
              bg={tabBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <InputGroup maxW={{ base: 'full', md: '300px' }}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Buscar político" />
              </InputGroup>
              
              <HStack spacing={4} flex="1" justify={{ base: 'flex-start', md: 'flex-end' }}>
                <Flex align="center">
                  <Icon as={FaFilter} color="gray.400" mr={2} />
                  <Text fontSize="sm" fontWeight="medium" mr={2}>Estado:</Text>
                  <Select 
                    size="sm" 
                    value={filterState} 
                    onChange={(e) => setFilterState(e.target.value)}
                    w="120px"
                  >
                    <option value="todos">Todos</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="BA">Bahia</option>
                  </Select>
                </Flex>
                
                <Flex align="center">
                  <Text fontSize="sm" fontWeight="medium" mr={2}>Partido:</Text>
                  <Select 
                    size="sm" 
                    value={filterParty} 
                    onChange={(e) => setFilterParty(e.target.value)}
                    w="120px"
                  >
                    <option value="todos">Todos</option>
                    <option value="PT">PT</option>
                    <option value="PL">PL</option>
                    <option value="MDB">MDB</option>
                    <option value="PSOL">PSOL</option>
                    <option value="NOVO">NOVO</option>
                    <option value="PSD">PSD</option>
                  </Select>
                </Flex>
              </HStack>
            </Flex>
            
            {/* Tabs para diferentes métricas */}
            <Tabs 
              variant="enclosed" 
              colorScheme="primary" 
              bg={tabBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="sm"
            >
              <TabList>
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>Geral</Tab>
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>Presença</Tab>
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>Projetos</Tab>
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>Transparência</Tab>
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>Gastos</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <Tabs 
                    variant="soft-rounded" 
                    colorScheme="primary" 
                    size="sm" 
                    mb={6}
                    onChange={(index) => {
                      const modes = ['table', 'cards', 'tierlist'] as const;
                      setViewMode(modes[index]);
                    }}
                  >
                    <TabList>
                      <Tab>Tabela</Tab>
                      <Tab>Cards</Tab>
                      <Tab>TierList</Tab>
                    </TabList>
                  </Tabs>
                  
                  {viewMode === 'table' && <RankingTable />}
                  {viewMode === 'cards' && <RankingCards />}
                  {viewMode === 'tierlist' && <RankingTierList />}
                </TabPanel>
                
                <TabPanel>
                  <RankingTable metric="presence" />
                </TabPanel>
                
                <TabPanel>
                  <RankingTable metric="projects" />
                </TabPanel>
                
                <TabPanel>
                  <RankingTable metric="transparency" />
                </TabPanel>
                
                <TabPanel>
                  <RankingTable metric="expenses" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Container>
      </Box>
    </Layout>
  )
}