import {
  Box,
  Heading,
  Text,
  Image,
  Badge,
  HStack,
  Icon,
  useColorModeValue,
  VStack,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'
import { FaClock, FaChartLine } from 'react-icons/fa'
import { IconType } from 'react-icons'
import NextLink from 'next/link'

interface EducationCardProps {
  title: string;
  description: string;
  image: string;
  icon: IconType;
  tags: string[];
  readTime: number;
  complexity: 'Básico' | 'Intermediário' | 'Avançado';
}

export function EducationCard({
  title,
  description,
  image,
  icon,
  tags,
  readTime,
  complexity
}: EducationCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const isDark = useColorModeValue(false, true)
  
  // Função para obter a cor do badge de complexidade
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
        transform: "translateY(-5px)",
        boxShadow: isDark ? "0 8px 30px rgba(0, 255, 255, 0.1)" : "md"
      }}
      position="relative"
      height="100%"
      display="flex"
      flexDirection="column"
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
      
      {/* Imagem */}
      <Box position="relative" height="160px" overflow="hidden">
        <Image 
          src={image} 
          alt={title}
          fallbackSrc="https://via.placeholder.com/400x160"
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box 
          position="absolute" 
          top={3} 
          left={3}
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="full"
          p={2}
          boxShadow="md"
        >
          <Icon as={icon} boxSize={5} color={useColorModeValue('primary.600', 'cyberpunk.accent')} />
        </Box>
      </Box>
      
      {/* Conteúdo */}
      <VStack p={5} align="stretch" flex="1" spacing={4}>
        <NextLink href="#" passHref>
          <LinkOverlay>
            <Heading as="h3" size="md" color={textColor} lineHeight="tight">
              {title}
            </Heading>
          </LinkOverlay>
        </NextLink>
        
        <Text color={mutedColor} fontSize="sm" noOfLines={3}>
          {description}
        </Text>
        
        <HStack spacing={2} flexWrap="wrap">
          {tags.map((tag, index) => (
            <Badge key={index} colorScheme="primary" variant="subtle" fontSize="xs">
              {tag}
            </Badge>
          ))}
        </HStack>
        
        <HStack mt="auto" pt={2} justify="space-between">
          <HStack spacing={1}>
            <Icon as={FaClock} boxSize={3} color={mutedColor} />
            <Text fontSize="xs" color={mutedColor}>
              {readTime} min de leitura
            </Text>
          </HStack>
          
          <Badge colorScheme={getComplexityColor(complexity)}>
            {complexity}
          </Badge>
        </HStack>
      </VStack>
    </LinkBox>
  )
}