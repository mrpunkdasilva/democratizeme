import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react'

export function ExpensesChart() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={bgColor}
      p={6}
      shadow="sm"
    >
      <VStack align="stretch" spacing={4}>
        <Text fontSize="lg" fontWeight="bold">Gastos e Despesas</Text>
        <Box h="200px" bg="gray.100" borderRadius="md">
          {/* Aqui vamos implementar o gráfico com uma biblioteca como recharts ou chart.js */}
          <Text p={4} color="gray.500">Gráfico de Gastos</Text>
        </Box>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">Total Gasto em 2023</Text>
          <Text fontSize="2xl" fontWeight="bold">R$ 234.567,89</Text>
        </VStack>
      </VStack>
    </Box>
  )
}