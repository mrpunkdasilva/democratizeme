import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Flex, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Select, 
  useColorModeValue,
  Icon,
  Button,
  HStack
} from '@chakra-ui/react';
import { FaSearch, FaFilter, FaFileAlt } from 'react-icons/fa';
import { Layout } from '../../components/Layout';
import { LawsList } from '../../components/monitor/LawsList';
import { LawsStats } from '../../components/monitor/LawsStats';
import { NoSSR } from '../../components/NoSSR';

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent');
  const isDark = useColorModeValue(false, true);

  return (
    <Layout 
      title="Projetos de Lei | Monitor Legislativo" 
      description="Acompanhe os projetos de lei em tramitação no Congresso Nacional"
    >
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
              Projetos de Lei
            </Heading>
            <Text color={mutedColor} fontSize="lg" mb={6}>
              Acompanhe projetos de lei em tramitação no Congresso Nacional
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
                  placeholder="Buscar projetos de lei..." 
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
          </Flex>
          
          <NoSSR>
            <Box mb={8}>
              <LawsStats />
            </Box>
            
            <Box 
              bg={cardBg} 
              borderRadius="lg" 
              boxShadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
            >
              <LawsList searchTerm={searchTerm} filterType={filterType} />
            </Box>
          </NoSSR>
        </Container>
      </Box>
    </Layout>
  );
}