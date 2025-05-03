import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  Icon,
  useColorModeValue,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import { FaClock, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import NextLink from 'next/link';

// Definir a interface para o tipo EducationArticle
interface EducationArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  complexity: string;
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author?: {
    name: string;
    avatar: string;
  };
  relatedArticles?: string[];
  references?: Array<{
    title: string;
    url: string;
  }>;
}

interface ArticleCardProps {
  article: EducationArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const isDark = useColorModeValue(false, true);
  
  // Formatar data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Obter cor do badge de complexidade
  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'Básico': return 'green';
      case 'Intermediário': return 'blue';
      case 'Avançado': return 'purple';
      default: return 'gray';
    }
  };
  
  return (
    <LinkBox 
      as="article"
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      boxShadow={isDark ? "0 4px 20px rgba(0, 255, 255, 0.05)" : "sm"}
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: isDark ? "0 8px 30px rgba(0, 255, 255, 0.1)" : "md"
      }}
      height="100%"
      display="flex"
      flexDirection="column"
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
      
      <Box p={5}>
        <HStack spacing={2} mb={2}>
          <Badge colorScheme="blue">
            {article.category}
          </Badge>
          <Badge colorScheme={getComplexityColor(article.complexity)}>
            {article.complexity}
          </Badge>
        </HStack>
        
        <NextLink href={`/education/article/${article.id}`} passHref>
          <LinkOverlay>
            <Heading as="h3" size="md" mb={3} color={textColor} noOfLines={2}>
              {article.title}
            </Heading>
          </LinkOverlay>
        </NextLink>
        
        <Text color={mutedColor} fontSize="sm" mb={4} noOfLines={3}>
          {article.content.replace(/[#*]/g, '').substring(0, 150)}...
        </Text>
        
        <HStack spacing={4} mt="auto">
          <HStack spacing={1}>
            <Icon as={FaClock} boxSize={3} color={mutedColor} />
            <Text fontSize="xs" color={mutedColor}>
              {article.readTime} min de leitura
            </Text>
          </HStack>
          
          <HStack spacing={1}>
            <Icon as={FaCalendarAlt} boxSize={3} color={mutedColor} />
            <Text fontSize="xs" color={mutedColor}>
              {formatDate(article.publishedAt)}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </LinkBox>
  );
}
