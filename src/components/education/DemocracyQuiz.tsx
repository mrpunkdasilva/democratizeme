import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Progress,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  useToast
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaQuestionCircle, FaTrophy, FaArrowRight } from 'react-icons/fa';
import { NoSSR } from '../NoSSR';

// Perguntas do quiz
const quizQuestions = [
  {
    question: "Qual é a função principal do Poder Legislativo?",
    options: [
      "Executar as leis e administrar o país",
      "Criar e aprovar leis",
      "Julgar conflitos e interpretar as leis",
      "Fiscalizar o Poder Executivo apenas"
    ],
    correctAnswer: 1,
    explanation: "O Poder Legislativo tem como função principal elaborar, discutir e aprovar leis, além de fiscalizar o Poder Executivo."
  },
  {
    question: "O que é uma PEC?",
    options: [
      "Projeto de Emenda Constitucional",
      "Proposta de Emenda à Constituição",
      "Plano Estratégico Constitucional",
      "Programa de Estudo Constitucional"
    ],
    correctAnswer: 1,
    explanation: "PEC significa Proposta de Emenda à Constituição, que é uma proposta de alteração de alguma parte do texto constitucional."
  },
  {
    question: "Qual é o papel do Ministério Público na democracia brasileira?",
    options: [
      "Administrar os ministérios do governo",
      "Julgar processos judiciais",
      "Defender os interesses da sociedade e fiscalizar o cumprimento da lei",
      "Aprovar projetos de lei"
    ],
    correctAnswer: 2,
    explanation: "O Ministério Público é responsável por defender os interesses da sociedade, fiscalizar o cumprimento da lei e promover a ação penal pública."
  },
  {
    question: "O que significa 'sanção presidencial'?",
    options: [
      "Punição aplicada pelo presidente a um político",
      "Aprovação de um projeto de lei pelo presidente",
      "Cerimônia de posse presidencial",
      "Discurso oficial do presidente"
    ],
    correctAnswer: 1,
    explanation: "A sanção presidencial é o ato pelo qual o Presidente da República aprova um projeto de lei aprovado pelo Congresso Nacional."
  },
  {
    question: "O que é o 'quórum' no contexto legislativo?",
    options: [
      "Local onde os parlamentares se reúnem",
      "Número mínimo de parlamentares presentes para votação",
      "Tempo máximo de discurso de um parlamentar",
      "Ordem de votação dos projetos"
    ],
    correctAnswer: 1,
    explanation: "Quórum é o número mínimo de parlamentares que precisam estar presentes para que uma votação possa ocorrer validamente."
  }
];

export function DemocracyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const correctBg = useColorModeValue('green.50', 'rgba(72, 187, 120, 0.2)');
  const incorrectBg = useColorModeValue('red.50', 'rgba(245, 101, 101, 0.2)');
  
  const handleAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Selecione uma opção",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    
    setShowAnswer(true);
    
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };
  
  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
      return "Excelente! Você domina os conceitos democráticos!";
    } else if (percentage >= 80) {
      return "Muito bom! Você tem um ótimo conhecimento sobre democracia.";
    } else if (percentage >= 60) {
      return "Bom trabalho! Você está no caminho certo.";
    } else if (percentage >= 40) {
      return "Continue estudando! A educação cidadã é um processo contínuo.";
    } else {
      return "Não desanime! Explore mais o conteúdo educativo da plataforma.";
    }
  };
  
  return (
    <NoSSR>
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
            <Heading as="h3" size="md" color={textColor}>
              Quiz Democrático
            </Heading>
            
            {!completed && (
              <HStack>
                <Text fontSize="sm" color={mutedColor}>
                  Questão {currentQuestion + 1} de {quizQuestions.length}
                </Text>
                <Badge colorScheme="blue">
                  {score} pontos
                </Badge>
              </HStack>
            )}
          </Flex>
        </Box>
        
        <Box p={6}>
          {!completed ? (
            <>
              <Progress
                value={(currentQuestion / quizQuestions.length) * 100}
                size="sm"
                colorScheme="blue"
                borderRadius="full"
                mb={6}
              />
              
              <Box mb={6}>
                <Text fontSize="lg" fontWeight="medium" mb={4}>
                  {quizQuestions[currentQuestion].question}
                </Text>
                
                <RadioGroup 
                  onChange={(value) => setSelectedOption(parseInt(value))}
                  value={selectedOption !== null ? selectedOption.toString() : undefined}
                  isDisabled={showAnswer}
                >
                  <VStack spacing={3} align="stretch">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Box
                        key={index}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={borderColor}
                        bg={
                          showAnswer
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? correctBg
                              : selectedOption === index
                                ? incorrectBg
                                : 'transparent'
                            : 'transparent'
                        }
                        _hover={!showAnswer ? { bg: useColorModeValue('gray.50', 'gray.700') } : {}}
                      >
                        <Radio value={index.toString()} colorScheme="blue" size="lg">
                          <Flex align="center" justify="space-between" width="100%">
                            <Text>{option}</Text>
                            {showAnswer && index === quizQuestions[currentQuestion].correctAnswer && (
                              <Icon as={FaCheck} color="green.500" boxSize={5} />
                            )}
                            {showAnswer && selectedOption === index && index !== quizQuestions[currentQuestion].correctAnswer && (
                              <Icon as={FaTimes} color="red.500" boxSize={5} />
                            )}
                          </Flex>
                        </Radio>
                      </Box>
                    ))}
                  </VStack>
                </RadioGroup>
              </Box>
              
              {showAnswer && (
                <Box
                  p={4}
                  bg={useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.1)')}
                  borderRadius="md"
                  mb={6}
                >
                  <Flex align="center" mb={2}>
                    <Icon as={FaQuestionCircle} color="blue.500" mr={2} />
                    <Text fontWeight="medium">Explicação:</Text>
                  </Flex>
                  <Text>{quizQuestions[currentQuestion].explanation}</Text>
                </Box>
              )}
              
              <Flex justify="center">
                {!showAnswer ? (
                  <Button
                    colorScheme="blue"
                    onClick={handleAnswer}
                    isDisabled={selectedOption === null}
                    size="lg"
                    px={8}
                  >
                    Verificar
                  </Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    onClick={handleNext}
                    size="lg"
                    px={8}
                    rightIcon={<Icon as={FaArrowRight} />}
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
                  </Button>
                )}
              </Flex>
            </>
          ) : (
            <VStack spacing={6} align="center" py={4}>
              <Icon as={FaTrophy} boxSize={16} color="yellow.400" />
              
              <Heading size="lg" textAlign="center">
                Quiz Concluído!
              </Heading>
              
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Sua pontuação: {score} de {quizQuestions.length}
              </Text>
              
              <Box
                p={4}
                bg={useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.1)')}
                borderRadius="md"
                width="full"
                textAlign="center"
              >
                <Text fontSize="lg">{getScoreMessage()}</Text>
              </Box>
              
              <Button
                colorScheme="blue"
                onClick={handleRestart}
                size="lg"
                px={8}
                mt={4}
              >
                Tentar Novamente
              </Button>
            </VStack>
          )}
        </Box>
      </Box>
    </NoSSR>
  );
}