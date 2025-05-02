import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Divider,
  Image,
  Badge
} from '@chakra-ui/react'
import { FaFileAlt, FaArrowRight, FaClock, FaUsers } from 'react-icons/fa'
import { EducationCard } from './EducationCard'
import { legislativeGuides } from '../../mocks/education'

interface LegislativeGuidesProps {
  searchTerm: string;
}

export function LegislativeGuides({ searchTerm }: LegislativeGuidesProps) {
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  
  // Filtrar guias com base na busca
  const filteredGuides = legislativeGuides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box>
      <Text mb={6} color={mutedColor}>
        Entenda como funciona o processo legislativo brasileiro, desde a proposta de uma lei até sua aprovação e implementação.
      </Text>
      
      {filteredGuides.length === 0 ? (
        <Text>Nenhum guia encontrado para "{searchTerm}"</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredGuides.map((guide, index) => (
            <EducationCard
              key={index}
              title={guide.title}
              description={guide.description}
              image={guide.image}
              icon={FaFileAlt}
              tags={guide.tags}
              readTime={guide.readTime}
              complexity={guide.complexity}
            />
          ))}
        </SimpleGrid>
      )}
      
      <Divider my={8} />
      
      <Heading size="md" mb={6} color={textColor}>
        Fluxo do Processo Legislativo
      </Heading>
      
      <Box 
        position="relative" 
        p={6} 
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Image 
          src="/images/legislative-process-flow.svg" 
          alt="Fluxo do Processo Legislativo" 
          fallbackSrc="https://via.placeholder.com/800x300?text=Fluxo+do+Processo+Legislativo"
          width="100%"
          borderRadius="md"
        />
        <Text mt={4} fontSize="sm" color={mutedColor} textAlign="center">
          Diagrama simplificado do processo de criação e aprovação de leis no Brasil
        </Text>
      </Box>
    </Box>
  )
}