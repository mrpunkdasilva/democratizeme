import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  Text,
  Flex,
  Icon,
  Badge,
  Button,
  Divider,
  useColorModeValue,
  IconButton,
  Tooltip,
  Heading,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  Portal
} from '@chakra-ui/react';
import { FaBell, FaCheck, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import { useNotifications } from '../../contexts/NotificationContext';
import { ChakraNextLink } from '../ChakraNextLink';

export function NotificationCenter() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  
  // Função para formatar a data
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Menos de 1 minuto
    if (diff < 60 * 1000) {
      return 'Agora mesmo';
    }
    
    // Menos de 1 hora
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
    }
    
    // Menos de 1 dia
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    }
    
    // Menos de 7 dias
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
    }
    
    // Formato de data completo
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Notificações"
            icon={<Icon as={FaBell} />}
            variant="ghost"
            color={useColorModeValue('gray.600', 'gray.400')}
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700')
            }}
          />
          
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
      </PopoverTrigger>
      
      <Portal>
        <PopoverContent
          width="100%"
          maxW="400px"
          bg={bgColor}
          borderRadius="md"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="lg"
          _focus={{ outline: 'none' }}
        >
          <PopoverArrow bg={bgColor} />
          <PopoverCloseButton />
          
          <PopoverHeader 
            borderBottomWidth="1px"
            borderColor={borderColor}
            p={4}
          >
            <Flex justify="space-between" align="center">
              <HStack>
                <Icon as={FaBell} color={mutedColor} />
                <Heading size="sm">Notificações</Heading>
                {unreadCount > 0 && (
                  <Badge colorScheme="red" borderRadius="full">
                    {unreadCount} {unreadCount === 1 ? 'nova' : 'novas'}
                  </Badge>
                )}
              </HStack>
              
              <HStack>
                <Tooltip label="Marcar todas como lidas">
                  <IconButton
                    aria-label="Marcar todas como lidas"
                    icon={<FaCheck />}
                    size="sm"
                    variant="ghost"
                    isDisabled={unreadCount === 0}
                    onClick={markAllAsRead}
                  />
                </Tooltip>
                
                <Tooltip label="Limpar todas">
                  <IconButton
                    aria-label="Limpar todas"
                    icon={<FaTrash />}
                    size="sm"
                    variant="ghost"
                    isDisabled={notifications.length === 0}
                    onClick={clearNotifications}
                  />
                </Tooltip>
              </HStack>
            </Flex>
          </PopoverHeader>
          
          <PopoverBody p={0} maxH="400px" overflowY="auto">
            {notifications.length === 0 ? (
              <Box p={6} textAlign="center">
                <Text color={mutedColor}>Nenhuma notificação</Text>
              </Box>
            ) : (
              <VStack spacing={0} align="stretch">
                {notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    p={4}
                    borderBottomWidth="1px"
                    borderColor={borderColor}
                    bg={notification.read ? 'transparent' : useColorModeValue('gray.50', 'gray.700')}
                    _hover={{ bg: hoverBg }}
                    transition="background-color 0.2s"
                    position="relative"
                    onClick={() => markAsRead(notification.id)}
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
                      <Text fontWeight="bold" fontSize="sm" color={textColor}>
                        {notification.title}
                      </Text>
                      <Text fontSize="xs" color={mutedColor}>
                        {formatDate(notification.createdAt)}
                      </Text>
                    </Flex>
                    
                    <Text fontSize="sm" color={mutedColor} mb={2}>
                      {notification.message}
                    </Text>
                    
                    {notification.link && (
                      <ChakraNextLink href={notification.link} passHref>
                        <Button
                          as="a"
                          size="xs"
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
                    )}
                  </Box>
                ))}
              </VStack>
            )}
          </PopoverBody>
          
          <PopoverFooter
            borderTopWidth="1px"
            borderColor={borderColor}
            p={3}
          >
            <ChakraNextLink href="/notifications" passHref>
              <Button
                as="a"
                size="sm"
                variant="ghost"
                width="100%"
              >
                Ver todas as notificações
              </Button>
            </ChakraNextLink>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}