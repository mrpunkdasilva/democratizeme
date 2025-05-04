import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import theme from '../styles/theme'
import { NotificationProvider } from '../contexts/NotificationContext'

function MyApp({ Component, pageProps }) {
  // Evitar problemas de hidratação com renderização condicional
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <NotificationProvider>
        {mounted && <Component {...pageProps} />}
      </NotificationProvider>
    </ChakraProvider>
  )
}

export default MyApp
