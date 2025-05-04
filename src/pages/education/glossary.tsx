import React from 'react';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';
import { InteractiveGlossary } from '../../components/education/InteractiveGlossary';
import { NoSSR } from '../../components/NoSSR';

export default function GlossaryPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Layout 
      title="Glossário Democrático | democratize.me" 
      description="Consulte os principais termos políticos e jurídicos utilizados no contexto brasileiro"
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          <NoSSR>
            <InteractiveGlossary />
          </NoSSR>
        </Container>
      </Box>
    </Layout>
  );
}