import { ChakraProvider } from '@chakra-ui/react'
import { NotificationProvider } from '../contexts/NotificationContext'
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </ChakraProvider>
  )
}

export default MyApp
