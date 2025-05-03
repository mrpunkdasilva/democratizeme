import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Progress,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  Divider,
  SimpleGrid,
  Circle
} from '@chakra-ui/react';
import { FaGraduationCap, FaBook, FaCheck, FaLock, FaPlay, FaQuestion, FaClipboardCheck } from 'react-icons/fa';
import NextLink from 'next/link';

// Função para obter ícone do tipo de lição
const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video': return FaPlay;
    case 'article': return FaBook;
    case 'quiz': return FaQuestion; // Substituído FaQuiz por FaQuestion
    default: return FaBook;
  }
};

// Módulos da trilha de aprendizado
const learningModules = [
  {
    id: 1,
    title: "Fundamentos da Democracia",
    description: "Entenda os princípios básicos que sustentam um sistema democrático",
    duration: "20 min",
    level: "Iniciante",
    completed: true,
    lessons: [
      { id: 101, title: "O que é Democracia?", type: "video", completed: true },
      { id: 102, title: "História da Democracia", type: "article", completed: true },
      { id: 103, title: "Princípios Democráticos", type: "quiz", completed: true }
    ]
  },
  {
    id: 2,
    title: "Sistema Político Brasileiro",
    description: "Conheça a estrutura e funcionamento do sistema político no Brasil",
    duration: "30 min",
    level: "Intermediário",
    completed: false,
    lessons: [
      { id: 201, title: "Os Três Poderes", type: "video", completed: true },
      { id: 202, title: "Sistema Eleitoral", type: "article", completed: true },
      { id: 203, title: "Partidos Políticos", type: "quiz", completed: false }
    ]
  },
  {
    id: 3,
    title: "Processo Legislativo",
    description: "Aprenda como as leis são criadas, discutidas e aprovadas",
    duration: "25 min",
    level: "Intermediário",
    completed: false,
    lessons: [
      { id: 301, title: "Tipos de Projetos de Lei", type: "video", completed: false },
      { id: 302, title: "Tramitação Legislativa", type: "article", completed: false },
      { id: 303, title: "Comissões Parlamentares", type: "quiz", completed: false }
    ]
  },
  {
    id: 4,
    title: "Participação Cidadã",
    description: "Descubra como participar ativamente das decisões políticas",
    duration: "15 min",
    level: "Avançado",
    completed: false,
    locked: true,
    lessons: [
      { id: 401, title: "Mecanismos de Participação", type: "video", completed: false },
      { id: 402, title: "Audiências Públicas", type: "article", completed: false },
      { id: 403, title: "Iniciativa Popular", type: "quiz", completed: false }
    ]
  }
];

export function LearningPath() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const completedBg = useColorModeValue('green.50', 'rgba(72, 187, 120, 0.1)');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  // Calcular progresso geral
  const totalLessons = learningModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = learningModules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0);
  const overallProgress = (completedLessons / totalLessons) * 100;
  
  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      boxShadow="sm"
    >
      <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
        <Flex justify="space-between" align="center">
          <HStack>
            <Icon as={FaGraduationCap} color={accentColor} boxSize={6} />
            <Heading as="h3" size="md" color={textColor}>
              Trilha de Aprendizado Democrático
            </Heading>
          </HStack>
          
          <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>
            {Math.round(overallProgress)}% concluído
          </Badge>
        </Flex>
      </Box>
      
      <Box p={6}>
        <Progress
          value={overallProgress}
          size="sm"
          colorScheme="blue"
          borderRadius="full"
          mb={6}
        />
        
        <VStack spacing={4} align="stretch">
          {learningModules.map((module) => {
            // Calcular progresso do módulo
            const moduleProgress = module.lessons.filter(l => l.completed).length / module.lessons.length * 100;
            
            return (
              <Box key={module.id}>
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={borderColor}
                  bg={module.completed ? completedBg : 'transparent'}
                  opacity={module.locked ? 0.7 : 1}
                  cursor={module.locked ? "not-allowed" : "pointer"}
                  onClick={() => !module.locked && setExpandedModule(expandedModule === module.id ? null : module.id)}
                  _hover={!module.locked ? { bg: hoverBg } : {}}
                  position="relative"
                >
                  {module.locked && (
                    <Icon 
                      as={FaLock} 
                      position="absolute" 
                      top={4} 
                      right={4} 
                      color={mutedColor}
                    />
                  )}
                  
                  <Flex justify="space-between" align="center" mb={2}>
                    <HStack>
                      <Circle 
                        size="24px" 
                        bg={module.completed ? "green.500" : accentColor}
                        color="white"
                      >
                        <Text fontSize="xs" fontWeight="bold">{module.id}</Text>
                      </Circle>
                      <Heading size="sm" color={textColor}>
                        {module.title}
                      </Heading>
                    </HStack>
                    
                    <HStack>
                      <Badge colorScheme={
                        module.level === "Iniciante" ? "green" : 
                        module.level === "Intermediário" ? "blue" : "purple"
                      }>
                        {module.level}
                      </Badge>
                      <Badge variant="outline">{module.duration}</Badge>
                    </HStack>
                  </Flex>
                  
                  <Text fontSize="sm" color={mutedColor} mb={3}>
                    {module.description}
                  </Text>
                  
                  <Progress
                    value={moduleProgress}
                    size="xs"
                    colorScheme={module.completed ? "green" : "blue"}
                    borderRadius="full"
                  />
                </Box>
                
                {expandedModule === module.id && (
                  <VStack 
                    spacing={2} 
                    align="stretch" 
                    mt={2} 
                    ml={6} 
                    borderLeftWidth="2px"
                    borderColor={accentColor}
                    pl={4}
                  >
                    {module.lessons.map((lesson) => (
                      <NextLink 
                        key={lesson.id} 
                        href={`/education/lesson/${lesson.id}`} 
                        passHref
                      >
                        <Box
                          as="a"
                          p={3}
                          borderRadius="md"
                          bg={lesson.completed ? completedBg : 'transparent'}
                          _hover={{ bg: hoverBg }}
                          borderWidth="1px"
                          borderColor={borderColor}
                        >
                          <Flex justify="space-between" align="center">
                            <HStack>
                              <Icon 
                                as={getLessonIcon(lesson.type)} 
                                color={lesson.completed ? "green.500" : accentColor} 
                                boxSize={4}
                              />
                              <Text fontWeight={lesson.completed ? "normal" : "medium"}>
                                {lesson.title}
                              </Text>
                            </HStack>
                            
                            {lesson.completed && (
                              <Icon as={FaCheck} color="green.500" boxSize={4} />
                            )}
                          </Flex>
                        </Box>
                      </NextLink>
                    ))}
                  </VStack>
                )}
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}
