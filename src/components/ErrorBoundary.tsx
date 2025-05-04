import React, { Component, ErrorInfo, ReactNode } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  useColorModeValue,
  Code
} from '@chakra-ui/react';
import { Layout } from './Layout';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} resetError={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Layout title="Erro | democratize.me">
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
              <Heading as="h1" size="xl">
                Algo deu errado
              </Heading>
              <Text fontSize="lg">
                Ocorreu um erro inesperado na aplicação.
              </Text>
              
              {error && process.env.NODE_ENV === 'development' && (
                <Box w="100%" p={4} bg="gray.100" borderRadius="md" textAlign="left">
                  <Text fontWeight="bold" mb={2}>Detalhes do erro (apenas em desenvolvimento):</Text>
                  <Code w="100%" p={3} overflowX="auto">
                    {error.message || 'Erro desconhecido'}
                  </Code>
                </Box>
              )}
              
              <Button
                colorScheme="primary"
                onClick={resetError}
                size="lg"
                mt={4}
              >
                Tentar novamente
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}