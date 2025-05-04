import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Flex, 
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Layout } from '../../components/Layout';
import { VotingCalendar } from '../../components/monitor/VotingCalendar';
import { NoSSR } from '../../components/NoSSR';

export default function CalendarPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const isDark = useColorModeValue(false, true);

  return (
    <Layout 
      title="Calendário de Votações | Monitor Legislativo" 
      description="Acompanhe o calendário de votações e eventos legislativos"
    >
      <Box bg={bgColor} minH="calc(100vh - 64px)" py={8}>
        <Container maxW="container.xl">
          <Flex 
            direction="column" 
            mb={8}
          >
            <Heading 
              as="h1" 
              size="xl" 
              mb={2}
              bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : "linear(to-r, primary.500, primary.700)"}
              bgClip={isDark ? "text" : undefined}
              color={isDark ? undefined : textColor}
            >
              Calendário de Votações
            </Heading>
            <Text color={mutedColor} fontSize="lg" mb={6}>
              Acompanhe as próximas votações e eventos legislativos
            </Text>
          </Flex>
          
          <NoSSR>
            <VotingCalendar />
          </NoSSR>
        </Container>
      </Box>
    </Layout>
  );
}