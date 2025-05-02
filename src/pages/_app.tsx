import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  // Evitar problemas de hidratação com renderização condicional
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      {mounted && <Component {...pageProps} />}
    </ChakraProvider>
  )
}

export default MyApp
