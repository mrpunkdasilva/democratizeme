import { Box, Container, Text, Flex, Link, useColorModeValue } from '@chakra-ui/react'

export function Footer() {
  const bgColor = useColorModeValue('gray.100', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box as="footer" bg={bgColor} py={6}>
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Text color={textColor} fontSize="sm">
            © 2023 democratize.me. Todos os direitos reservados.
          </Text>
          <Flex gap={6} mt={{ base: 4, md: 0 }}>
            <Link href="/sobre" color={textColor} fontSize="sm">
              Sobre
            </Link>
            <Link href="/privacidade" color={textColor} fontSize="sm">
              Privacidade
            </Link>
            <Link href="/termos" color={textColor} fontSize="sm">
              Termos de Uso
            </Link>
            <Link href="/contato" color={textColor} fontSize="sm">
              Contato
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}