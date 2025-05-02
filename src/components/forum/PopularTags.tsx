import {
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagLeftIcon,
  useColorModeValue
} from '@chakra-ui/react'
import { FaTag } from 'react-icons/fa'
import { forumTags } from '../../mocks/forum'

export function PopularTags() {
  const isDark = useColorModeValue(false, true)
  
  return (
    <Wrap spacing={2}>
      {forumTags.map((tag, index) => (
        <WrapItem key={index}>
          <Tag 
            size="md" 
            variant={isDark ? "subtle" : "solid"} 
            colorScheme="primary"
            opacity={1 - (index * 0.05)}
            cursor="pointer"
            _hover={{ opacity: 1 }}
          >
            <TagLeftIcon as={FaTag} boxSize="10px" />
            <TagLabel>{tag.name} ({tag.count})</TagLabel>
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  )
}
