import React from 'react';
import {
  Box,
  Text,
  Heading,
  Icon,
  Flex,
  Badge,
  Button,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
  Link
} from '@chakra-ui/react';
import { FaInfoCircle, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa';
import NextLink from 'next/link';
import { glossaryTerms } from '../../mocks/education';

interface ContextualKnowledgeProps {
  terms: string[];
  context: 'law' | 'politician' | 'forum' | 'general';
  showTitle?: boolean;
}

export function ContextualKnowledge({ terms, context, showTitle = true }: ContextualKnowledgeProps) {
  const bgColor = useColorModeValue('blue.50', 'rgba(33, 150, 243, 0.1)');
  const borderColor = useColorModeValue('blue.100', 'rgba(33, 150, 243, 0.2)');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  
  // Filtrar termos do glossário que correspondem aos termos fornecidos
  const relevantTerms = glossaryTerms.filter(item => 
    terms.some(term => 
      item.term.toLowerCase().includes(term.toLowerCase()) || 
      term.toLowerCase().includes(item.term.toLowerCase())
    )
  ).slice(0, 3); // Limitar a 3 termos para não sobrecarregar
  
  if (relevantTerms.length === 0) return null;
  
  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      mb={4}
    >
      {showTitle && (
        <Flex align="center" mb={2}>
          <Icon as={FaLightbulb} color={accentColor} mr={2} />
          <Heading size="sm" color={textColor}>
            Contexto Educacional
          </Heading>
        </Flex>
      )}
      
      <Text fontSize="sm" color={textColor} mb={3}>
        Entenda melhor os termos utilizados neste contexto:
      </Text>
      
      <Flex direction="column" gap={2}>
        {relevantTerms.map((term, index) => (
          <Popover key={index} placement="top" trigger="hover">
            <PopoverTrigger>
              <Flex 
                align="center" 
                p={2} 
                bg={useColorModeValue('white', 'gray.700')} 
                borderRadius="md"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                cursor="pointer"
                _hover={{ bg: useColorModeValue('gray.50', 'gray.600') }}
              >
                <Icon as={FaInfoCircle} color={accentColor} mr={2} />
                <Text fontWeight="medium">{term.term}</Text>
                <Badge ml="auto" colorScheme="blue" size="sm">
                  {term.category}
                </Badge>
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="bold">{term.term}</PopoverHeader>
              <PopoverBody>
                <Text mb={3}>{term.definition}</Text>
                <NextLink href={`/education?term=${encodeURIComponent(term.term)}`} passHref>
                  <Button 
                    as="a" 
                    size="xs" 
                    rightIcon={<Icon as={FaExternalLinkAlt} />} 
                    colorScheme="blue" 
                    variant="link"
                  >
                    Saiba mais
                  </Button>
                </NextLink>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </Flex>
      
      <Flex justify="flex-end" mt={3}>
        <NextLink href="/education" passHref>
          <Button as="a" size="xs" colorScheme="blue" variant="link">
            Ver glossário completo
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
}