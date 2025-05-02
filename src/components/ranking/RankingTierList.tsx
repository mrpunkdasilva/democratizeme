import { 
  Box, 
  Flex, 
  Text, 
  Avatar, 
  Badge, 
  useColorModeValue,
  Tooltip,
  HStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { mockPoliticians, PoliticianStats } from '../../mocks/politicians'

export function RankingTierList() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const isDark = useColorModeValue(false, true)
  
  // Filtrar políticos que têm a propriedade stats definida
  const validPoliticians = mockPoliticians.filter(p => p && p.stats);
  
  // Ordenar políticos com base na pontuação geral
  const sortedPoliticians = [...validPoliticians].sort((a, b) => b.stats.overall - a.stats.overall);
  
  // Definir os tiers com base na pontuação
  const tiers = [
    { name: 'S', color: 'green.500', min: 80, max: 100 },
    { name: 'A', color: 'blue.500', min: 70, max: 79 },
    { name: 'B', color: 'teal.500', min: 60, max: 69 },
    { name: 'C', color: 'yellow.500', min: 50, max: 59 },
    { name: 'D', color: 'orange.500', min: 40, max: 49 },
    { name: 'E', color: 'red.500', min: 30, max: 39 },
    { name: 'F', color: 'red.700', min: 0, max: 29 }
  ];
  
  // Agrupar políticos por tier
  const politiciansByTier = tiers.map(tier => {
    return {
      ...tier,
      politicians: sortedPoliticians.filter(
        p => p.stats.overall >= tier.min && p.stats.overall <= tier.max
      )
    };
  });
  
  return (
    <Box>
      {politiciansByTier.map((tier, index) => (
        <Box 
          key={tier.name}
          mb={6}
          display={tier.politicians.length > 0 ? 'block' : 'none'}
        >
          <Flex 
            align="center" 
            mb={3}
          >
            <Box 
              w="50px" 
              h="50px" 
              borderRadius="md" 
              bg={tier.color} 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              mr={4}
              boxShadow={`0 0 10px ${tier.color}`}
            >
              <Text 
                fontSize="2xl" 
                fontWeight="bold" 
                color="white"
              >
                {tier.name}
              </Text>
            </Box>
            <Box>
              <Text 
                fontWeight="bold" 
                fontSize="lg" 
                color={textColor}
              >
                Tier {tier.name} ({tier.min}-{tier.max} pontos)
              </Text>
              <Text 
                fontSize="sm" 
                color={mutedColor}
              >
                {tier.politicians.length} políticos neste tier
              </Text>
            </Box>
          </Flex>
          
          <Box 
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            p={4}
            boxShadow={isDark ? "0 4px 20px rgba(0, 255, 255, 0.05)" : "sm"}
          >
            <Wrap spacing={4}>
              {tier.politicians.map(politician => (
                <WrapItem key={politician.id}>
                  <Tooltip 
                    label={
                      <Box p={2}>
                        <Text fontWeight="bold" mb={1}>{politician.name}</Text>
                        <Text fontSize="sm">Pontuação: {politician.stats.overall}</Text>
                        <Text fontSize="xs">{politician.party} • {politician.state}</Text>
                      </Box>
                    }
                  >
                    <Flex 
                      align="center" 
                      bg={useColorModeValue('gray.50', 'gray.700')}
                      p={2}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                      _hover={{
                        bg: useColorModeValue('gray.100', 'gray.600'),
                        transform: "translateY(-2px)",
                        boxShadow: "sm"
                      }}
                      transition="all 0.2s"
                      cursor="pointer"
                    >
                      <Avatar 
                        size="sm" 
                        name={politician.name} 
                        src={politician.avatar} 
                        mr={2}
                      />
                      <Box>
                        <Text 
                          fontWeight="medium" 
                          fontSize="sm" 
                          color={textColor}
                          noOfLines={1}
                        >
                          {politician.name}
                        </Text>
                        <HStack spacing={1}>
                          <Badge 
                            colorScheme="purple" 
                            fontSize="xs"
                          >
                            {politician.party}
                          </Badge>
                          <Badge 
                            colorScheme="blue" 
                            variant="outline" 
                            fontSize="xs"
                          >
                            {politician.stats.overall}
                          </Badge>
                        </HStack>
                      </Box>
                    </Flex>
                  </Tooltip>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
