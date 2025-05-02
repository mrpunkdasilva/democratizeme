import { Box, Container, Flex, Heading, SimpleGrid, Text, Image, Button, Icon, useColorModeValue, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { FaArrowRight, FaClock } from 'react-icons/fa'
import NextLink from 'next/link'

// Dados mockados para demonstração
const recentNews = [
  {
    id: 1,
    title: 'Aprovada nova lei de transparência para gastos públicos',
    excerpt: 'O Congresso Nacional aprovou nesta semana uma nova lei que aumenta a transparência nos gastos públicos...',
    image: '/news-placeholder1.jpg',
    date: '2023-08-15',
    category: 'Legislação'
  },
  {
    id: 2,
    title: 'Comissão de Ética investiga denúncias contra senador',
    excerpt: 'A Comissão de Ética do Senado Federal abriu investigação para apurar denúncias de irregularidades...',
    image: '/news-placeholder2.jpg',
    date: '2023-08-12',
    category: 'Ética'
  },
  {
    id: 3,
    title: 'Projeto de lei sobre reforma tributária avança na Câmara',
    excerpt: 'O projeto de lei que propõe mudanças no sistema tributário brasileiro avançou na Câmara dos Deputados...',
    image: '/news-placeholder3.jpg',
    date: '2023-08-10',
    category: 'Economia'
  }
]

export function NewsSection() {
  const bgColor = useColorModeValue('gray.50', 'rgba(10, 25, 41, 0.5)')
  const cardBg = useColorModeValue('white', 'rgba(10, 25, 41, 0.8)')
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.15)')
  const isDark = useColorModeValue(false, true)
  const headingColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const categoryBg = useColorModeValue('primary.50', 'rgba(0, 255, 255, 0.1)')
  const categoryColor = useColorModeValue('primary.700', 'cyberpunk.accent')

  return (
    <Box py={16} bg={bgColor}>
      <Container maxW="container.xl">
        <Flex 
          direction="column" 
          align="center" 
          mb={12}
        >
          <Heading 
            as="h2" 
            size="xl" 
            textAlign="center"
            mb={4}
            bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : undefined}
            bgClip={isDark ? "text" : undefined}
            color={isDark ? "transparent" : headingColor}
          >
            Notícias Recentes
          </Heading>
          <Text 
            fontSize="lg" 
            color={textColor}
            textAlign="center"
            maxW="container.md"
            mb={8}
          >
            Fique por dentro das últimas notícias sobre política e legislação
          </Text>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {recentNews.map((news) => (
            <LinkBox 
              key={news.id}
              as="article"
              bg={cardBg}
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
              
              <Box height="200px" position="relative">
                <Image
                  src={news.image}
                  alt={news.title}
                  fallbackSrc="https://via.placeholder.com/400x200?text=Notícia"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Box 
                  position="absolute" 
                  top={3} 
                  left={3} 
                  bg={categoryBg}
                  color={categoryColor}
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {news.category}
                </Box>
              </Box>
              
              <Flex direction="column" p={6} flex="1">
                <NextLink href={`/noticias/${news.id}`} passHref>
                  <LinkOverlay>
                    <Heading as="h3" size="md" mb={3} color={headingColor}>
                      {news.title}
                    </Heading>
                  </LinkOverlay>
                </NextLink>
                
                <Text color={textColor} mb={4} flex="1">
                  {news.excerpt}
                </Text>
                
                <Flex align="center" fontSize="sm" color={textColor} mt="auto">
                  <Icon as={FaClock} boxSize={3} mr={2} />
                  <Text>
                    {new Date(news.date).toLocaleDateString('pt-BR')}
                  </Text>
                </Flex>
              </Flex>
            </LinkBox>
          ))}
        </SimpleGrid>
        
        <Flex justify="center" mt={10}>
          <NextLink href="/noticias" passHref>
            <Button 
              as="a"
              rightIcon={<Icon as={FaArrowRight} />}
              variant={isDark ? "cyberpunk" : "outline"}
              colorScheme="primary"
              size="lg"
            >
              Ver Todas as Notícias
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  )
}