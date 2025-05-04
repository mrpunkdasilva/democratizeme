import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  Badge,
  Button,
  useColorModeValue,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { FaBell, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { Layout } from '../../components/Layout';
import { useNotifications } from '../../contexts/NotificationContext';
import { ChakraNextLink } from '../../components/ChakraNextLink';
import { NoSSR } from '../../components/NoSSR';

export default function NotificationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const { 
    notifications, 
    markAsRead
  } = useNotifications();
  
  const notification = notifications.find(n => n.id === id);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const isDark = useColorModeValue(false, true);
  
  // Marcar como lida quando visualizar
  useEffect(() => {
    if (id && notification && !notification.read) {
      markAsRead(id as string);
    }
  }, [id, notification, markAsRead]);
  
  // Função para formatar a data
  const formatDate = (date: Date) => {
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
  
  return (
    <Layout title={notification ? `${notification.title} | Notificações` : 'Notificação'} description="Detalhes da notificação">
      <NoSSR>
        <Box bg={bgColor} minH="calc(100vh - 64px)" py={8}>
          <Container maxW="container.lg">
            <Breadcrumb 
              separator={<Icon as={FaChevronRight} color={mutedColor} fontSize="xs" />}
              mb={6}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={ChakraNextLink} href="/" color={mutedColor}>
                  Início
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              <BreadcrumbItem>
                <BreadcrumbLink as={ChakraNextLink} href="/notifications" color={mutedColor}>
                  Notificações
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color={textColor}>
                  {notification ? notification.title : 'Carregando...'}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <Button
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              mb={6}
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            
            {!notification ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                Notificação não encontrada ou já foi removida.
              </Alert>
            ) : (
              <Card 
                bg={cardBg} 
                borderRadius="lg" 
                boxShadow="sm"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
              >
                <CardHeader 
                  borderBottomWidth="1px" 
                  borderColor={borderColor}
                  bg={useColorModeValue(`${getNotificationColor(notification.type)}.50`, `${getNotificationColor(notification.type)}.900`)}
                  color={textColor}
                >
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Icon 
                        as={FaBell} 
                        color={`${getNotificationColor(notification.type)}.500`} 
                        boxSize={5} 
                      />
                      <Heading size="md">{notification.title}</Heading>
                    </HStack>
                    <Badge colorScheme={getNotificationColor(notification.type)} fontSize="sm" px={2} py={1}>
                      {notification.type === 'info' && 'Informação'}
                      {notification.type === 'warning' && 'Alerta'}
                      {notification.type === 'success' && 'Sucesso'}
                      {notification.type === 'error' && 'Erro'}
                    </Badge>
                  </Flex>
                </CardHeader>
                
                <CardBody py={6}>
                  <Text color={mutedColor} fontSize="sm" mb={4}>
                    Recebida em {formatDate(notification.createdAt)}
                  </Text>
                  
                  <Text fontSize="lg" color={textColor} mb={6}>
                    {notification.message}
                  </Text>
                  
                  {notification.link && (
                    <Alert 
                      status="info" 
                      variant="subtle" 
                      borderRadius="md"
                    >
                      <AlertIcon