import { Box, Container, Heading, Text } from '@chakra-ui/react';

export function StatsSection() {
  return (
    <Box py={12}>
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" mb={8} textAlign="center">
          Estatísticas Nacionais
        </Heading>
        
        <Box 
          backgroundImage="url('/images/politicians-map.svg')"
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          height="600px"
          width="100%"
          position="relative"
        >
          {/* Conteúdo adicional pode ser posicionado sobre o mapa */}
        </Box>
      </Container>
    </Box>
  );
}