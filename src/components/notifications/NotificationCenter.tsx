import React, { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Divider,
  useColorModeValue,
  IconButton,
  Flex,
  Tooltip
} from '@chakra-ui/react';
import { FaBell, FaCheck, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import { useNotifications, Notification } from '../../contexts/NotificationContext';
import { useRouter } from 'next/router';

export const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  
  const handleOpen = () => {
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.link) {
      router.push(notification.link);
      handleClose();
    }
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    const colors = {
      info: 'blue.500',
      warning: 'orange.500',
      success: 'green.500',
      error: 'red.500'
    };
    
    return (
      <Box 
        w="10px" 
        h="10px" 
        borderRadius="full" 
        bg={colors[type]} 
        mr={2}
      />
    );
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Menos de 1 minuto
    if (diff < 60 * 1000) {
      return 'Agora';
    }
    
    // Menos de 1 hora
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} min atrás`;
    }
    
    // Menos de 1 dia
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours}h atrás`;
    }
    
    // Menos de 7 dias
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days}d atrás`;
    }
    
    // Formato de data normal
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <Popover
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      placement="bottom-end"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Box position="relative" display="inline-block">
          <IconButton
            aria-label="Notificações"
            icon={<Icon as={FaBell} />}
            variant="ghost"
            size="md"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-2px"
              right="-2px"
              colorScheme="red"
              borderRadius="full"
              fontSize="xs"
              minW="18px"
              h="18px"
              textAlign="center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      
      <PopoverContent
        width="350px"
        maxH="500px"
        shadow="lg"
        _focus={{ outline: 'none' }}
        borderColor={borderColor}
      >
        <PopoverArrow />
        <PopoverCloseButton />
        
        <PopoverHeader borderBottomWidth="1px" fontWeight="bold" py={3}>
          <Flex justify="space-between" align="center">
            <Text>Notificações</Text>
            {unreadCount > 0 && (
              <Badge colorScheme="red" borderRadius="full">
                {unreadCount} não lidas
              </Badge>
            )}
          </Flex>
        </PopoverHeader>
        
        <PopoverBody p={0} overflowY="auto" maxH="350px">
          {notifications.length === 0 ? (
            <Box p={6} textAlign="center" color={mutedColor}>
              <Text>Nenhuma notificação</Text>
            </Box>
          ) : (
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {notifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={3}
                  bg={notification.read ? 'transparent' : useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.1)')}
                  _hover={{ bg: hoverBg }}
                  cursor={notification.link ? 'pointer' : 'default'}
                  onClick={() => handleNotificationClick(notification)}
                  transition="background 0.2s"
                >
                  <HStack spacing={2} mb={1} align="flex-start">
                    {getNotificationIcon(notification.type)}
                    <Box flex="1">
                      <Text fontWeight={notification.read ? 'normal' : 'bold'} fontSize="sm">
                        {notification.title}
                      </Text>
                      <Text fontSize="xs" color={mutedColor} mb={1}>
                        {formatDate(notification.createdAt)}
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {notification.message}
                      </Text>
                    </Box>
                    {notification.link && (
                      <Tooltip label="Abrir link" placement="top">
                        <Icon as={FaExternalLinkAlt} boxSize={3} color={mutedColor} />
                      </Tooltip>
                    )}
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </PopoverBody>
        
        <PopoverFooter borderTopWidth="1px" p={2}>
          <HStack spacing={2} justify="space-between">
            <Button
              size="sm"
              leftIcon={<Icon as={FaCheck} />}
              variant="ghost"
              onClick={markAllAsRead}
              isDisabled={unreadCount === 0}
            >
              Marcar todas como lidas
            </Button>
            <Button
              size="sm"
              leftIcon={<Icon as={FaTrash} />}
              variant="ghost"
              colorScheme="red"
              onClick={clearNotifications}
              isDisabled={notifications.length === 0}
            >
              Limpar
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};