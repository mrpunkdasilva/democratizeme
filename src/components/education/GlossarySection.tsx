import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Badge
} from '@chakra-ui/react'
import { glossaryTerms } from '../../mocks/education'

interface GlossarySectionProps {
  searchTerm: string;
}

export function GlossarySection({ searchTerm }: GlossarySectionProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  
  // Filtrar termos com base na busca
  const filteredTerms = glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Agrupar termos por categoria
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {});
  
  // Obter cor do badge com base na categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Legislativo': return 'blue';
      case 'Executivo': return 'green';
      case 'Judiciário': return 'purple';
      case 'Eleitoral': return 'orange';
      case 'Geral': return 'gray';
      default: return 'teal';
    }
  };
  
  return (
    <Box>
      <Text mb={6} color={mutedColor}>
        Encontre definições para os principais termos políticos e jurídicos utilizados no contexto brasileiro.
      </Text>
      
      {Object.keys(groupedTerms).length === 0 ? (
        <Text>Nenhum termo encontrado para "{searchTerm}"</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {Object.entries(groupedTerms).map(([category, terms]) => (
            <Box key={category}>
              <Heading size="md" mb={4} display="flex" alignItems="center">
                {category}
                <Badge ml={2} colorScheme={getCategoryColor(category)}>
                  {(terms as any[]).length} termos
                </Badge>
              </Heading>
              
              <Accordion allowMultiple>
                {(terms as any[]).map((term, index) => (
                  <AccordionItem 
                    key={index} 
                    borderColor={borderColor}
                    _hover={{ bg: hoverBg }}
                    transition="background 0.2s"
                  >
                    <h3>
                      <AccordionButton py={3}>
                        <Box flex="1" textAlign="left" fontWeight="medium" color={textColor}>
                          {term.term}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4} color={mutedColor}>
                      {term.definition}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}