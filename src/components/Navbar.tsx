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
  Text,
  Link,
  useColorModeValue
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

// Componente NavLink melhorado
const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const isDark = useColorModeValue(false, true);
  
  // Cores melhoradas para os links
  const linkColor = useColorModeValue('gray.700', 'gray.200');
  const activeColor = useColorModeValue('primary.600', 'cyberpunk.accent');
  const hoverBg = useColorModeValue('gray.100', 'rgba(0, 255, 255, 0.1)');
  const activeBg = useColorModeValue('gray.100', 'rgba(0, 255, 255, 0.15)');
  
  return (
    <NextLink href={href} passHref>
      <Link
        px={3}
        py={2}
        rounded={'md'}
        fontWeight={isActive ? "semibold" : "medium"}
        color={isActive ? activeColor : linkColor}
        bg={isActive ? activeBg : 'transparent'}
        position="relative"
        transition="all 0.2s ease"
        _hover={{
          textDecoration: 'none',
          bg: hoverBg,
          color: activeColor,
        }}
        _after={
          isActive && isDark
            ? {
                content: '""',
                position: 'absolute',
                bottom: '0',
                left: '20%',
                right: '20%',
                height: '2px',
                bg: 'cyberpunk.accent',
                borderRadius: 'full',
              }
            : {}
        }
      >
        {children}
      </Link>
    </NextLink>
  );
};

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  
  // Cores melhoradas para a navbar
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'rgba(0, 255, 255, 0.1)');
  const logoColor = useColorModeValue('gray.800', 'white');
  const buttonHoverBg = useColorModeValue('gray.100', 'rgba(0, 255, 255, 0.1)');
  
  // Animação para o efeito de brilho
  const glowAnimation = `${glowPulse} 2s infinite ease-in-out`;
  
  return (
    <Box 
      as="nav" 
      bg={bgColor}
      px={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <NextLink href="/" passHref>
          <Box 
            display="flex" 
            alignItems="center"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
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
              color={colorMode === 'dark' ? "transparent" : logoColor}
              textTransform="uppercase"
            >
              democratize.me
              <VisuallyHidden>Página inicial</VisuallyHidden>
            </Text>
          </Box>
        </NextLink>

        {/* Desktop Navigation */}
        <HStack 
          spacing={1} 
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
            color={colorMode === 'dark' ? 'cyberpunk.accent' : 'gray.600'}
            _hover={{
              bg: buttonHoverBg
            }}
            _focus={{
              boxShadow: 'none',
              outline: 'none'
            }}
            size="sm"
            minW="auto"
            p={2}
            ml={2}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
        
        {/* Mobile Navigation Button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          aria-label="Abrir menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          color={colorMode === 'dark' ? 'cyberpunk.accent' : 'gray.600'}
          _hover={{
            bg: buttonHoverBg
          }}
        />
      </Flex>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <Box 
          pb={4} 
          display={{ md: 'none' }}
          borderTop="1px"
          borderColor={borderColor}
        >
          <VStack as="nav" spacing={2} align="stretch" pt={2}>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/monitor">Monitor</NavLink>
            <NavLink href="/forum">Fórum</NavLink>
            <NavLink href="/ranking">Ranking</NavLink>
          </VStack>
        </Box>
      )}
    </Box>
  );
}