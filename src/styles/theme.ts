import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    cyberpunk: {
      accent: '#00FFFF',
      glow: '#2196F3',
      dark: '#0A1929',
      light: '#E3F2FD',
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
            _disabled: {
              bg: 'primary.500',
            },
          },
          _active: { bg: 'primary.700' },
        },
        secondary: {
          bg: 'neutral.200',
          color: 'neutral.800',
          _hover: {
            bg: 'neutral.300',
            _disabled: {
              bg: 'neutral.200',
            },
          },
          _active: { bg: 'neutral.400' },
        },
        cyberpunk: {
          bg: 'transparent',
          color: 'cyberpunk.accent',
          border: '1px solid',
          borderColor: 'cyberpunk.accent',
          _hover: {
            bg: 'rgba(0, 255, 255, 0.1)',
          },
          _active: {
            bg: 'rgba(0, 255, 255, 0.2)',
          },
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme