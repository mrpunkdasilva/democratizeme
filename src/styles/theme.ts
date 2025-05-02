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
    // Cores cyberpunk para o tema escuro
    cyberpunk: {
      bg: '#0A1929',
      accent: '#00FFFF',
      highlight: '#2196F3',
      dark: '#051018',
      text: '#E0F7FA',
      neon: {
        blue: '#00FFFF',
        purple: '#FF00FF',
        green: '#00FF66',
        yellow: '#FFFF00',
        red: '#FF3366',
      },
      gradient: {
        blue: 'linear-gradient(90deg, #2196F3 0%, #00FFFF 100%)',
        purple: 'linear-gradient(90deg, #9C27B0 0%, #FF00FF 100%)',
        green: 'linear-gradient(90deg, #00BFA5 0%, #00FF66 100%)',
      }
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  components: {
    Card: {
      baseStyle: (props) => ({
        container: {
          borderRadius: '12px',
          bg: props.colorMode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(10, 25, 41, 0.8)',
          backdropFilter: 'blur(10px)',
          borderWidth: '1px',
          borderColor: props.colorMode === 'light'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 255, 255, 0.2)',
          boxShadow: props.colorMode === 'light'
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            : '0 4px 10px -1px rgba(0, 255, 255, 0.15)',
          transition: 'all 200ms ease-in-out',
          _hover: {
            transform: 'scale(1.02)',
            boxShadow: props.colorMode === 'light'
              ? '0 6px 8px -1px rgba(0, 0, 0, 0.15)'
              : '0 6px 12px -1px rgba(0, 255, 255, 0.2)',
          },
        },
      }),
    },
    Button: {
      baseStyle: {
        borderRadius: '8px',
        height: '40px',
        minW: '40px', // Garante área mínima tocável
        px: '6',
        transition: 'all 200ms ease-in-out',
        _hover: {
          transform: 'scale(1.02)',
        },
        _focus: {
          boxShadow: 'outline',
          outline: 'none',
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
          boxShadow: 'none',
        },
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
        }),
        cyberpunk: (props) => ({
          bg: 'transparent',
          color: props.colorMode === 'dark' ? 'cyberpunk.accent' : 'primary.500',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'cyberpunk.accent' : 'primary.500',
          position: 'relative',
          overflow: 'hidden',
          _before: {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            bg: props.colorMode === 'dark' 
              ? 'rgba(0, 255, 255, 0.15)' 
              : 'rgba(33, 150, 243, 0.1)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.3s ease',
          },
          _hover: {
            _before: {
              transform: 'translateX(0)',
            },
            boxShadow: props.colorMode === 'dark'
              ? '0 0 15px rgba(0, 255, 255, 0.5)'
              : '0 0 15px rgba(33, 150, 243, 0.5)',
          },
          _active: {
            transform: 'scale(0.98)',
          },
        }),
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '8px',
          height: '40px',
          px: '4',
          _focus: {
            boxShadow: 'outline',
            borderColor: 'primary.500',
          },
          _invalid: {
            borderColor: 'error',
            boxShadow: '0 0 0 1px var(--chakra-colors-error)',
          },
        },
      },
    },
    // Novo componente para tooltips acessíveis
    Tooltip: {
      baseStyle: {
        bg: 'gray.700',
        color: 'white',
        borderRadius: 'md',
        px: '3',
        py: '2',
        fontSize: 'sm',
        maxW: '300px',
        zIndex: 'tooltip',
      },
    },
    // Estilo para os cards do dashboard
    DashboardCard: {
      baseStyle: (props) => ({
        borderRadius: '12px',
        bg: props.colorMode === 'light' 
          ? 'white' 
          : 'rgba(10, 25, 41, 0.8)',
        borderWidth: '1px',
        borderColor: props.colorMode === 'light'
          ? 'gray.200'
          : 'rgba(0, 255, 255, 0.15)',
        boxShadow: props.colorMode === 'light'
          ? 'sm'
          : '0 4px 20px -5px rgba(0, 255, 255, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: props.colorMode === 'light'
            ? 'md'
            : '0 6px 25px -5px rgba(0, 255, 255, 0.15)',
        },
        _after: props.colorMode === 'dark' ? {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '2px',
          bgGradient: 'linear(to-r, transparent, cyberpunk.accent, transparent)',
        } : {},
      }),
    },
    // Estilo para barras de progresso
    Progress: {
      baseStyle: (props) => ({
        track: {
          bg: props.colorMode === 'light' ? 'gray.100' : 'gray.700',
        },
        filledTrack: {
          transition: 'width 0.5s ease-in-out',
        },
      }),
      variants: {
        cyberpunk: (props) => ({
          track: {
            bg: props.colorMode === 'light' ? 'gray.100' : 'rgba(0, 255, 255, 0.1)',
            borderRadius: 'full',
            height: '8px',
          },
          filledTrack: {
            bgGradient: props.colorMode === 'light'
              ? 'linear(to-r, primary.400, primary.500)'
              : 'linear(to-r, blue.400, cyberpunk.accent)',
            borderRadius: 'full',
            boxShadow: props.colorMode === 'dark' ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none',
          },
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'neutral.50' : 'cyberpunk.bg',
        color: props.colorMode === 'light' ? 'neutral.900' : 'cyberpunk.text',
        lineHeight: 1.5,
        transition: 'background-color 0.2s ease-in-out',
      },
      // Melhor contraste para links
      a: {
        color: props.colorMode === 'light' ? 'primary.700' : 'primary.300',
        _hover: {
          textDecoration: 'underline',
        },
      },
      // Melhor visibilidade para foco
      ':focus': {
        outline: '2px solid',
        outlineColor: props.colorMode === 'light' ? 'primary.500' : 'primary.300',
        outlineOffset: '2px',
      },
      // Remover outline para elementos que já tem estilo de foco
      '[data-focus]': {
        outline: 'none',
      },
      // Estilo para headings
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
      },
      // Estilo para código
      'code, pre': {
        fontFamily: 'mono',
      },
      // Estilo para scrollbar no modo escuro
      ...(props.colorMode === 'dark' && {
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          bg: 'rgba(10, 25, 41, 0.8)',
        },
        '::-webkit-scrollbar-thumb': {
          bg: 'rgba(0, 255, 255, 0.2)',
          borderRadius: 'full',
        },
        '::-webkit-scrollbar-thumb:hover': {
          bg: 'rgba(0, 255, 255, 0.3)',
        },
      }),
    }),
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
})

export default theme