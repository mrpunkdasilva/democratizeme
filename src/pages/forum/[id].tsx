import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Avatar,
  Badge,
  Button,
  Icon,
  HStack,
  VStack,
  Divider,
  Textarea,
  useColorModeValue,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { FaThumbsUp, FaThumbsDown, FaReply, FaFlag, FaShare, FaArrowLeft, FaChevronRight } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { forumTopics } from '../../mocks/forum'
import NextLink from 'next/link'

export default function TopicPage() {
  const router = useRouter()
  const { id } = router.query
  const [replyText, setReplyText] = useState('')
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const isDark = useColorModeValue(false, true)
  
  // Encontrar o tópico com base no ID
  const topic = forumTopics.find(t => t.id === Number(id))
  
  // Se o tópico não for encontrado ou a página estiver carregando
  if (!topic) {
    return (
      <Layout title="Carregando... | Fórum Cidadão">
        <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
          <Container maxW="container.xl">
            <Text>Carregando tópico...</Text>
          </Container>
        </Box>
      </Layout>
    )
  }
  
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
  }
  
  // Função para obter a cor da categoria
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'projetos': return 'blue';
      case 'politicos': return 'purple';
      case 'eleicoes': return 'orange';
      case 'direitos': return 'green';
      case 'debates': return 'red';
      default: return 'gray';
    }
  }
  
  // Função para obter o rótulo da categoria
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'projetos': return 'Projetos de Lei';
      case 'politicos': return 'Políticos';
      case 'eleicoes': return 'Eleições';
      case 'direitos': return 'Direitos Cidadãos';
      case 'debates': return 'Debates';
      default: return category;
    }
  }
  
  return (
    <Layout 
      title={`${topic.title} | Fórum Cidadão`}
      description={topic.content.substring(0, 160)}
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          {/* Navegação */}
          <Flex mb={6} align="center">
            <NextLink href="/forum" passHref>
              <Button 
                as="a" 
                leftIcon={<Icon as={FaArrowLeft} />} 
                variant="ghost" 
                size="sm"
              >
                Voltar ao Fórum
              </Button>
            </NextLink>
            
            <Breadcrumb 
              separator={<Icon as={FaChevronRight} color="gray.500" boxSize={3} />}
              ml={4}
            >
              <BreadcrumbItem>
                <NextLink href="/forum" passHref>
                  <BreadcrumbLink>Fórum</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <NextLink href={`/forum?category=${topic.category}`} passHref>
                  <BreadcrumbLink>{getCategoryLabel(topic.category)}</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text color={mutedColor} fontWeight="medium" fontSize="sm">
                  {topic.title.length > 30 ? topic.title.substring(0, 30) + '...' : topic.title}
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          
          {/* Tópico principal */}
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            borderWidth="1px" 
            borderColor={borderColor}
            overflow="hidden"
            mb={6}
          >
            {/* Cabeçalho do tópico */}
            <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
              <HStack spacing={3} mb={3}>
                <Badge colorScheme={getCategoryColor(topic.category)}>
                  {getCategoryLabel(topic.category)}
                </Badge>
                {topic.isPinned && <Badge colorScheme="yellow">Fixado</Badge>}
                {topic.isLocked && <Badge colorScheme="red">Bloqueado</Badge>}
              </HStack>
              
              <Heading as="h1" size="lg" mb={4} color={textColor}>
                {topic.title}
              </Heading>
              
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <Avatar size="md" src={topic.author.avatar} name={topic.author.name} />
                  <Box>
                    <Text fontWeight="medium">{topic.author.name}</Text>
                    <Text fontSize="sm" color={mutedColor}>
                      Publicado em {formatDate(topic.createdAt)}
                    </Text>
                  </Box>
                </HStack>
                
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Compartilhar"
                    icon={<Icon as={FaShare} />}
                    variant="ghost"
                    size="sm"
                  />
                  <IconButton
                    aria-label="Denunciar"
                    icon={<Icon as={FaFlag} />}
                    variant="ghost"
                    size="sm"
                  />
                </HStack>
              </Flex>
            </Box>
            
            {/* Conteúdo do tópico */}
            <Box p={6}>
              <Text fontSize="md" whiteSpace="pre-line">
                {topic.content}
              </Text>
              
              <HStack mt={8} spacing={4} wrap="wrap">
                {topic.tags.map((tag, index) => (
                  <Badge key={index} colorScheme="primary" variant="subtle">
                    #{tag}
                  </Badge>
                ))}
              </HStack>
              
              <Divider my={6} borderColor={borderColor} />
              
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <Button
                    leftIcon={<Icon as={FaThumbsUp} />}
                    variant="outline"
                    size="sm"
                    colorScheme="green"
                  >
                    {topic.upvotes}
                  </Button>
                  <Button
                    leftIcon={<Icon as={FaThumbsDown} />}
                    variant="outline"
                    size="sm"
                    colorScheme="red"
                  >
                    {topic.downvotes}
                  </Button>
                </HStack>
                
                <Text fontSize="sm" color={mutedColor}>
                  {topic.views} visualizações
                </Text>
              </Flex>
            </Box>
          </Box>
          
          {/* Seção de comentários */}
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            borderWidth="1px" 
            borderColor={borderColor}
            overflow="hidden"
            mb={6}
          >
            <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
              <Heading as="h2" size="md" mb={2}>
                Comentários ({topic.comments})
              </Heading>
              <Text fontSize="sm" color={mutedColor}>
                Participe da discussão de forma respeitosa e construtiva
              </Text>
            </Box>
            
            <Box p={6}>
              {/* Aqui seria renderizada a lista de comentários */}
              <Text color={mutedColor} textAlign="center" py={8}>
                Os comentários serão implementados em breve.
              </Text>
              
              {/* Formulário de resposta */}
              <Box mt={6}>
                <Heading as="h3" size="sm" mb={3}>
                  Deixe seu comentário
                </Heading>
                <Textarea
                  placeholder="Escreva sua resposta aqui..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  mb={3}
                  resize="vertical"
                  minH="120px"
                />
                <Flex justify="flex-end">
                  <Button
                    leftIcon={<Icon as={FaReply} />}
                    colorScheme="primary"
                    variant={isDark ? "cyberpunk" : "solid"}
                    isDisabled={!replyText.trim()}
                  >
                    Responder
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
          
          {/* Tópicos relacionados */}
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            borderWidth="1px" 
            borderColor={borderColor}
            overflow="hidden"
          >
            <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
              <Heading as="h2" size="md">
                Tópicos relacionados
              </Heading>
            </Box>
            
            <Box p={6}>
              <VStack spacing={4} align="stretch">
                {forumTopics
                  .filter(t => 
                    t.id !== topic.id && 
                    (t.category === topic.category || 
                     t.tags.some(tag => topic.tags.includes(tag)))
                  )
                  .slice(0, 3)
                  .map(relatedTopic => (
                    <NextLink key={relatedTopic.id} href={`/forum/${relatedTopic.id}`} passHref>
                      <Box 
                        as="a" 
                        p={3} 
                        borderRadius="md" 
                        borderWidth="1px"
                        borderColor={borderColor}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      >
                        <HStack spacing={2} mb={1}>
                          <Badge colorScheme={getCategoryColor(relatedTopic.category)} size="sm">
                            {getCategoryLabel(relatedTopic.category)}
                          </Badge>
                        </HStack>
                        <Text fontWeight="medium" mb={1}>
                          {relatedTopic.title}
                        </Text>
                        <HStack spacing={4}>
                          <Text fontSize="xs" color={mutedColor}>
                            {relatedTopic.comments} comentários
                          </Text>
                          <Text fontSize="xs" color={mutedColor}>
                            {relatedTopic.upvotes} votos
                          </Text>
                        </HStack>
                      </Box>
                    </NextLink>
                  ))}
                
                {forumTopics.filter(t => 
                  t.id !== topic.id && 
                  (t.category === topic.category || 
                   t.tags.some(tag => topic.tags.includes(tag)))
                ).length === 0 && (
                  <Text color={mutedColor} textAlign="center" py={4}>
                    Nenhum tópico relacionado encontrado.
                  </Text>
                )}
              </VStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}