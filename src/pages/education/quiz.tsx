import React from 'react';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';
import { DemocracyQuiz } from '../../components/education/DemocracyQuiz';
import { NoSSR } from '../../components/NoSSR';

export default function QuizPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Layout 
      title="Quiz Democrático | democratize.me" 
      description="Teste seus conhecimentos sobre democracia, política e cidadania"
    >
      <Box bg={bgColor} minH="calc(100vh - 80px)" py={8}>
        <Container maxW="container.xl">
          <NoSSR>
            <DemocracyQuiz />
          </NoSSR>
        </Container>
      </Box>
    </Layout>
  );
}