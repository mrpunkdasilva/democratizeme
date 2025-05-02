import { Box, Container, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

export function Footer() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box as="footer" bg={bgColor} py={6}>
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Text color={textColor} fontSize="sm">
            © 2023 democratize.me. Todos os direitos reservados.
          </Text>
          <Flex gap={6} mt={{ base: 4, md: 0 }}>
            <NextLink href="/sobre" passHref>
              <Link color={textColor} fontSize="sm">
                Sobre
              </Link>
            </NextLink>
            <NextLink href="/privacidade" passHref>
              <Link color={textColor} fontSize="sm">
                Privacidade
              </Link>
            </NextLink>
            <NextLink href="/termos" passHref>
              <Link color={textColor} fontSize="sm">
                Termos de Uso
              </Link>
            </NextLink>
            <NextLink href="/contato" passHref>
              <Link color={textColor} fontSize="sm">
                Contato
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}