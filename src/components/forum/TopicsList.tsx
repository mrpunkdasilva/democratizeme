import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Avatar,
  Badge,
  Icon,
  Flex,
  useColorModeValue,
  Divider
} from '@chakra-ui/react'
import { FaComment, FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import NextLink from 'next/link'
import { forumTopics } from '../../mocks/forum'

interface TopicsListProps {
  searchTerm: string;
  filterCategory: string;
  sortBy: 'popular' | 'recent' | 'votes';
}

export function TopicsList({ searchTerm, filterCategory, sortBy }: TopicsListProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  
  // Filtrar tópicos com base na busca e categoria
  let filteredTopics = forumTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    topic.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (filterCategory !== 'todos') {
    filteredTopics = filteredTopics.filter(topic => 
      topic.category === filterCategory
    );
  }
  
  // Ordenar tópicos
  if (sortBy === 'popular') {
    filteredTopics.sort((a, b) => b.views - a.views);
  } else if (sortBy === 'recent') {
    filteredTopics.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'votes') {
    filteredTopics.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  }
  
  if (filteredTopics.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color={mutedColor}>
          Nenhum tópico encontrado com os filtros atuais.
        </Text>
      </Box>
    );
  }
  
  return (
    <VStack spacing={4} align="stretch">
      {filteredTopics.map((topic, index) => (
        <Box key={topic.id}>
          <NextLink href={`/forum/${topic.id}`} passHref>
            <Box 
              as="a"
              p={4}
              borderRadius="md"
              _hover={{ bg: hoverBg }}
              transition="background 0.2s"
            >
              <Flex justify="space-between" align="flex-start">
                <Box flex="1">
                  <HStack mb={2} spacing={2}>
                    <Badge colorScheme={getCategoryColor(topic.category)}>
                      {getCategoryLabel(topic.category)}
                    </Badge>
                    {topic.isPinned && (
                      <Badge colorScheme="yellow">Fixado</Badge>
                    )}
                  </HStack>
                  
                  <Heading as="h3" size="md" color={textColor} mb={2}>
                    {topic.title}
                  </Heading>
                  
                  <Text color={mutedColor} noOfLines={2} mb={3} fontSize="sm">
                    {topic.content}
                  </Text>
                  
                  <HStack spacing={4}>
                    <HStack spacing={1}>
                      <Avatar size="xs" src={topic.author.avatar} name={topic.author.name} />
                      <Text fontSize="xs" color={mutedColor}>
                        {topic.author.name}
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color={mutedColor}>
                      {formatDate(topic.createdAt)}
                    </Text>
                  </HStack>
                </Box>
                
                <HStack spacing={4} align="center" ml={4}>
                  <Flex direction="column" align="center">
                    <HStack>
                      <Icon as={FaThumbsUp} color="green.500" boxSize={3} />
                      <Text fontSize="xs" fontWeight="bold">
                        {topic.upvotes}
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaThumbsDown} color="red.500" boxSize={3} />
                      <Text fontSize="xs" fontWeight="bold">
                        {topic.downvotes}
                      </Text>
                    </HStack>
                  </Flex>
                  
                  <Flex direction="column" align="center">
                    <HStack>
                      <Icon as={FaComment} color="blue.500" boxSize={3} />
                      <Text fontSize="xs" fontWeight="bold">
                        {topic.comments}
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaEye} color="purple.500" boxSize={3} />
                      <Text fontSize="xs" fontWeight="bold">
                        {topic.views}
                      </Text>
                    </HStack>
                  </Flex>
                </HStack>
              </Flex>
            </Box>
          </NextLink>
          {index < filteredTopics.length - 1 && <Divider borderColor={borderColor} />}
        </Box>
      ))}
    </VStack>
  )
}

// Funções auxiliares
function getCategoryColor(category: string): string {
  switch (category) {
    case 'projetos': return 'blue';
    case 'politicos': return 'purple';
    case 'eleicoes': return 'orange';
    case 'direitos': return 'green';
    case 'debates': return 'red';
    default: return 'gray';
  }
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'projetos': return 'Projetos de Lei';
    case 'politicos': return 'Políticos';
    case 'eleicoes': return 'Eleições';
    case 'direitos': return 'Direitos Cidadãos';
    case 'debates': return 'Debates';
    default: return category;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Hoje';
  } else if (diffDays === 1) {
    return 'Ontem';
  } else if (diffDays < 7) {
    return `${diffDays} dias atrás`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`;
  } else {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('pt-BR', options);
  }
}