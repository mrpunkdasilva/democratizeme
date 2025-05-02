import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'

function Error({ statusCode }) {
  return (
    <Layout>
      <Container maxW="container.md" py={20}>
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
          <NextLink href="/" passHref legacyBehavior>
            <Button as="a" colorScheme="primary" size="lg">
              Voltar para a página inicial
            </Button>
          </NextLink>
        </VStack>
      </Container>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error