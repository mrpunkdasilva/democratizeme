import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  HStack,
  Badge
} from '@chakra-ui/react';
import { FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';

export function EducationBanner() {
  const bgColor = useColorModeValue('primary.50', 'rgba(0, 255, 255, 0.05)');
  const borderColor = useColorModeValue('primary.100', 'rgba(0, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent');
  const isDark = useColorModeValue(false, true);
  
  return (
    <Box 
      p={6} 
      borderRadius="lg" 
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
      mb={8}
    >
      {isDark && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-br, rgba(0,255,255,0.05), transparent)"
          opacity="0.6"
          pointerEvents="none"
        />
      )}
      
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" position="relative">
        <Box mb={{ base: 4, md: 0 }}>
          <HStack mb={2}>
            <Icon as={FaGraduationCap} color={accentColor} boxSize={6} />
            <Heading as="h2" size="md" color={textColor}>
              Educação Cidadã
            </Heading>
          </HStack>
          
          <Text color={textColor} mb={3}>
            Entenda melhor os termos políticos e o processo legislativo para participar de discussões mais informadas.
          </Text>
          
          <HStack spacing={2} wrap="wrap">
            <Badge colorScheme="blue">Glossário Político</Badge>
            <Badge colorScheme="green">Guias Legislativos</Badge>
            <Badge colorScheme="purple">Direitos do Cidadão</Badge>
          </HStack>
        </Box>
        
        <NextLink href="/education" passHref>
          <Button 
            as="a" 
            rightIcon={<Icon as={FaArrowRight} />}
            colorScheme="primary"
            variant={isDark ? "cyberpunk" : "solid"}
            size="md"
          >
            Acessar conteúdo educativo
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
}