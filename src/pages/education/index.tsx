import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Divider
} from '@chakra-ui/react'
import { FaSearch, FaBook, FaBalanceScale, FaUniversity, FaQuestion } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { GlossarySection } from '../../components/education/GlossarySection'
import { LegislativeGuides } from '../../components/education/LegislativeGuides'
import { DemocracyQuiz } from '../../components/education/DemocracyQuiz'

export default function Education() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Cores para o tema claro/escuro
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const accentColor = useColorModeValue('primary.600', 'cyberpunk.accent')
  
  return (
    <Layout 
      title="Educação Cidadã | democratize.me" 
      description="Aprenda sobre termos políticos, processo legislativo e direitos do cidadão"
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          {/* Cabeçalho */}
          <VStack spacing={4} align="flex-start" mb={8}>
            <HStack spacing={3}>
              <Icon as={FaUniversity} boxSize={6} color={accentColor} />
              <Heading as="h1" size="xl" color={textColor}>
                Educação Cidadã
              </Heading>
            </HStack>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Aprenda sobre o funcionamento do sistema político, seus direitos e como participar ativamente da democracia.
            </Text>
            
            {/* Barra de pesquisa */}
            <InputGroup maxW="600px" mt={4}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar termos, guias ou direitos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={cardBg}
                borderColor={borderColor}
                _focus={{ borderColor: accentColor }}
              />
            </InputGroup>
          </VStack>
          
          <Divider mb={8} borderColor={borderColor} />
          
          {/* Conteúdo em abas */}
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
                <Icon as={FaBook} mr={2} />
                Glossário
              </Tab>
              <Tab>
                <Icon as={FaBalanceScale} mr={2} />
                Processo Legislativo
              </Tab>
              <Tab>
                <Icon as={FaQuestion} mr={2} />
                Quiz Democrático
              </Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                <GlossarySection searchTerm={searchTerm} />
              </TabPanel>
              <TabPanel>
                <LegislativeGuides searchTerm={searchTerm} />
              </TabPanel>
              <TabPanel>
                <DemocracyQuiz />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  )
}