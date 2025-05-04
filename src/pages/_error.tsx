import { Box, Container, Heading, Text, Button, VStack, Code, useColorModeValue } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { ChakraNextLink } from '../components/ChakraNextLink';
import { useEffect } from 'react';

function Error({ statusCode, err }) {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Força recarregar a página uma vez se houver erro de hidratação
  useEffect(() => {
    // Verifica se o erro está relacionado à hidratação
    if (typeof window !== 'undefined' && err && err.message && err.message.includes('Hydration')) {
      // Armazena um flag para evitar loop infinito
      const hasReloaded = sessionStorage.getItem('hasReloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      }
    }
  }, [err]);

  return (
    <Layout title={`Erro ${statusCode || ''} | democratize.me`}>
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={20}>
        <Container maxW="container.md">
          <Box
            bg={cardBg}
            p={8}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <VStack spacing={6} textAlign="center">
              <Heading as="h1" size="2xl">
                {statusCode
                  ? `Erro ${statusCode}`
                  : 'Ocorreu um erro'}
              </Heading>
              <Text fontSize="xl">
                {statusCode
                  ? 'Ocorreu um erro no servidor'
                  : 'Ocorreu um erro no cliente'}
              </Text>
              
              {err && process.env.NODE_ENV === 'development' && (
                <Box w="100%" p={4} bg="gray.100" borderRadius="md" textAlign="left">
                  <Text fontWeight="bold" mb={2}>Detalhes do erro (apenas em desenvolvimento):</Text>
                  <Code w="100%" p={3} overflowX="auto">
                    {err.message || 'Erro desconhecido'}
                  </Code>
                </Box>
              )}
              
              <Button
                as="a"
                href="/"
                colorScheme="primary"
                size="lg"
                mt={4}
              >
                Voltar para a página inicial
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;