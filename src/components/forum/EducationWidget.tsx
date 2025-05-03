import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Icon,
  Button,
  useColorModeValue,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaBook, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
import { glossaryTerms, legislativeGuides } from '../../mocks/education';

export function EducationWidget() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  // Selecionar alguns termos aleatórios do glossário para exibir
  const randomTerms = React.useMemo(() => {
    const shuffled = [...glossaryTerms].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);
  
  // Selecionar um guia aleatório para destacar
  const featuredGuide = React.useMemo(() => {
    const randomIndex = Math.floor(Math.random() * legislativeGuides.length);
    return legislativeGuides[randomIndex];
  }, []);
  
  return (
    <Box 
      bg={cardBg} 
      borderRadius="lg" 
      borderWidth="1px" 
      borderColor={borderColor}
      overflow="hidden"
      mb={6}
    >
      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
        <HStack spacing={2}>
          <Icon as={FaGraduationCap} color={accentColor} boxSize={5} />
          <Heading as="h2" size="md" color={textColor}>
            Educação Cidadã
          </Heading>
        </HStack>
      </Box>
      
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          {/* Termos do glossário */}
          <Box>
            <HStack mb={3} spacing={2}>
              <Icon as={FaBook} color={accentColor} boxSize={4} />
              <Heading as="h3" size="sm" color={textColor}>
                Glossário Político
              </Heading>
            </HStack>
            
            <Accordion allowToggle>
              {randomTerms.map((term, index) => (
                <AccordionItem 
                  key={index} 
                  borderColor={borderColor}
                  _hover={{ bg: hoverBg }}
                  transition="background 0.2s"
                >
                  <h4>
                    <AccordionButton py={2}>
                      <Box flex="1" textAlign="left" fontWeight="medium" color={textColor}>
                        {term.term}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h4>
                  <AccordionPanel pb={4} color={mutedColor} fontSize="sm">
                    {term.definition}
                    <Badge ml={2} colorScheme="blue" size="sm">
                      {term.category}
                    </Badge>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            
            <NextLink href="/education" passHref>
              <Button 
                as="a" 
                variant="link" 
                size="sm" 
                colorScheme="primary" 
                rightIcon={<Icon as={FaArrowRight} />}
                mt={3}
              >
                Ver todos os termos
              </Button>
            </NextLink>
          </Box>
          
          <Divider borderColor={borderColor} />
          
          {/* Guia em destaque */}
          <Box>
            <Heading as="h3" size="sm" mb={3} color={textColor}>
              Guia em Destaque
            </Heading>
            
            <Box 
              p={4} 
              borderWidth="1px" 
              borderColor={borderColor} 
              borderRadius="md"
              _hover={{ bg: hoverBg }}
              transition="all 0.2s"
            >
              <Heading as="h4" size="xs" mb={2} color={textColor}>
                {featuredGuide.title}
              </Heading>
              
              <Text fontSize="sm" color={mutedColor} mb={3} noOfLines={2}>
                {featuredGuide.description}
              </Text>
              
              <HStack spacing={2} wrap="wrap">
                <Badge colorScheme="green" size="sm">
                  {featuredGuide.complexity}
                </Badge>
                <Badge colorScheme="purple" size="sm">
                  {featuredGuide.readTime} min de leitura
                </Badge>
              </HStack>
              
              <NextLink href="/education" passHref>
                <Button 
                  as="a" 
                  size="sm" 
                  colorScheme="primary" 
                  variant="outline"
                  mt={3}
                  width="full"
                >
                  Ler guia completo
                </Button>
              </NextLink>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}