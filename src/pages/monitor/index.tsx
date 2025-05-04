import { useState, useEffect } from 'react'
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
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  useColorModeValue,
  Icon,
  Button,
  HStack
} from '@chakra-ui/react'
import { FaSearch, FaFilter, FaCalendarAlt, FaFileAlt, FaBell, FaVoteYea } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { LawsList } from '../../components/monitor/LawsList'
import { VotingCalendar } from '../../components/monitor/VotingCalendar'
import { LawsStats } from '../../components/monitor/LawsStats'
import { useNotifications } from '../../contexts/NotificationContext'
import { RecentVotings } from '../../components/monitor/RecentVotings'
import { NoSSR } from '../../components/NoSSR'
import { ChakraNextLink } from '../../components/ChakraNextLink'

export default function MonitorPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const isDark = useColorModeValue(false, true)
  
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Simular recebimento de notificação após 5 segundos
    const timer = setTimeout(() => {
      addNotification({
        title: 'Votação em andamento',
        message: 'PL 123/2023 - Reforma Tributária está sendo votado agora',
        type: 'warning',
        link: '/monitor'
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <Layout>
      <Box bg={bgColor} minH="calc(100vh - 64px)" py={8}>
        <Container maxW="container.xl">
          <Flex 
            direction="column" 
            mb={8}
          >
            <Heading 
              as="h1" 
              size="xl" 
              mb={2}
              bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : "linear(to-r, primary.500, primary.700)"}
              bgClip={isDark ? "text" : undefined}
              color={isDark ? undefined : textColor}
            >
              Monitor Legislativo
            </Heading>
            <Text color={mutedColor} fontSize="lg" mb={6}>
              Acompanhe projetos de lei, votações e atividades legislativas em tempo real
            </Text>
            
            <Flex 
              direction={{ base: "column", md: "row" }} 
              gap={4} 
              mb={6}
            >
              <InputGroup size="lg" flex="1">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color={mutedColor} />
                </InputLeftElement>
                <Input 
                  placeholder="Buscar projetos de lei, votações..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg={cardBg}
                  borderColor={borderColor}
                  _focus={{
                    borderColor: accentColor,
                    boxShadow: `0 0 0 1px ${accentColor}`
                  }}
                />
              </InputGroup>
              
              <Select 
                placeholder="Filtrar por tipo" 
                size="lg"
                icon={<FaFilter />}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                bg={cardBg}
                borderColor={borderColor}
                w={{ base: "full", md: "200px" }}
                _focus={{
                  borderColor: accentColor,
                  boxShadow: `0 0 0 1px ${accentColor}`
                }}
              >
                <option value="all">Todos os tipos</option>
                <option value="pl">Projetos de Lei (PL)</option>
                <option value="pec">PEC</option>
                <option value="plp">Projeto de Lei Complementar</option>
                <option value="pdl">Projeto de Decreto Legislativo</option>
              </Select>
            </Flex>
            
            <HStack spacing={4} wrap="wrap">
              <Button 
                leftIcon={<Icon as={FaFileAlt} />} 
                size="sm"
                variant={isDark ? "cyberpunk" : "outline"}
                colorScheme="primary"
                as={ChakraNextLink}
                href="/monitor/bills"
              >
                Projetos em Tramitação
              </Button>
              <Button 
                leftIcon={<Icon as={FaCalendarAlt} />} 
                size="sm"
                variant={isDark ? "cyberpunk" : "outline"}
                colorScheme="primary"
                as={ChakraNextLink}
                href="/monitor/calendar"
              >
                Calendário de Votações
              </Button>
              <Button 
                leftIcon={<Icon as={FaVoteYea} />} 
                size="sm"
                variant={isDark ? "cyberpunk" : "outline"}
                colorScheme="primary"
                as={ChakraNextLink}
                href="/monitor/votings"
              >
                Votações Recentes
              </Button>
              <Button 
                leftIcon={<Icon as={FaBell} />}
                colorScheme="blue"
                onClick={() => {
                  addNotification({
                    title: 'Nova votação agendada',
                    message: 'PL 456/2023 - Reforma Educacional será votado amanhã às 14h',
                    type: 'info',
                    link: '/monitor'
                  });
                }}
                size="sm"
                ml={2}
              >
                Testar Notificação
              </Button>
            </HStack>
          </Flex>
          
          <NoSSR>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <LawsStats />
            </SimpleGrid>
            
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
                <Tab>Projetos de Lei</Tab>
                <Tab>Calendário de Votações</Tab>
                <Tab>Votações Recentes</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <LawsList searchTerm={searchTerm} filterType={filterType} />
                </TabPanel>
                <TabPanel>
                  <VotingCalendar />
                </TabPanel>
                <TabPanel>
                  <RecentVotings />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </NoSSR>
        </Container>
      </Box>
    </Layout>
  )
}
