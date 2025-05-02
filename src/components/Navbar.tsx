import { 
  Box, 
  Flex, 
  Button, 
  useColorMode,
  VisuallyHidden,
  useDisclosure,
  IconButton,
  VStack,
  HStack,
  Image,
  Text
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// Keyframes para o efeito de brilho cyberpunk
const glowPulse = keyframes`
  0% { filter: drop-shadow(0 0 1px #00FFFF); }
  50% { filter: drop-shadow(0 0 3px #00FFFF); }
  100% { filter: drop-shadow(0 0 1px #00FFFF); }
`;

// Keyframes para o efeito de scan line
const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const router = useRouter()
  
  // Aplicando as animações
  const glowAnimation = `${glowPulse} 4s infinite`;
  const scanAnimation = `${scanLine} 3s linear infinite`;

  const NavLink = ({ href, children }) => {
    const isActive = router.pathname === href
    
    return (
      <NextLink href={href} passHref legacyBehavior>
        <Button
          as="a"
          variant="ghost"
          position="relative"
          aria-current={isActive ? "page" : undefined}
          color={colorMode === 'light' ? 'gray.800' : '#E0F7FA'}
          fontFamily="mono"
          letterSpacing="wider"
          fontSize="sm"
          textTransform="uppercase"
          fontWeight="medium"
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '1',
            left: '2',
            right: '2',
            height: '1px',
            bg: colorMode === 'light' ? 'primary.500' : '#00FFFF',
            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.2s ease-in-out'
          }}
          _hover={{
            _after: {
              transform: 'scaleX(1)'
            },
            bg: colorMode === 'light' ? 'gray.100' : 'rgba(0, 255, 255, 0.05)'
          }}
          _focus={{
            boxShadow: 'none',
            outline: 'none'
          }}
        >
          {children}
        </Button>
      </NextLink>
    )
  }

  return (
    <Box 
      as="nav" 
      bg={colorMode === 'light' ? 'white' : '#0A1929'} 
      boxShadow={colorMode === 'light' ? 'sm' : '0 0 15px rgba(0, 255, 255, 0.1)'}
      borderBottom={colorMode === 'light' ? '1px solid' : '1px solid'}
      borderColor={colorMode === 'light' ? 'gray.200' : 'rgba(0, 255, 255, 0.1)'}
      position="sticky"
      top="0"
      zIndex="sticky"
      role="navigation"
      aria-label="Navegação principal"
      backdropFilter="blur(10px)"
    >
      {/* Efeito de scan line apenas no modo escuro */}
      {colorMode === 'dark' && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="100%"
          pointerEvents="none"
          overflow="hidden"
          zIndex="1"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            height="10px"
            bg="linear-gradient(to bottom, rgba(0, 255, 255, 0.1), transparent)"
            animation={scanAnimation}
          />
        </Box>
      )}
      
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        py={3}
        justify="space-between"
        align="center"
        position="relative"
        zIndex="2"
      >
        <NextLink href="/" passHref legacyBehavior>
          <Box 
            as="a"
            display="flex"
            alignItems="center"
            cursor="pointer"
            _focus={{
              outline: 'none',
              boxShadow: 'none'
            }}
          >
            <Image 
              src="/logo.svg" 
              alt="Democratize Logo" 
              height="36px" 
              width="36px" 
              mr={3}
              animation={colorMode === 'dark' ? glowAnimation : undefined}
            />
            <Text
              fontSize="lg" 
              fontWeight="bold"
              fontFamily="mono"
              letterSpacing="wider"
              bgGradient={colorMode === 'dark' ? "linear(to-r, #2196F3, #00FFFF)" : undefined}
              bgClip={colorMode === 'dark' ? "text" : undefined}
              color={colorMode === 'dark' ? "transparent" : undefined}
              textTransform="uppercase"
            >
              democratize.me
              <VisuallyHidden>Página inicial</VisuallyHidden>
            </Text>
          </Box>
        </NextLink>

        {/* Mobile menu button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          variant="ghost"
          color={colorMode === 'dark' ? '#00FFFF' : undefined}
          _hover={{
            bg: colorMode === 'dark' ? 'rgba(0, 255, 255, 0.05)' : undefined
          }}
        />

        {/* Desktop Navigation */}
        <HStack 
          spacing={4} 
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/monitor">Monitor</NavLink>
          <NavLink href="/forum">Fórum</NavLink>
          <NavLink href="/ranking">Ranking</NavLink>
          
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            variant="ghost"
            color={colorMode === 'dark' ? '#00FFFF' : undefined}
            _hover={{
              bg: colorMode === 'light' ? 'gray.100' : 'rgba(0, 255, 255, 0.05)'
            }}
            _focus={{
              boxShadow: 'none',
              outline: 'none'
            }}
            size="sm"
            minW="auto"
            p={2}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>

        {/* Mobile Navigation */}
        <VStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
          bg={colorMode === 'light' ? 'white' : 'rgba(10, 25, 41, 0.95)'}
          p={4}
          spacing={4}
          boxShadow={colorMode === 'light' ? 'sm' : '0 5px 15px rgba(0, 255, 255, 0.1)'}
          borderBottom={colorMode === 'light' ? '1px solid' : '1px solid'}
          borderColor={colorMode === 'light' ? 'gray.200' : 'rgba(0, 255, 255, 0.1)'}
          backdropFilter="blur(10px)"
        >
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/monitor">Monitor</NavLink>
          <NavLink href="/forum">Fórum</NavLink>
          <NavLink href="/ranking">Ranking</NavLink>
          
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            variant="ghost"
            width="full"
            color={colorMode === 'dark' ? '#E0F7FA' : undefined}
            fontFamily="mono"
            letterSpacing="wider"
            fontSize="sm"
            textTransform="uppercase"
            _hover={{
              bg: colorMode === 'light' ? 'gray.100' : 'rgba(0, 255, 255, 0.05)'
            }}
          >
            {colorMode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          </Button>
        </VStack>
      </Flex>
    </Box>
  )
}