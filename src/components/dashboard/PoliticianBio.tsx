import { Box, Text, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaGraduationCap, FaBriefcase, FaMedal } from 'react-icons/fa'

export function PoliticianBio() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={bgColor}
      p={6}
      mb={6}
      shadow="sm"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>Biografia</Text>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>Formação Acadêmica</Text>
          <HStack>
            <Icon as={FaGraduationCap} color="blue.500" />
            <Text>Direito - Universidade Federal</Text>
          </HStack>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>Experiência Política</Text>
          <HStack>
            <Icon as={FaBriefcase} color="green.500" />
            <VStack align="start" spacing={1}>
              <Text>Vereador (2016-2020)</Text>
              <Text>Deputado Estadual (2020-atual)</Text>
            </VStack>
          </HStack>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>Principais Conquistas</Text>
          <HStack>
            <Icon as={FaMedal} color="yellow.500" />
            <VStack align="start" spacing={1}>
              <Text>Lei de Transparência Municipal</Text>
              <Text>Programa de Modernização Escolar</Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}