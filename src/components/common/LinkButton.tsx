import NextLink from 'next/link'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface LinkButtonProps extends ButtonProps {
  href: string
  children: React.ReactNode
  isExternal?: boolean
}

export function LinkButton({ href, children, isExternal, ...rest }: LinkButtonProps) {
  const router = useRouter()
  const isActive = router.pathname === href
  
  if (isExternal) {
    return (
      <Button
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </Button>
    )
  }
  
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button
        as="a"
        aria-current={isActive ? "page" : undefined}
        {...rest}
      >
        {children}
      </Button>
    </NextLink>
  )
}