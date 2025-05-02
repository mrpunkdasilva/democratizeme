import Image from 'next/image';
import { Box, Heading } from '@chakra-ui/react';

export function PoliticiansDistribution() {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Distribuição de Políticos por Região
      </Heading>
      <Box 
        position="relative" 
        width="100%" 
        height="auto"
        maxW="800px"
        mx="auto"
      >
        <Image
          src="/images/politicians-map.svg"
          alt="Mapa de distribuição de políticos por região do Brasil"
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
    </Box>
  );
}