import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Box, 
  Flex, 
  Text, 
  Avatar, 
  Badge, 
  Progress, 
  Icon,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react'
import { FaStar, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa'
import { mockPoliticians, PoliticianStats } from '../../mocks/politicians'

type RankingTableProps = {
  metric?: 'general' | 'presence' | 'projects' | 'transparency' | 'expenses'
}

export function RankingTable({ metric = 'general' }: RankingTableProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  
  // Filtrar políticos que têm a propriedade stats definida
  const validPoliticians = mockPoliticians.filter(p => p && p.stats);
  
  // Ordenar políticos com base na métrica selecionada
  const sortedPoliticians = [...validPoliticians].sort((a, b) => {
    switch (metric) {
      case 'presence':
        return b.stats.presence - a.stats.presence;
      case 'projects':
        return b.stats.projects - a.stats.projects;
      case 'transparency':
        return b.stats.transparency - a.stats.transparency;
      case 'expenses':
        // Para gastos, menor é melhor
        return a.stats.expenses - b.stats.expenses;
      default:
        return b.stats.overall - a.stats.overall;
    }
  });
  
  // Função para determinar a cor do badge com base na pontuação
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'yellow';
    if (score >= 20) return 'orange';
    return 'red';
  };
  
  // Função para determinar o ícone de tendência
  const getTrendIcon = (trend: number) => {
    if (trend > 0) return { icon: FaArrowUp, color: 'green.500' };
    if (trend < 0) return { icon: FaArrowDown, color: 'red.500' };
    return { icon: FaMinus, color: 'gray.500' };
  };
  
  // Função para obter o valor da métrica atual
  const getMetricValue = (politician: PoliticianStats, metricName: string) => {
    if (!politician || !politician.stats) return 0;
    
    switch (metricName) {
      case 'presence':
        return politician.stats.presence;
      case 'projects':
        return politician.stats.projects;
      case 'transparency':
        return politician.stats.transparency;
      case 'expenses':
        return politician.stats.expenses;
      default:
        return politician.stats.overall;
    }
  };
  
  return (
    <Box 
      overflowX="auto" 
      borderRadius="lg" 
      borderWidth="1px" 
      borderColor={borderColor}
      bg={bgColor}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="50px" textAlign="center">#</Th>
            <Th>Político</Th>
            <Th>Partido/Estado</Th>
            <Th width="150px" textAlign="center">Pontuação</Th>
            <Th width="100px" textAlign="center">Tendência</Th>
            <Th width="200px">Desempenho</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedPoliticians.map((politician, index) => {
            const metricValue = getMetricValue(politician, metric);
            const trendInfo = getTrendIcon(politician.stats.trend);
            
            return (
              <Tr 
                key={politician.id}
                _hover={{ bg: hoverBg }}
                transition="background 0.2s"
                cursor="pointer"
              >
                <Td textAlign="center" fontWeight="bold" color={index < 3 ? accentColor : textColor}>
                  {index + 1}
                  {index < 3 && (
                    <Icon as={FaStar} ml={1} color="yellow.400" boxSize={3} />
                  )}
                </Td>
                <Td>
                  <Flex align="center">
                    <Avatar 
                      size="sm" 
                      name={politician.name} 
                      src={politician.avatar} 
                      mr={3}
                      border="2px solid"
                      borderColor={index < 3 ? accentColor : 'transparent'}
                    />
                    <Box>
                      <Text fontWeight="medium" color={textColor}>
                        {politician.name}
                      </Text>
                      <Text fontSize="xs" color={mutedColor}>
                        {politician.role}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center">
                    <Badge colorScheme="purple" mr={2}>
                      {politician.party}
                    </Badge>
                    <Text fontSize="sm" color={mutedColor}>
                      {politician.state}
                    </Text>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Badge 
                    colorScheme={getScoreColor(metricValue)} 
                    fontSize="md" 
                    py={1} 
                    px={2} 
                    borderRadius="md"
                  >
                    {metricValue}
                  </Badge>
                </Td>
                <Td textAlign="center">
                  <Tooltip label={`${Math.abs(politician.stats.trend)} pontos nos últimos 30 dias`}>
                    <Flex justify="center" align="center">
                      <Icon 
                        as={trendInfo.icon} 
                        color={trendInfo.color} 
                        mr={1} 
                      />
                      <Text fontSize="sm" color={trendInfo.color}>
                        {Math.abs(politician.stats.trend)}
                      </Text>
                    </Flex>
                  </Tooltip>
                </Td>
                <Td>
                  <Box>
                    <Progress 
                      value={metricValue} 
                      size="sm" 
                      colorScheme={getScoreColor(metricValue)} 
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                    />
                  </Box>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  )
}