import { Box, Button, Container, Flex, Heading, Text, useColorModeValue, Icon, Stack } from '@chakra-ui/react'
import { FaChartLine, FaSearch } from 'react-icons/fa'
import NextLink from 'next/link'

export function Hero() {
  const bgGradient = useColorModeValue(
    'linear(to-r, primary.50, blue.50)',
    'linear(to-b, cyberpunk.bg, rgba(10, 25, 41, 0.8))'
  )
  const headingColor = useColorModeValue('gray.800', 'cyberpunk.text')
  const accentColor = useColorModeValue('primary.500', 'cyberpunk.accent')
  const isDark = useColorModeValue(false, true)

  return (
    <Box 
      position="relative" 
      bgGradient={bgGradient}
      py={{ base: 16, md: 24 }}
      overflow="hidden"
    >
      {/* Grid background for dark mode */}
      {isDark && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="0"
          opacity="0.05"
          pointerEvents="none"
          backgroundImage="linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)"
          backgroundSize="40px 40px"
        />
      )}
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <Flex 
          direction={{ base: 'column', lg: 'row' }} 
          align="center" 
          justify="space-between"
          gap={8}
        >
          <Box maxW={{ base: 'full', lg: '50%' }}>
            <Heading 
              as="h1" 
              size="3xl" 
              lineHeight="1.2"
              fontWeight="bold"
              mb={6}
              bgGradient={isDark ? "linear(to-r, primary.400, cyberpunk.accent)" : undefined}
              bgClip={isDark ? "text" : undefined}
              color={isDark ? "transparent" : headingColor}
            >
              democratize.me
            </Heading>
            
            <Text 
              fontSize="xl" 
              color={useColorModeValue('gray.600', 'gray.300')}
              mb={8}
            >
              Transparência política ao alcance de todos. Acompanhe, analise e entenda o trabalho dos seus representantes políticos 
              com dados acessíveis e visualizações claras.
            </Text>
            
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4}
            >
              <NextLink href="/dashboard" passHref>
                <Button 
                  as="a"
                  size="lg"
                  colorScheme="primary"
                  variant={isDark ? "cyberpunk" : "solid"}
                  leftIcon={<Icon as={FaChartLine} />}
                  px={8}
                >
                  Ver Dashboard
                </Button>
              </NextLink>
              
              <NextLink href="/buscar" passHref>
                <Button 
                  as="a"
                  size="lg"
                  variant={isDark ? "cyberpunk" : "outline"}
                  colorScheme="primary"
                  leftIcon={<Icon as={FaSearch} />}
                >
                  Buscar Político
                </Button>
              </NextLink>
            </Stack>
          </Box>
          
          <Box 
            maxW={{ base: 'full', lg: '45%' }}
            position="relative"
            height={{ base: '300px', md: '400px' }}
            width="full"
            borderRadius="xl"
            overflow="hidden"
            boxShadow={isDark ? "0 0 30px rgba(0, 255, 255, 0.1)" : "xl"}
            border={isDark ? "1px solid rgba(0, 255, 255, 0.1)" : "none"}
          >
            {/* Placeholder para uma imagem ou visualização de dados */}
            <Box 
              bg={isDark ? "rgba(0, 0, 0, 0.3)" : "gray.100"} 
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color={isDark ? "cyberpunk.accent" : "gray.500"}>
                Visualização de dados interativa
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}