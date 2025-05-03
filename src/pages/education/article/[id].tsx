import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon,
  Badge,
  Divider,
  VStack,
  Link,
  Button,
  Flex,
  Avatar,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader
} from '@chakra-ui/react';
import { FaArrowLeft, FaClock, FaChartLine, FaCalendarAlt, FaLink, FaBook } from 'react-icons/fa';
import NextLink from 'next/link';
import { Layout } from '../../../components/Layout';
import { educationArticles } from '../../../data/educationArticlesData';
import ReactMarkdown from 'react-markdown';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Cores para o tema claro/escuro
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('primary.600', 'cyberpunk.accent');

  // Buscar o artigo e artigos relacionados
  useEffect(() => {
    if (id) {
      const foundArticle = educationArticles.find(article => article.id === id);

      if (foundArticle) {
        setArticle(foundArticle);

        // Buscar artigos relacionados
        if (foundArticle.relatedArticles && foundArticle.relatedArticles.length > 0) {
          const related = educationArticles.filter(
            a => foundArticle.relatedArticles.includes(a.id)
          );
          setRelatedArticles(related);
        }
      }
    }
  }, [id]);

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

  // Se o artigo não for encontrado ou a página estiver carregando
  if (!article) {
    return (
      <Layout title="Carregando... | Educação Cidadã">
        <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
          <Container maxW="container.xl">
            <Text>Carregando artigo...</Text>
          </Container>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${article.title} | Educação Cidadã`}
      description={article.content.substring(0, 160)}
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          {/* Navegação */}
          <Flex mb={6} align="center">
            <NextLink href="/education" passHref>
              <Button
                as="a"
                leftIcon={<Icon as={FaArrowLeft} />}
                variant="ghost"
                size="sm"
              >
                Voltar à Educação Cidadã
              </Button>
            </NextLink>

            <Breadcrumb
              separator=">"
              ml={4}
            >
              <BreadcrumbItem>
                <NextLink href="/" passHref>
                  <BreadcrumbLink>Início</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <NextLink href="/education" passHref>
                  <BreadcrumbLink>Educação Cidadã</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text color={mutedColor} fontWeight="medium" fontSize="sm">
                  {article.title.length > 30 ? article.title.substring(0, 30) + '...' : article.title}
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>

          <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
            {/* Conteúdo principal */}
            <Box flex="1">
              <Box
                bg={cardBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                mb={6}
              >
                {/* Cabeçalho do artigo */}
                <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                  <HStack spacing={3} mb={3}>
                    <Badge colorScheme="blue">
                      {article.category}
                    </Badge>
                    <Badge colorScheme={getComplexityColor(article.complexity)}>
                      {article.complexity}
                    </Badge>
                  </HStack>

                  <Heading as="h1" size="xl" mb={4} color={textColor}>
                    {article.title}
                  </Heading>

                  <Flex
                    justify="space-between"
                    align="center"
                    direction={{ base: 'column', md: 'row' }}
                    gap={{ base: 3, md: 0 }}
                  >
                    <HStack spacing={4}>
                      {article.author && (
                        <>
                          <Avatar size="md" src={article.author.avatar} name={article.author.name} />
                          <Box>
                            <Text fontWeight="medium">{article.author.name}</Text>
                            <Text fontSize="sm" color={mutedColor}>
                              Publicado em {formatDate(article.publishedAt)}
                              {article.updatedAt && ` • Atualizado em ${formatDate(article.updatedAt)}`}
                            </Text>
                          </Box>
                        </>
                      )}
                    </HStack>

                    <HStack spacing={4}>
                      <HStack>
                        <Icon as={FaClock} color={mutedColor} />
                        <Text fontSize="sm" color={mutedColor}>
                          {article.readTime} min de leitura
                        </Text>
                      </HStack>

                      <HStack>
                        <Icon as={FaChartLine} color={mutedColor} />
                        <Text fontSize="sm" color={mutedColor}>
                          {article.complexity}
                        </Text>
                      </HStack>
                    </HStack>
                  </Flex>
                </Box>

                {/* Conteúdo do artigo */}
                <Box p={6}>
                  <Box className="markdown-content" sx={{
                    'h1, h2, h3, h4, h5, h6': {
                      color: textColor,
                      fontWeight: 'bold',
                      mt: 6,
                      mb: 3
                    },
                    'h1': { fontSize: '2xl', mt: 0 },
                    'h2': { fontSize: 'xl' },
                    'h3': { fontSize: 'lg' },
                    'p': { mb: 4, lineHeight: 1.7 },
                    'ul, ol': { pl: 6, mb: 4 },
                    'li': { mb: 2 },
                    'blockquote': {
                      borderLeftWidth: '4px',
                      borderLeftColor: accentColor,
                      pl: 4,
                      py: 1,
                      my: 4,
                      bg: useColorModeValue('gray.50', 'gray.700'),
                      borderRadius: 'md'
                    },
                    'a': {
                      color: accentColor,
                      textDecoration: 'underline'
                    },
                    'table': {
                      width: 'full',
                      my: 4,
                      borderWidth: '1px',
                      borderColor: borderColor
                    },
                    'th, td': {
                      borderWidth: '1px',
                      borderColor: borderColor,
                      p: 2
                    },
                    'th': {
                      bg: useColorModeValue('gray.50', 'gray.700'),
                      fontWeight: 'bold'
                    },
                    'code': {
                      bg: useColorModeValue('gray.50', 'gray.700'),
                      p: 1,
                      borderRadius: 'md',
                      fontFamily: 'mono'
                    }
                  }}>
                    <ReactMarkdown>
                      {article.content}
                    </ReactMarkdown>
                  </Box>

                  <Divider my={6} borderColor={borderColor} />

                  {/* Tags */}
                  <HStack spacing={2} wrap="wrap" mb={6}>
                    {article.tags.map((tag, index) => (
                      <Badge key={index} colorScheme="primary" variant="subtle">
                        #{tag}
                      </Badge>
                    ))}
                  </HStack>

                  {/* Referências */}
                  {article.references && article.references.length > 0 && (
                    <Box mt={8}>
                      <Heading as="h3" size="md" mb={4}>
                        Referências
                      </Heading>
                      <VStack align="stretch" spacing={2}>
                        {article.references.map((ref, index) => (
                          <Link
                            key={index}
                            href={ref.url}
                            isExternal
                            color={accentColor}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={FaLink} mr={2} boxSize={3} />
                            {ref.title}
                          </Link>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Sidebar */}
            <Box w={{ base: 'full', lg: '350px' }}>
              {/* Artigos relacionados */}
              {relatedArticles.length > 0 && (
                <Box
                  bg={cardBg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  overflow="hidden"
                  mb={6}
                >
                  <Box p={4} borderBottomWidth="1px" borderColor={borderColor}>
                    <Heading as="h3" size="md" display="flex" alignItems="center">
                      <Icon as={FaBook} mr={2} color={accentColor} />
                      Artigos Relacionados
                    </Heading>
                  </Box>

                  <VStack spacing={0} align="stretch" divider={<Divider />} p={2}>
                    {relatedArticles.map((relatedArticle) => (
                      <NextLink
                        key={relatedArticle.id}
                        href={`/education/article/${relatedArticle.id}`}
                        passHref
                      >
                        <Box
                          as="a"
                          p={4}
                          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                          transition="background 0.2s"
                          borderRadius="md"
                        >
                          <Text fontWeight="medium" mb={1}>
                            {relatedArticle.title}
                          </Text>
                          <HStack spacing={3}>
                            <Badge size="sm" colorScheme="blue">
                              {relatedArticle.category}
                            </Badge>
                            <HStack spacing={1}>
                              <Icon as={FaClock} boxSize={3} color={mutedColor} />
                              <Text fontSize="xs" color={mutedColor}>
                                {relatedArticle.readTime} min
                              </Text>
                            </HStack>
                          </HStack>
                        </Box>
                      </NextLink>
                    ))}
                  </VStack>
                </Box>
              )}

              {/* Outros artigos da mesma categoria */}
              <Box
                bg={cardBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
              >
                <Box p={4} borderBottomWidth="1px" borderColor={borderColor}>
                  <Heading as="h3" size="md">
                    Mais sobre {article.category}
                  </Heading>
                </Box>

                <VStack spacing={0} align="stretch" divider={<Divider />} p={2}>
                  {educationArticles
                    .filter(a => a.category === article.category && a.id !== article.id)
                    .slice(0, 3)
                    .map((categoryArticle) => (
                      <NextLink
                        key={categoryArticle.id}
                        href={`/education/article/${categoryArticle.id}`}
                        passHref
                      >
                        <Box
                          as="a"
                          p={4}
                          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                          transition="background 0.2s"
                          borderRadius="md"
                        >
                          <Text fontWeight="medium" mb={1}>
                            {categoryArticle.title}
                          </Text>
                          <HStack spacing={3}>
                            <Badge size="sm" colorScheme={getComplexityColor(categoryArticle.complexity)}>
                              {categoryArticle.complexity}
                            </Badge>
                            <HStack spacing={1}>
                              <Icon as={FaClock} boxSize={3} color={mutedColor} />
                              <Text fontSize="xs" color={mutedColor}>
                                {categoryArticle.readTime} min
                              </Text>
                            </HStack>
                          </HStack>
                        </Box>
                      </NextLink>
                    ))}
                </VStack>

                <Box p={4}>
                  <NextLink href="/education" passHref>
                    <Button
                      as="a"
                      rightIcon={<Icon as={FaArrowLeft} transform="rotate(180deg)" />}
                      variant="outline"
                      size="sm"
                      width="full"
                    >
                      Ver todos os artigos
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
}