import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import { Navbar } from './Navbar'
import { Footer } from "./Footer"
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationCenter } from './notifications/NotificationCenter';

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function Layout({ 
  children, 
  title = "democratize.me - Transparência e engajamento político", 
  description = "Plataforma de transparência e engajamento político para todos os cidadãos"
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta name="theme-color" content="#2196F3" />
      </Head>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1">{children}</Box>
        <Footer />
      </Box>
    </>
  )
}