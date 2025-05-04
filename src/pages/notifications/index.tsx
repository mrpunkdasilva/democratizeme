import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Icon,
  Badge,
  Button,
  useColorModeValue,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Divider,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FaBell, FaCheck, FaTrash, FaExternalLinkAlt, FaFilter, FaSearch, FaEllipsisV, FaCheckDouble } from 'react-icons/fa';
import { Layout } from '../../components/Layout';
import { useNotifications } from '../../contexts/NotificationContext';
import { ChakraNextLink } from '../../components/ChakraNextLink';
import { NoSSR } from '../../components/NoSSR';

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();
  
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const isDark = useColorModeValue(false, true);
  
  // Função para formatar a data
  const formatDate = (date: Date) => {
    // Verificar se é hoje
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return `Hoje às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Verificar se é ontem
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() && 
                        date.getMonth() === yesterday.getMonth() && 
                        date.getFullYear() === yesterday.getFullYear();
    
    if (isYesterday) {
      return `Ontem às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Formato de data completo
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Função para obter a cor do tipo de notificação
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'blue';
      case 'warning': return 'orange';
      case 'success': return 'green';
      case 'error': return 'red';
      default: return 'gray';
    }
  };
  
  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    // Filtrar por tipo
    if (filterType !== 'all' && notification.type !== filterType) {
      return false;
    }
    
    // Filtrar por termo de busca
    if (searchTerm && 
        !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtrar por tab (lidas/não lidas)
    if (activeTab === 1 && notification.read) {
      return false;
    }
    if (activeTab === 2 && !notification.read) {
      return false;
    }
    
    return true;
  });
  
  return (
    <Layout title="Notificações | Democratize.me" description="Suas notificações">
      <NoSSR>
        <Box bg={bgColor} minH="calc(100vh - 64px)" py={8}>
          <Container maxW="container.xl">
            <Flex 
              direction="column" 
              mb={8}
            >
              <Flex justify="space-between" align="center" mb={6}>
                <HStack>
                  <Icon as={FaBell} color={accentColor} boxSize={6} />
                  <Heading 
                    as="h1" 
                    size="xl"
                    bgGradient={isDark ? "linear(to-r, blue.400, blue.300)" : "linear(to-r, blue.500, blue.600)"}
                    bgClip={isDark ? "text" : undefined}
                    color={isDark ? undefined : textColor}
                  >
                    Notificações
                  </Heading>
                  {unreadCount > 0 && (
                    <Badge colorScheme="red" fontSize="md" borderRadius="full" px={2}>
                      {unreadCount} {unreadCount === 1 ? 'nova' : 'novas'}
                    </Badge>
                  )}
                </HStack>
                
                <HStack spacing={2}>
                  <Tooltip label="Marcar todas como lidas">
                    <IconButton
                      aria-label="Marcar todas como lidas"
                      icon={<FaCheckDouble />}
                      colorScheme="blue"
                      variant="outline"
                      isDisabled={unreadCount === 0}
                      onClick={markAllAsRead}
                    />
                  </Tooltip>
                  
                  <Tooltip label="Limpar todas">
                    <IconButton
                      aria-label="Limpar todas"
                      icon={<FaTrash />}
                      colorScheme="red"
                      variant="outline"
                      isDisabled={notifications.length === 0}
                      onClick={clearNotifications}
                    />
                  </Tooltip>
                </HStack>
              </Flex>
              
              <Flex 
                direction={{ base: "column", md: "row" }} 
                gap={4} 
                mb={6}
              >
                <InputGroup flex="1">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaSearch} color={mutedColor} />
                  </InputLeftElement>
                  <Input 
                    placeholder="Buscar notificações..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    bg={cardBg}
                    borderColor={borderColor}
                  />
                </InputGroup>
                
                <Select 
                  placeholder="Filtrar por tipo" 
                  icon={<FaFilter />}
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  bg={cardBg}
                  borderColor={borderColor}
                  w={{ base: "full", md: "200px" }}
                >
                  <option value="all">Todos os tipos</option>
                  <option value="info">Informações</option>
                  <option value="warning">Alertas</option>
                  <option value="success">Sucessos</option>
                  <option value="error">Erros</option>
                </Select>
              </Flex>
            </Flex>
            
            <Box 
              bg={cardBg} 
              borderRadius="lg" 
              boxShadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
            >
              <Tabs 
                colorScheme="blue" 
                onChange={(index) => setActiveTab(index)}
                variant="enclosed"
              >
                <TabList>
                  <Tab>Todas ({notifications.length})</Tab>
                  <Tab>Não lidas ({unreadCount})</Tab>
                  <Tab>Lidas ({notifications.length - unreadCount})</Tab>
                </TabList>
                
                <TabPanels>
                  {[0, 1, 2].map((tabIndex) => (
                    <TabPanel key={tabIndex} p={0}>
                      {filteredNotifications.length === 0 ? (
                        <Box p={8} textAlign="center">
                          <Icon as={FaBell} fontSize="4xl" color={mutedColor} mb={4} />
                          <Text color={mutedColor} fontSize="lg">
                            {searchTerm || filterType !== 'all' 
                              ? 'Nenhuma notificação corresponde aos filtros aplicados.' 
                              : tabIndex === 0 
                                ? 'Você não tem notificações.' 
                                : tabIndex === 1 
                                  ? 'Você não tem notificações não lidas.' 
                                  : 'Você não tem notificações lidas.'}
                          </Text>
                          {(searchTerm || filterType !== 'all') && (
                            <Button 
                              mt={4} 
                              onClick={() => {
                                setSearchTerm('');
                                setFilterType('all');
                              }}
                            >
                              Limpar filtros
                            </Button>
                          )}
                        </Box>
                      ) : (
                        <VStack spacing={0} align="stretch" divider={<Divider />}>
                          {filteredNotifications.map((notification) => (
                            <Box
                              key={notification.id}
                              p={4}
                              bg={notification.read ? 'transparent' : useColorModeValue('gray.50', 'gray.700')}
                              _hover={{ bg: hoverBg }}
                              transition="background-color 0.2s"
                              position="relative"
                              onClick={() => markAsRead(notification.id)}
                              cursor="pointer"
                            >
                              {!notification.read && (
                                <Box
                                  position="absolute"
                                  left={0}
                                  top="50%"
                                  transform="translateY(-50%)"
                                  width="4px"
                                  height="70%"
                                  bg={`${getNotificationColor(notification.type)}.500`}
                                  borderRightRadius="sm"
                                />
                              )}
                              
                              <Flex justify="space-between" mb={1}>
                                <HStack>
                                  <Badge colorScheme={getNotificationColor(notification.type)} px={2} py={0.5}>
                                    {notification.type === 'info' && 'Informação'}
                                    {notification.type === 'warning' && 'Alerta'}
                                    {notification.type === 'success' && 'Sucesso'}
                                    {notification.type === 'error' && 'Erro'}
                                  </Badge>
                                  <Text fontWeight="bold" fontSize="md" color={textColor}>
                                    {notification.title}
                                  </Text>
                                </HStack>
                                <Text fontSize="sm" color={mutedColor}>
                                  {formatDate(notification.createdAt)}
                                </Text>
                              </Flex>
                              
                              <Text fontSize="md" color={mutedColor} mb={2} pl={notification.read ? 0 : 2}>
                                {notification.message}
                              </Text>
                              
                              <Flex justify="space-between" align="center" mt={2}>
                                {notification.link ? (
                                  <ChakraNextLink href={notification.link}>
                                    <Button
                                      as="a"
                                      size="sm"
                                      variant="ghost"
                                      colorScheme={getNotificationColor(notification.type)}
                                      rightIcon={<FaExternalLinkAlt />}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                    >
                                      Ver detalhes
                                    </Button>
                                  </ChakraNextLink>
                                ) : (
                                  <Box />
                                )}
                                
                                <HStack>
                                  {!notification.read && (
                                    <Tooltip label="Marcar como lida">
                                      <IconButton
                                        aria-label="Marcar como lida"
                                        icon={<FaCheck />}
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markAsRead(notification.id);
                                        }}
                                      />
                                    </Tooltip>
                                  )}
                                </HStack>
                              </Flex>
                            </Box>
                          ))}
                        </VStack>
                      )}
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Box>
            
            {notifications.length > 0 && (
              <Box mt={6} textAlign="center">
                <Text color={mutedColor} fontSize="sm">
                  As notificações são armazenadas localmente no seu navegador.
                </Text>
              </Box>
            )}
          </Container>
        </Box>
      </NoSSR>
    </Layout>
  );
}