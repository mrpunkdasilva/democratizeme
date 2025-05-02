import { 
  Box, 
  Container, 
  Grid, 
  Heading, 
  SimpleGrid, 
  useColorMode, 
  Text,
  Flex,
  Icon,
  Button,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { FaChartLine, FaUsers, FaVoteYea, FaRegLightbulb } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { PoliticianCard } from '../../components/dashboard/PoliticianCard'
import { ExpensesChart } from '../../components/dashboard/ExpensesChart'
import { VotingHistory } from '../../components/dashboard/VotingHistory'
import { AttendanceStats } from '../../components/dashboard/AttendanceStats'
import { ProposedLaws } from '../../components/dashboard/ProposedLaws'
import { PoliticianBio } from '../../components/dashboard/PoliticianBio'
import { PartyAlliances } from '../../components/dashboard/PartyAlliances'

export default function Dashboard() {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const headingColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const subtitleColor = useColorModeValue('gray.600', 'gray.400')
  
  return (
    <Layout>
      <Box 
        position="relative" 
        overflow="hidden"
        pb={16}
      >
        {/* Background grid effect for dark mode */}
        {isDark && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="0"
            opacity="0.05"
            pointerEvents="none"
            backgroundImage="linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)"
            backgroundSize="40px 40px"
          />
        )}
        
        <Container maxW="container.xl" py={8} position="relative" zIndex="1">
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
                Dashboard Político
              </Heading>
              <Icon 
                as={FaChartLine} 
                color={accentColor} 
                w={6} 
                h={6} 
              />
            </Flex>
            <Text 
              fontSize="md" 
              color={subtitleColor}
              maxW="container.md"
            >
              Acompanhe o desempenho, votações e atividades do representante político selecionado
            </Text>
            
            <HStack spacing={4} mt={4} wrap="wrap">
              <Button 
                leftIcon={<Icon as={FaUsers} />} 
                size="sm"
                variant={isDark ? "cyberpunk" : "outline"}
                colorScheme="primary"
              >
                Todos os Políticos
              </Button>
              <Button 
                leftIcon={<Icon as={FaVoteYea} />} 
                size="sm"
                variant={isDark ? "cyberpunk" : "outline"}
                colorScheme="primary"
              >
                Votações Recentes
              </Button>
              <Button 
                leftIcon={<Icon as={FaRegLightbulb} />} 
                size="sm"
                variant={isDark ? "cyberpunk" : "outline"}
                colorScheme="primary"
              >
                Projetos em Destaque
              </Button>
            </HStack>
          </Flex>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
            <PoliticianCard />
            <ExpensesChart />
            <AttendanceStats />
          </SimpleGrid>

          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
            <Box>
              <VotingHistory />
              <ProposedLaws />
            </Box>
            <Box>
              <PoliticianBio />
              <PartyAlliances />
            </Box>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}