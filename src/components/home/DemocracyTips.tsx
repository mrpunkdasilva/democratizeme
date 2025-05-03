import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Icon,
  Flex,
  Button,
  useColorModeValue,
  HStack,
  VStack,
  Divider
} from '@chakra-ui/react';
import { FaLightbulb, FaArrowRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import NextLink from 'next/link';

// Dicas sobre democracia e participação cidadã
const democracyTips = [
  {
    tip: "A democracia não é apenas votar a cada eleição, mas participar ativamente das decisões públicas no dia a dia.",
    source: "Democracia Participativa"
  },
  {
    tip: "Conhecer seus direitos e deveres é o primeiro passo para exercer plenamente sua cidadania.",
    source: "Educação Cidadã"
  },
  {
    tip: "Acompanhar os projetos de lei em tramitação permite que você opine antes que as decisões sejam tomadas.",
    source: "Participação Legislativa"
  },
  {
    tip: "A transparência dos dados públicos é um direito do cidadão e um dever do Estado democrático.",
    source: "Transparência Pública"
  },
  {
    tip: "Debates informados e respeitosos são a base de uma democracia saudável.",
    source: "Diálogo Democrático"
  }
];

// Citações sobre democracia
const democracyQuotes = [
  {
    quote: "A democracia é o governo do povo, pelo povo, para o povo.",
    author: "Abraham Lincoln"
  },
  {
    quote: "A ignorância é a maldição de Deus; o conhecimento é a asa com que voamos para o céu.",
    author: "William Shakespeare"
  },
  {
    quote: "Educação não transforma o mundo. Educação muda as pessoas. Pessoas transformam o mundo.",
    author: "Paulo Freire"
  },
  {
    quote: "O preço da democracia é a eterna vigilância.",
    author: "Thomas Jefferson"
  }
];

export function DemocracyTips() {
  const [currentTip, setCurrentTip] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const bgColor = useColorModeValue('blue.50', 'rgba(33, 150, 243, 0.1)');
  const borderColor = useColorModeValue('blue.100', 'rgba(33, 150, 243, 0.2)');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  
  // Alternar dicas a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % democracyTips.length);
      setCurrentQuote((prev) => (prev + 1) % democracyQuotes.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      mb={8}
    >
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex="1">
          <Flex align="center" mb={4}>
            <Icon as={FaLightbulb} color={accentColor} boxSize={5} mr={2} />
            <Heading size="md" color={textColor}>
              Conhecimento é Democracia
            </Heading>
          </Flex>
          
          <Box
            p={4}
            bg={cardBg}
            borderRadius="md"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            height="100px"
            display="flex"
            alignItems="center"
            position="relative"
            overflow="hidden"
          >
            {democracyTips.map((item, index) => (
              <VStack
                key={index}
                spacing={2}
                position="absolute"
                opacity={currentTip === index ? 1 : 0}
                transform={`translateY(${currentTip === index ? 0 : 20}px)`}
                transition="all 0.5s ease"
                width="100%"
                px={2}
              >
                <Text fontWeight="medium" textAlign="center">
                  {item.tip}
                </Text>
                <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                  {item.source}
                </Text>
              </VStack>
            ))}
          </Box>
          
          <HStack mt={4} spacing={4} justify="center">
            <NextLink href="/education" passHref>
              <Button
                as="a"
                rightIcon={<Icon as={FaArrowRight} />}
                colorScheme="blue"
                size="sm"
              >
                Educação Cidadã
              </Button>
            </NextLink>
            <NextLink href="/forum" passHref>
              <Button
                as="a"
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                Participar
              </Button>
            </NextLink>
          </HStack>
        </Box>
        
        <Divider orientation="vertical" display={{ base: 'none', md: 'block' }} />
        
        <Box flex="1">
          <Heading size="md" color={textColor} mb={4}>
            Pensamentos Democráticos
          </Heading>
          
          <Box
            p={4}
            bg={cardBg}
            borderRadius="md"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            height="100px"
            display="flex"
            alignItems="center"
            position="relative"
            overflow="hidden"
          >
            {democracyQuotes.map((item, index) => (
              <VStack
                key={index}
                spacing={2}
                position="absolute"
                opacity={currentQuote === index ? 1 : 0}
                transform={`translateY(${currentQuote === index ? 0 : 20}px)`}
                transition="all 0.5s ease"
                width="100%"
                px={2}
              >
                <Flex align="center">
                  <Icon as={FaQuoteLeft} color={accentColor} opacity={0.5} mr={2} />
                  <Text fontStyle="italic" textAlign="center" fontWeight="medium">
                    {item.quote}
                  </Text>
                  <Icon as={FaQuoteRight} color={accentColor} opacity={0.5} ml={2} />
                </Flex>
                <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                  — {item.author}
                </Text>
              </VStack>
            ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}