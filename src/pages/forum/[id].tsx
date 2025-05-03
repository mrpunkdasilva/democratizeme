import React, { useState, useEffect } from 'react'
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
  BreadcrumbLink,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { FaThumbsUp, FaThumbsDown, FaReply, FaFlag, FaShare, FaArrowLeft, FaChevronRight, FaBookmark, FaEllipsisH } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { forumTopics } from '../../mocks/forum'
import NextLink from 'next/link'
import { EducationWidget } from '../../components/forum/EducationWidget'

// Tipo para comentários
type Comment = {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  isEdited: boolean;
};

export default function TopicPage() {
  const router = useRouter()
  const { id } = router.query
  const [replyText, setReplyText] = useState('')
  const [isVoted, setIsVoted] = useState<'up' | 'down' | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [localTopic, setLocalTopic] = useState<any>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const isDark = useColorModeValue(false, true)
  
  // Encontrar o tópico com base no ID
  const topic = forumTopics.find(t => t.id === Number(id))
  
  // Efeito para inicializar o tópico local e comentários mockados
  useEffect(() => {
    if (topic) {
      setLocalTopic({...topic})
      
      // Gerar comentários mockados
      const mockComments: Comment[] = [
        {
          id: 1,
          content: "Concordo plenamente com os pontos levantados. Precisamos de mais transparência nos processos legislativos.",
          author: {
            id: 2,
            name: "Rafael Mendes",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          createdAt: "2023-08-16T10:30:00Z",
          upvotes: 12,
          downvotes: 1,
          isEdited: false
        },
        {
          id: 2,
          content: "Discordo do ponto 3. Acho que a implementação seria muito complexa e custosa para o benefício que traria.",
          author: {
            id: 5,
            name: "Juliana Costa",
            avatar: "https://randomuser.me/api/portraits/women/62.jpg"
          },
          createdAt: "2023-08-16T14:45:00Z",
          upvotes: 5,
          downvotes: 8,
          isEdited: true
        },
        {
          id: 3,
          content: "Alguém tem mais informações sobre como isso afetaria os municípios menores?",
          author: {
            id: 3,
            name: "Amanda Oliveira",
            avatar: "https://randomuser.me/api/portraits/women/28.jpg"
          },
          createdAt: "2023-08-17T09:15:00Z",
          upvotes: 7,
          downvotes: 0,
          isEdited: false
        }
      ];
      
      setComments(mockComments);
    }
  }, [topic]);
  
  // Se o tópico não for encontrado ou a página estiver carregando
  if (!topic || !localTopic) {
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
  
  // Função para lidar com votos
  const handleVote = (type: 'up' | 'down') => {
    const newTopic = {...localTopic};
    
    if (isVoted === type) {
      // Remover voto
      if (type === 'up') {
        newTopic.upvotes -= 1;
      } else {
        newTopic.downvotes -= 1;
      }
      setIsVoted(null);
    } else {
      // Adicionar novo voto e remover voto anterior se existir
      if (isVoted === 'up' && type === 'down') {
        newTopic.upvotes -= 1;
        newTopic.downvotes += 1;
      } else if (isVoted === 'down' && type === 'up') {
        newTopic.downvotes -= 1;
        newTopic.upvotes += 1;
      } else if (type === 'up') {
        newTopic.upvotes += 1;
      } else {
        newTopic.downvotes += 1;
      }
      setIsVoted(type);
    }
    
    setLocalTopic(newTopic);
    
    toast({
      title: type === 'up' ? 'Voto positivo registrado' : 'Voto negativo registrado',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right'
    });
  };
  
  // Função para lidar com favoritos
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? 'Tópico removido dos favoritos' : 'Tópico adicionado aos favoritos',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right'
    });
  };
  
  // Função para compartilhar
  const handleShare = () => {
    // Simular compartilhamento copiando o link para a área de transferência
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: 'Link copiado para a área de transferência',
      description: 'Agora você pode compartilhar este tópico',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    });
  };
  
  // Função para denunciar
  const handleReport = () => {
    onClose();
    
    toast({
      title: 'Denúncia enviada',
      description: 'Nossa equipe irá analisar o conteúdo em breve',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    });
  };
  
  // Função para enviar comentário
  const handleSubmitComment = () => {
    if (!replyText.trim()) return;
    
    // Criar novo comentário
    const newComment: Comment = {
      id: comments.length + 1,
      content: replyText,
      author: {
        id: 999, // ID do usuário logado (mockado)
        name: "Você",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      },
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      isEdited: false
    };
    
    // Adicionar comentário à lista
    setComments([...comments, newComment]);
    
    // Atualizar contador de comentários no tópico
    setLocalTopic({
      ...localTopic,
      comments: localTopic.comments + 1
    });
    
    // Limpar campo de texto
    setReplyText('');
    
    toast({
      title: 'Comentário publicado',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right'
    });
  };
  
  return (
    <Layout 
      title={`${localTopic.title} | Fórum Cidadão`}
      description={localTopic.content.substring(0, 160)}
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
                <NextLink href={`/forum?category=${localTopic.category}`} passHref>
                  <BreadcrumbLink>{getCategoryLabel(localTopic.category)}</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text color={mutedColor} fontWeight="medium" fontSize="sm">
                  {localTopic.title.length > 30 ? localTopic.title.substring(0, 30) + '...' : localTopic.title}
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          
          <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
            <Box flex="1">
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
                    <Badge colorScheme={getCategoryColor(localTopic.category)}>
                      {getCategoryLabel(localTopic.category)}
                    </Badge>
                    {localTopic.isPinned && <Badge colorScheme="yellow">Fixado</Badge>}
                    {localTopic.isLocked && <Badge colorScheme="red">Bloqueado</Badge>}
                  </HStack>
                  
                  <Heading as="h1" size="lg" mb={4} color={textColor}>
                    {localTopic.title}
                  </Heading>
                  
                  <Flex justify="space-between" align="center">
                    <HStack spacing={4}>
                      <Avatar size="md" src={localTopic.author.avatar} name={localTopic.author.name} />
                      <Box>
                        <Text fontWeight="medium">{localTopic.author.name}</Text>
                        <Text fontSize="sm" color={mutedColor}>
                          Publicado em {formatDate(localTopic.createdAt)}
                        </Text>
                      </Box>
                    </HStack>
                    
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Favoritar"
                        icon={<Icon as={FaBookmark} />}
                        variant={isBookmarked ? "solid" : "ghost"}
                        colorScheme={isBookmarked ? "yellow" : "gray"}
                        size="sm"
                        onClick={handleBookmark}
                      />
                      <IconButton
                        aria-label="Compartilhar"
                        icon={<Icon as={FaShare} />}
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                      />
                      <IconButton
                        aria-label="Denunciar"
                        icon={<Icon as={FaFlag} />}
                        variant="ghost"
                        size="sm"
                        onClick={onOpen}
                      />
                      <IconButton
                        aria-label="Mais opções"
                        icon={<Icon as={FaEllipsisH} />}
                        variant="ghost"
                        size="sm"
                      />
                    </HStack>
                  </Flex>
                </Box>
                
                {/* Conteúdo do tópico */}
                <Box p={6}>
                  <Text fontSize="md" whiteSpace="pre-line">
                    {localTopic.content}
                  </Text>
                  
                  <HStack mt={8} spacing={4} wrap="wrap">
                    {localTopic.tags.map((tag, index) => (
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
                        variant={isVoted === 'up' ? "solid" : "outline"}
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleVote('up')}
                      >
                        {localTopic.upvotes}
                      </Button>
                      <Button
                        leftIcon={<Icon as={FaThumbsDown} />}
                        variant={isVoted === 'down' ? "solid" : "outline"}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleVote('down')}
                      >
                        {localTopic.downvotes}
                      </Button>
                    </HStack>
                    
                    <Text fontSize="sm" color={mutedColor}>
                      {localTopic.views} visualizações
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
                    Comentários ({localTopic.comments})
                  </Heading>
                  <Text fontSize="sm" color={mutedColor}>
                    Participe da discussão de forma respeitosa e construtiva
                  </Text>
                </Box>
                
                <Box p={6}>
                  {/* Lista de comentários */}
                  {comments.length > 0 ? (
                    <VStack spacing={4} align="stretch" mb={8}>
                      {comments.map((comment) => (
                        <Box 
                          key={comment.id}
                          p={4}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                        >
                          <Flex mb={3}>
                            <Avatar size="sm" src={comment.author.avatar} name={comment.author.name} mr={3} />
                            <Box flex="1">
                              <Flex justify="space-between" align="center">
                                <Text fontWeight="medium">{comment.author.name}</Text>
                                <Text fontSize="xs" color={mutedColor}>
                                  {formatDate(comment.createdAt)}
                                  {comment.isEdited && ' (editado)'}
                                </Text>
                              </Flex>
                            </Box>
                          </Flex>
                          
                          <Text mb={3}>{comment.content}</Text>
                          
                          <Flex justify="space-between" align="center">
                            <HStack spacing={2}>
                              <Button size="xs" leftIcon={<Icon as={FaThumbsUp} boxSize={3} />} variant="ghost">
                                {comment.upvotes}
                              </Button>
                              <Button size="xs" leftIcon={<Icon as={FaThumbsDown} boxSize={3} />} variant="ghost">
                                {comment.downvotes}
                              </Button>
                              <Button size="xs" leftIcon={<Icon as={FaReply} boxSize={3} />} variant="ghost">
                                Responder
                              </Button>
                            </HStack>
                            
                            <IconButton
                              aria-label="Mais opções"
                              icon={<Icon as={FaEllipsisH} />}
                              variant="ghost"
                              size="xs"
                            />
                          </Flex>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Text color={mutedColor} textAlign="center" py={8}>
                      Seja o primeiro a comentar neste tópico.
                    </Text>
                  )}
                  
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
                        onClick={handleSubmitComment}
                      >
                        Responder
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box w={{ base: 'full', lg: '350px' }}>
              {/* Widget de Educação Cidadã */}
              <EducationWidget />
              
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
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layout>
  )
}
