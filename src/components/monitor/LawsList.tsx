import { 
  Box, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Badge, 
  Progress, 
  Text, 
  Flex, 
  Icon, 
  Avatar,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react'
import { FaFileAlt, FaUserTie, FaCalendarAlt } from 'react-icons/fa'

type LawsListProps = {
  searchTerm: string;
  filterType: string;
}

export function LawsList({ searchTerm, filterType }: LawsListProps) {
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  
  // Dados mockados de projetos de lei
  const mockLaws = [
    {
      id: 'PL-1234/2023',
      title: 'Projeto de Lei para Incentivo à Energia Solar',
      author: {
        name: 'Maria Silva',
        party: 'PDB',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      date: '15/03/2023',
      status: 'tramitando',
      progress: 45,
      type: 'pl'
    },
    {
      id: 'PEC-45/2023',
      title: 'Proposta de Emenda Constitucional para Reforma Administrativa',
      author: {
        name: 'João Santos',
        party: 'PSL',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      date: '22/02/2023',
      status: 'tramitando',
      progress: 30,
      type: 'pec'
    },
    {
      id: 'PL-789/2023',
      title: 'Projeto de Lei para Mobilidade Urbana Sustentável',
      author: {
        name: 'Ana Oliveira',
        party: 'PVD',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      date: '10/04/2023',
      status: 'aprovado',
      progress: 100,
      type: 'pl'
    },
    {
      id: 'PDL-123/2023',
      title: 'Projeto de Decreto Legislativo sobre Acordos Internacionais',
      author: {
        name: 'Carlos Mendes',
        party: 'PTB',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      date: '05/01/2023',
      status: 'arquivado',
      progress: 20,
      type: 'pdl'
    },
    {
      id: 'PLP-56/2023',
      title: 'Projeto de Lei Complementar sobre Tributação',
      author: {
        name: 'Paulo Souza',
        party: 'MDB',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      date: '18/05/2023',
      status: 'tramitando',
      progress: 65,
      type: 'plp'
    }
  ]
  
  // Filtrar projetos de lei com base no termo de busca e tipo
  const filteredLaws = mockLaws.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          law.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || law.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Função para obter a cor do badge com base no status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tramitando': return 'blue';
      case 'aprovado': return 'green';
      case 'arquivado': return 'red';
      default: return 'gray';
    }
  };
  
  // Função para formatar o status
  const formatStatus = (status: string) => {
    switch (status) {
      case 'tramitando': return 'Em Tramitação';
      case 'aprovado': return 'Aprovado';
      case 'arquivado': return 'Arquivado';
      default: return status;
    }
  };
  
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Projeto</Th>
            <Th>Autor</Th>
            <Th>Data</Th>
            <Th>Status</Th>
            <Th>Progresso</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredLaws.map((law) => (
            <Tr 
              key={law.id}
              _hover={{ bg: hoverBg }}
              transition="background 0.2s"
              cursor="pointer"
            >
              <Td>
                <Flex align="center">
                  <Icon as={FaFileAlt} mr={3} color="primary.500" />
                  <Box>
                    <Text fontWeight="medium" color={textColor}>
                      {law.id}
                    </Text>
                    <Text fontSize="sm" color={mutedColor}>
                      {law.title}
                    </Text>
                  </Box>
                </Flex>
              </Td>
              <Td>
                <Flex align="center">
                  <Avatar size="sm" name={law.author.name} src={law.author.avatar} mr={2} />
                  <Box>
                    <Text fontSize="sm" fontWeight="medium">
                      {law.author.name}
                    </Text>
                    <Badge colorScheme="purple" size="sm">
                      {law.author.party}
                    </Badge>
                  </Box>
                </Flex>
              </Td>
              <Td>
                <Flex align="center">
                  <Icon as={FaCalendarAlt} mr={2} color={mutedColor} />
                  <Text fontSize="sm">{law.date}</Text>
                </Flex>
              </Td>
              <Td>
                <Badge colorScheme={getStatusColor(law.status)}>
                  {formatStatus(law.status)}
                </Badge>
              </Td>
              <Td>
                <Tooltip label={`${law.progress}% concluído`}>
                  <Box>
                    <Progress 
                      value={law.progress} 
                      size="sm" 
                      colorScheme={getStatusColor(law.status)} 
                      borderRadius="full"
                    />
                    <Text fontSize="xs" mt={1} textAlign="right">
                      {law.progress}%
                    </Text>
                  </Box>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
