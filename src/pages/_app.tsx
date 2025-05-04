import { ChakraProvider } from '@chakra-ui/react';
import { NotificationProvider } from '../contexts/NotificationContext';
import theme from "../styles/theme";
import { ErrorBoundary } from '../components/ErrorBoundary';
import { NoSSR } from '../components/NoSSR';

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <ChakraProvider theme={theme}>
        <NotificationProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </NotificationProvider>
      </ChakraProvider>
    </NoSSR>
  );
}

export default MyApp;
