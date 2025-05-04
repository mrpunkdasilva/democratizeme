import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  useColorMode,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Link
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  BellIcon
} from '@chakra-ui/icons';
import { Logo } from './Logo';
import { useNotifications } from '../contexts/NotificationContext';
import { ChakraNextLink } from './ChakraNextLink';
import { NoSSR } from './NoSSR';

export function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { unreadCount } = useNotifications();
  
  const isDark = colorMode === 'dark';
  
  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg={useColorModeValue('white', 'gray.900')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      shadow="sm"
      transition="background-color 0.2s"
    >
      <Container maxW="container.xl">
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <NoSSR>
              <ChakraNextLink href="/">
                <Box cursor="pointer">
                  <Logo
                    color={useColorModeValue('gray.700', 'white')}
                    h="32px"
                  />
                </Box>
              </ChakraNextLink>
            </NoSSR>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            align="center"
          >
            <IconButton
              aria-label="Alternar modo escuro"
              icon={isDark ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              color={useColorModeValue('gray.600', 'gray.400')}
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.700')
              }}
            />
            
            <Box position="relative">
              <NoSSR>
                <IconButton
                  aria-label="Notificações"
                  icon={<BellIcon />}
                  variant="ghost"
                  color={useColorModeValue('gray.600', 'gray.400')}
                  _hover={{
                    bg: useColorModeValue('gray.100', 'gray.700')
                  }}
                  onClick={() => {
                    // Navegar para a página de notificações
                    window.location.href = '/notifications';
                  }}
                />
              </NoSSR>
              
              {unreadCount > 0 && (
                <Badge
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  colorScheme="red"
                  borderRadius="full"
                  fontSize="xs"
                  zIndex={1}
                >
                  {unreadCount}
                </Badge>
              )}
            </Box>
            
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={'https://randomuser.me/api/portraits/lego/1.jpg'}
                />
              </MenuButton>
              <MenuList>
                <NoSSR>
                  <MenuItem onClick={() => window.location.href = '/profile'}>
                    Meu Perfil
                  </MenuItem>
                  <MenuItem onClick={() => window.location.href = '/settings'}>
                    Configurações
                  </MenuItem>
                </NoSSR>
                <MenuDivider />
                <MenuItem>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box>
                <NoSSR>
                  {navItem.href ? (
                    <Link
                      p={2}
                      fontSize={'sm'}
                      fontWeight={500}
                      color={linkColor}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}
                      onClick={() => window.location.href = navItem.href}
                    >
                      {navItem.label}
                    </Link>
                  ) : (
                    <Link
                      p={2}
                      fontSize={'sm'}
                      fontWeight={500}
                      color={linkColor}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}
                    >
                      {navItem.label}
                    </Link>
                  )}
                </NoSSR>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NoSSR>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
        onClick={() => href && (window.location.href = href)}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NoSSR>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <NoSSR>
          {href ? (
            <Link
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}
              onClick={() => window.location.href = href}
            >
              {label}
            </Link>
          ) : (
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}
            >
              {label}
            </Text>
          )}
        </NoSSR>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <NoSSR key={child.label}>
                <Link
                  py={2}
                  onClick={() => child.href && (window.location.href = child.href)}
                >
                  {child.label}
                </Link>
              </NoSSR>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Políticos',
    children: [
      {
        label: 'Deputados Federais',
        subLabel: 'Acompanhe a atuação dos deputados',
        href: '/politicians/deputies',
      },
      {
        label: 'Senadores',
        subLabel: 'Acompanhe a atuação dos senadores',
        href: '/politicians/senators',
      },
      {
        label: 'Ranking de Transparência',
        subLabel: 'Veja quem são os políticos mais transparentes',
        href: '/politicians/ranking',
      },
    ],
  },
  {
    label: 'Monitor Legislativo',
    children: [
      {
        label: 'Projetos de Lei',
        subLabel: 'Acompanhe os projetos em tramitação',
        href: '/monitor/bills',
      },
      {
        label: 'Votações Recentes',
        subLabel: 'Veja como os parlamentares votaram',
        href: '/monitor/votings',
      },
      {
        label: 'Calendário Legislativo',
        subLabel: 'Agenda de votações e eventos',
        href: '/monitor/calendar',
      },
    ],
  },
  {
    label: 'Fórum',
    href: '/forum',
  },
  {
    label: 'Educação Cidadã',
    children: [
      {
        label: 'Glossário Político',
        subLabel: 'Entenda os termos da política',
        href: '/education/glossary',
      },
      {
        label: 'Guias Legislativos',
        subLabel: 'Como funciona o processo legislativo',
        href: '/education/guides',
      },
      {
        label: 'Quiz da Democracia',
        subLabel: 'Teste seus conhecimentos',
        href: '/education/quiz',
      },
    ],
  },
];