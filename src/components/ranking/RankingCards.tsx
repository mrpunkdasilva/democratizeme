import { 
  SimpleGrid, 
  Box, 
  Flex, 
  Text, 
  Avatar, 
  Badge, 
  Progress, 
  Icon,
  useColorModeValue,
  Tooltip,
  HStack
} from '@chakra-ui/react'
import { FaStar, FaArrowUp, FaArrowDown, FaMinus, FaTrophy } from 'react-icons/fa'
import { mockPoliticians, PoliticianStats } from '../../mocks/politicians'

export function RankingCards() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const isDark = useColorModeValue(false, true)
  
  // Filtrar políticos que têm a propriedade stats definida
  const validPoliticians = mockPoliticians.filter(p => p && p.stats);
  
  // Ordenar políticos com base na pontuação geral
  const sortedPoliticians = [...validPoliticians].sort((a, b) => b.stats.overall - a.stats.overall);
  
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
  
  // Função para obter o ícone de posição
  const getPositionIcon = (position: number) => {
    if (position === 0) return { icon: FaTrophy, color: 'yellow.400' };
    if (position === 1) return { icon: FaTrophy, color: 'gray.400' };
    if (position === 2) return { icon: FaTrophy, color: 'orange.400' };
    return null;
  };
  
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {sortedPoliticians.map((politician, index) => {
        const trendInfo = getTrendIcon(politician.stats.trend);
        const positionIcon = getPositionIcon(index);
        
        return (
          <Box 
            key={politician.id}
            bg={bgColor}
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
            
            {/* Posição no ranking */}
            <Flex 
              position="absolute" 
              top={3} 
              right={3}
              align="center"
              justify="center"
              bg={index < 3 ? "rgba(255, 215, 0, 0.1)" : "transparent"}
              borderRadius="full"
              p={1}
            >
              {positionIcon && (
                <Icon 
                  as={positionIcon.icon} 
                  color={positionIcon.color} 
                  boxSize={5} 
                />
              )}
              <Text 
                fontWeight="bold" 
                fontSize="lg" 
                ml={positionIcon ? 1 : 0}
                color={index < 3 ? accentColor : textColor}
              >
                #{index + 1}
              </Text>
            </Flex>
            
            <Box p={6}>
              <Flex align="center" mb={4}>
                <Avatar 
                  size="lg" 
                  name={politician.name} 
                  src={politician.avatar} 
                  mr={4}
                  border="2px solid"
                  borderColor={index < 3 ? accentColor : borderColor}
                />
                <Box>
                  <Text 
                    fontWeight="bold" 
                    fontSize="lg" 
                    color={textColor}
                    mb={1}
                  >
                    {politician.name}
                  </Text>
                  <HStack spacing={2}>
                    <Badge colorScheme="purple">
                      {politician.party}
                    </Badge>
                    <Text fontSize="sm" color={mutedColor}>
                      {politician.state}
                    </Text>
                  </HStack>
                </Box>
              </Flex>
              
              <Box mb={4}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" fontWeight="medium" color={mutedColor}>
                    Pontuação Geral
                  </Text>
                  <HStack>
                    <Badge 
                      colorScheme={getScoreColor(politician.stats.overall)} 
                      fontSize="md" 
                      py={1} 
                      px={2} 
                      borderRadius="md"
                    >
                      {politician.stats.overall}
                    </Badge>
                    <Tooltip label={`${Math.abs(politician.stats.trend)} pontos nos últimos 30 dias`}>
                      <Flex align="center">
                        <Icon 
                          as={trendInfo.icon} 
                          color={trendInfo.color} 
                          boxSize={3} 
                          mr={1} 
                        />
                        <Text fontSize="xs" color={trendInfo.color}>
                          {Math.abs(politician.stats.trend)}
                        </Text>
                      </Flex>
                    </Tooltip>
                  </HStack>
                </Flex>
                <Progress 
                  value={politician.stats.overall} 
                  size="sm" 
                  colorScheme={getScoreColor(politician.stats.overall)} 
                  borderRadius="full"
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  mb={4}
                />
              </Box>
              
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="xs" color={mutedColor} mb={1}>Presença</Text>
                  <Flex align="center">
                    <Badge 
                      colorScheme={getScoreColor(politician.stats.presence)} 
                      mr={2}
                    >
                      {politician.stats.presence}
                    </Badge>
                    <Progress 
                      value={politician.stats.presence} 
                      size="xs" 
                      colorScheme={getScoreColor(politician.stats.presence)} 
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      flex="1"
                    />
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="xs" color={mutedColor} mb={1}>Projetos</Text>
                  <Flex align="center">
                    <Badge 
                      colorScheme={getScoreColor(politician.stats.projects)} 
                      mr={2}
                    >
                      {politician.stats.projects}
                    </Badge>
                    <Progress 
                      value={politician.stats.projects} 
                      size="xs" 
                      colorScheme={getScoreColor(politician.stats.projects)} 
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      flex="1"
                    />
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="xs" color={mutedColor} mb={1}>Transparência</Text>
                  <Flex align="center">
                    <Badge 
                      colorScheme={getScoreColor(politician.stats.transparency)} 
                      mr={2}
                    >
                      {politician.stats.transparency}
                    </Badge>
                    <Progress 
                      value={politician.stats.transparency} 
                      size="xs" 
                      colorScheme={getScoreColor(politician.stats.transparency)} 
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      flex="1"
                    />
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="xs" color={mutedColor} mb={1}>Gastos</Text>
                  <Flex align="center">
                    <Badge 
                      colorScheme={getScoreColor(100 - politician.stats.expenses)} 
                      mr={2}
                    >
                      {politician.stats.expenses}
                    </Badge>
                    <Progress 
                      value={100 - politician.stats.expenses} 
                      size="xs" 
                      colorScheme={getScoreColor(100 - politician.stats.expenses)} 
                      borderRadius="full"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      flex="1"
                    />
                  </Flex>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  )
}