import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Collapse,
  Button
} from '@chakra-ui/react';
import { FaSearch, FaBook, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { glossaryTerms, glossaryCategories, GlossaryTerm } from '../../data/glossaryData';
import { NoSSR } from '../NoSSR';

export function InteractiveGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  
  // Filtrar termos com base na pesquisa e categoria
  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Agrupar termos por letra inicial
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);
  
  // Ordenar as letras
  const sortedLetters = Object.keys(groupedTerms).sort();
  
  return (
    <NoSSR>
      <Box
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
        boxShadow="sm"
      >
        <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
          <Flex justify="space-between" align="center" mb={4}>
            <HStack>
              <Icon as={FaBook} color={accentColor} boxSize={6} />
              <Heading as="h3" size="md" color={textColor}>
                Glossário Democrático
              </Heading>
            </HStack>
          </Flex>
          
          <InputGroup mb={4}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color={mutedColor} />
            </InputLeftElement>
            <Input 
              placeholder="Buscar termos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderColor={borderColor}
            />
          </InputGroup>
          
          <Tabs variant="soft-rounded" colorScheme="blue" size="sm">
            <TabList overflowX="auto" py={2} css={{
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: useColorModeValue('rgba(0,0,0,0.2)', 'rgba(255,255,255,0.2)'),
                borderRadius: '3px',
              }
            }}>
              {glossaryCategories.map((category) => (
                <Tab 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  _selected={{ bg: accentColor, color: 'white' }}
                >
                  {category}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </Box>
        
        <Box p={6}>
          {filteredTerms.length > 0 ? (
            <VStack spacing={6} align="stretch">
              {/* Índice alfabético */}
              <Flex wrap="wrap" gap={2} mb={2}>
                {sortedLetters.map(letter => (
                  <Button 
                    key={letter}
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      const element = document.getElementById(`letter-${letter}`);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {letter}
                  </Button>
                ))}
              </Flex>
              
              {/* Termos agrupados por letra */}
              {sortedLetters.map(letter => (
                <Box key={letter} id={`letter-${letter}`}>
                  <Flex 
                    align="center" 
                    bg={cardBg} 
                    p={2} 
                    borderRadius="md" 
                    mb={3}
                  >
                    <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                      {letter}
                    </Text>
                    <Badge ml={2} colorScheme="blue">
                      {groupedTerms[letter].length} termos
                    </Badge>
                  </Flex>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {groupedTerms[letter].map((term, index) => (
                      <Box 
                        key={index}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={borderColor}
                        overflow="hidden"
                      >
                        <Box 
                          p={4} 
                          cursor="pointer"
                          onClick={() => setExpandedTerm(expandedTerm === term.term ? null : term.term)}
                          bg={expandedTerm === term.term ? cardBg : 'transparent'}
                          _hover={{ bg: cardBg }}
                        >
                          <Flex justify="space-between" align="center">
                            <HStack>
                              <Text fontWeight="bold" color={textColor}>
                                {term.term}
                              </Text>
                              <Badge colorScheme="blue" size="sm">
                                {term.category}
                              </Badge>
                            </HStack>
                            <Icon 
                              as={expandedTerm === term.term ? FaChevronUp : FaChevronDown} 
                              color={mutedColor}
                            />
                          </Flex>
                        </Box>
                        
                        <Collapse in={expandedTerm === term.term} animateOpacity>
                          <Box p={4} pt={0} borderTopWidth="1px" borderColor={borderColor}>
                            <Text color={textColor} mb={3}>
                              {term.definition}
                            </Text>
                            
                            {term.related && term.related.length > 0 && (
                              <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>
                                  Termos relacionados:
                                </Text>
                                <Flex wrap="wrap" gap={2}>
                                  {term.related.map((relatedTerm, idx) => (
                                    <Badge 
                                      key={idx} 
                                      colorScheme="green" 
                                      cursor="pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Encontrar o termo relacionado e expandir
                                        const found = glossaryTerms.find(
                                          t => t.term.toLowerCase() === relatedTerm.toLowerCase()
                                        );
                                        if (found) {
                                          setExpandedTerm(found.term);
                                          // Se o termo estiver em outra categoria, mudar para "Todos"
                                          if (selectedCategory !== 'Todos' && found.category !== selectedCategory) {
                                            setSelectedCategory('Todos');
                                          }
                                          // Rolar até o termo
                                          setTimeout(() => {
                                            const element = document.getElementById(`letter-${found.term.charAt(0).toUpperCase()}`);
                                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                                          }, 100);
                                        }
                                      }}
                                    >
                                      {relatedTerm}
                                    </Badge>
                                  ))}
                                </Flex>
                              </Box>
                            )}
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              ))}
            </VStack>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color={mutedColor}>
                Nenhum termo encontrado para "{searchTerm}" na categoria {selectedCategory}.
              </Text>
              <Button 
                mt={4} 
                colorScheme="blue" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
              >
                Limpar filtros
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </NoSSR>
  );
}