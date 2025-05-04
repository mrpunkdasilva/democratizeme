import React from 'react';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';
import { LegislativeGuides } from '../../components/education/LegislativeGuides';
import { NoSSR } from '../../components/NoSSR';

export default function GuidesPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Layout 
      title="Guias Legislativos | democratize.me" 
      description="Aprenda sobre o processo legislativo e como as leis são criadas no Brasil"
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          <NoSSR>
            <LegislativeGuides searchTerm="" />
          </NoSSR>
        </Container>
      </Box>
    </Layout>
  );
}