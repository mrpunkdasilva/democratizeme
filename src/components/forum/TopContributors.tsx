import {
  VStack,
  HStack,
  Avatar,
  Text,
  Box,
  Badge,
  useColorModeValue,
  Divider
} from '@chakra-ui/react'
import { forumContributors } from '../../mocks/forum'

export function TopContributors() {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  
  return (
    <VStack spacing={3} align="stretch">
      {forumContributors.map((contributor, index) => (
        <Box key={contributor.id}>
          <HStack spacing={3} p={2} borderRadius="md" _hover={{ bg: hoverBg }}>
            <Avatar size="sm" src={contributor.avatar} name={contributor.name} />
            <Box flex="1">
              <Text fontWeight="medium" fontSize="sm" color={textColor}>
                {contributor.name}
              </Text>
              <Text fontSize="xs" color={mutedColor}>
                {contributor.posts} posts • {contributor.reputation} pontos
              </Text>
            </Box>
            <Badge colorScheme={getBadgeColor(contributor.level)}>
              {contributor.level}
            </Badge>
          </HStack>
          {index < forumContributors.length - 1 && <Divider borderColor={borderColor} mt={2} />}
        </Box>
      ))}
    </VStack>
  )
}

function getBadgeColor(level: string): string {
  switch (level) {
    case 'Ouro': return 'yellow';
    case 'Prata': return 'gray';
    case 'Bronze': return 'orange';
    case 'Iniciante': return 'blue';
    default: return 'gray';
  }
}
